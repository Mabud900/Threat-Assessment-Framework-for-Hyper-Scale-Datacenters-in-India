import React, { useEffect, useRef, useState } from 'react';

export default function MapView({
  cities = [],
  selectedCity = null,
  onSelectCity,
  selectedFilters = ['POWER', 'WATER', 'CLIMATE', 'REGULATORY', 'INFRASTRUCTURE'],
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [mapLoaded, setMapLoaded] = useState(false);

  // 1. Initialize Leaflet Map once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;
    let localMap = null;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up any stale leaflet id on the container element
      if (mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }

      // Center of India
      const indiaCoords = [20.5937, 78.9629];
      const initialZoom = 4.8;

      const map = L.map(mapContainerRef.current, {
        center: indiaCoords,
        zoom: initialZoom,
        minZoom: 3.5,
        maxZoom: 14,
        zoomControl: false,
        scrollWheelZoom: true,
      });

      localMap = map;
      mapInstanceRef.current = map;

      // Custom zoom control in top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // CartoDB Voyager Tiles
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(map);

      // Force size invalidation to guarantee full container rendering
      const t1 = setTimeout(() => {
        if (isMounted && map) map.invalidateSize();
      }, 100);

      const t2 = setTimeout(() => {
        if (isMounted && map) map.invalidateSize();
      }, 400);

      const handleResize = () => {
        if (map) map.invalidateSize();
      };
      window.addEventListener('resize', handleResize);

      setMapLoaded(true);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener('resize', handleResize);
      };
    });

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
      if (localMap) {
        try {
          localMap.remove();
        } catch (e) {}
      }
    };
  }, []);

  // 2. Render and update markers whenever cities or filters change
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      // Remove existing markers
      Object.values(markersRef.current).forEach((m) => {
        try {
          m.remove();
        } catch (e) {}
      });
      markersRef.current = {};

      cities.forEach((city) => {
        if (!city.lat || !city.lng) return;

        // Calculate filtered score or standard CSTI
        const activeScores = selectedFilters.map((f) => city.scores?.[f] || 0);
        const avgScore =
          activeScores.length > 0
            ? Math.round(activeScores.reduce((a, b) => a + b, 0) / activeScores.length)
            : city.csti;

        // Tier classification
        let tierClass = 'marker-tier-1';
        let badgeBg = '#10b981';
        if (avgScore > 75) {
          tierClass = 'marker-tier-4';
          badgeBg = '#8b5cf6';
        } else if (avgScore >= 56) {
          tierClass = 'marker-tier-3';
          badgeBg = '#f43f5e';
        } else if (avgScore >= 36) {
          tierClass = 'marker-tier-2';
          badgeBg = '#f59e0b';
        }

        // Custom pulsing radar marker
        const customIcon = L.divIcon({
          className: `custom-radar-marker ${tierClass}`,
          html: `
            <div class="marker-pulse-ring"></div>
            <div class="marker-core-dot"></div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          popupAnchor: [0, -14],
        });

        const marker = L.marker([city.lat, city.lng], { icon: customIcon }).addTo(map);

        // Tooltip showing city name and score
        marker.bindTooltip(
          `<div style="font-weight:700; font-size:12px;">${city.name} (${avgScore})</div>`,
          { direction: 'top', offset: [0, -12], opacity: 0.95 }
        );

        // Rich telemetry glass popup
        const popupContent = `
          <div style="font-family: inherit; min-width: 220px; color: #f1f5f9;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 15px; font-weight: 700; color: #ffffff;">${city.name}</span>
              <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: ${badgeBg}; color: #0f172a;">
                ${city.tier}
              </span>
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">
              ${city.state} &bull; ${city.capacityMW || 'N/A'} MW IT Capacity
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: rgba(30, 41, 59, 0.7); padding: 8px; border-radius: 8px; margin-bottom: 10px;">
              <div>
                <span style="font-size: 10px; color: #64748b; display: block;">CSTI SCORE</span>
                <span style="font-size: 16px; font-weight: 800; color: #38bdf8; font-family: monospace;">${city.csti}/100</span>
              </div>
              <div>
                <span style="font-size: 10px; color: #64748b; display: block;">RISK LEVEL</span>
                <span style="font-size: 13px; font-weight: 700; color: ${badgeBg};">${city.riskLevel || 'Moderate'}</span>
              </div>
            </div>

            <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 8px;">
              <strong style="color: #94a3b8;">Primary Hazard:</strong> ${city.metrics?.climateHazards || 'None'}
            </div>

            <button id="inspect-city-${city.id}" style="width: 100%; background: #0284c7; color: #ffffff; border: none; padding: 7px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: background 0.15s ease;">
              Inspect Full Profile &rarr;
            </button>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 280 });

        marker.on('popupopen', () => {
          const btn = document.getElementById(`inspect-city-${city.id}`);
          if (btn) {
            btn.onclick = () => {
              if (onSelectCity) onSelectCity(city);
            };
          }
        });

        marker.on('click', () => {
          if (onSelectCity) onSelectCity(city);
        });

        markersRef.current[city.id] = marker;
      });
    });
  }, [mapLoaded, cities, selectedFilters, onSelectCity]);

  // Reset map view to full view of India
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([20.5937, 78.9629], 4.8, { duration: 0.8 });
    }
  };

  return (
    <div className="cyber-card relative overflow-hidden flex flex-col h-full min-h-[480px]">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-[500] flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800/90 text-xs shadow-lg">
        <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
        <span className="font-semibold text-white">Interactive India Map</span>
        <span className="text-[10px] text-cyan-400 font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800/60">
          Leaflet.js
        </span>
      </div>

      {/* Map Controls Overlay */}
      <div className="absolute bottom-3 left-3 z-[500] flex items-center gap-2">
        <button
          onClick={handleResetView}
          className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700/80 shadow-lg backdrop-blur-md transition-all flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Reset View
        </button>
      </div>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{ minHeight: '480px', height: '100%', width: '100%' }}
        className="w-full h-full min-h-[480px] flex-1 relative z-0"
      />
    </div>
  );
}
