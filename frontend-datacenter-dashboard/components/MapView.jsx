import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cities } from '../data';

const indiaCenter = [20.5937, 78.9629];
const indiaZoom = 4;

L.Icon.Default.mergeIconOptions = {
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
};

export default function MapView({ onSelectCity }) {
  useEffect(() => {
    const map = L.map('mapid').setView(indiaCenter, indiaZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const cityCoords = {
      mumbai: [19.0760, 72.8777],
      chennai: [13.0827, 80.2707],
      hyd: [17.3850, 78.4867],
      bengaluru: [12.9716, 77.5946],
      noida: [28.5355, 77.3910],
    };

    cities.forEach((city) => {
      const latlng = L.latLng(cityCoords[city.id]);
      const marker = L.marker(latlng).addTo(map);
      marker.bindPopup(`<b>${city.name}</b><br/>${city.state}<br/>CSTI: ${city.csti}`).on('click', () => onSelectCity(city));
    });

    const bounds = cities.map(c => L.latLng(cityCoords[c.id])).reduce(
      (acc, v) => acc.extend(v),
      new L.LatLngBounds()
    );
    map.fitBounds(bounds);
  }, [onSelectCity]);

  return <div id="mapid" style={{ height: '400px', width: '100%' }} />;
}