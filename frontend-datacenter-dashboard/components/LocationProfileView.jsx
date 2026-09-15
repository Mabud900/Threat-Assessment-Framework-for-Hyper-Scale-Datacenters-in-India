import React from 'react';
import CityRiskRadar from './RadarChart';
import ParameterDetailCards from './ParameterDetailCards';

export default function LocationProfileView({
  cities = [],
  selectedCity,
  onSelectCity,
}) {
  const currentCity = selectedCity || cities[0];

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Tier 1':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-800';
      case 'Tier 2':
        return 'bg-amber-950/70 text-amber-400 border-amber-800';
      case 'Tier 3':
        return 'bg-rose-950/70 text-rose-400 border-rose-800';
      default:
        return 'bg-purple-950/70 text-purple-400 border-purple-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with City Selection Controls */}
      <div className="cyber-card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Dynamic Cluster Telemetry
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            Location Profile: <span className="text-cyan-400">{currentCity?.name}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentCity?.state}, India &bull; Coordinates: {currentCity?.lat?.toFixed(4)}°N, {currentCity?.lng?.toFixed(4)}°E
          </p>
        </div>

        {/* City Selector Dropdown & Quick Switcher */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative">
            <select
              value={currentCity?.id || ''}
              onChange={(e) => {
                const found = cities.find((c) => c.id === e.target.value);
                if (found) onSelectCity(found);
              }}
              className="bg-slate-900 text-slate-200 border border-slate-700/80 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-cyan-500 transition-all cursor-pointer pr-8"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.tier} - CSTI: {c.csti})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Quick buttons */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {cities.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCity(c)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  c.id === currentCity?.id
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cluster Key KPI Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="cyber-card p-3.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            IT Cluster Capacity
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-extrabold font-mono text-white">
              {currentCity?.capacityMW}
            </span>
            <span className="text-xs text-cyan-400">MW</span>
          </div>
        </div>

        <div className="cyber-card p-3.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Operating Hyperscale DCs
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-extrabold font-mono text-white">
              {currentCity?.activeDCs || 12}
            </span>
            <span className="text-xs text-slate-400">Campuses</span>
          </div>
        </div>

        <div className="cyber-card p-3.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Cable Landing Stations
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-extrabold font-mono text-cyan-400">
              {currentCity?.cableLandingStations || 0}
            </span>
            <span className="text-xs text-slate-400">Subsea CLS</span>
          </div>
        </div>

        <div className="cyber-card p-3.5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Overall Threat Tier
          </span>
          <div className="mt-1">
            <span
              className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded border ${getTierBadge(
                currentCity?.tier
              )}`}
            >
              {currentCity?.tier} ({currentCity?.riskLevel})
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Radar Chart & CSTI Breakdown + Right Parameter Detail Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: CSTI Score Breakdown (5 Cols) */}
        <div className="lg:col-span-5 cyber-card p-5 sticky top-24">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                CSTI Score Breakdown
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              5 Dimensions
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-2">
            Multivariate threat surface footprint across power, water, climate, policy, and infrastructure vectors.
          </p>

          <CityRiskRadar
            scores={currentCity?.scores}
            csti={currentCity?.csti}
            tier={currentCity?.tier}
          />

          {/* Contextual site assessment notes */}
          <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-cyan-400 block mb-1">Site Vulnerability Analysis:</strong>
            {currentCity?.details?.climateDesc}
          </div>
        </div>

        {/* Right: Parameter Detail Cards (7 Cols) */}
        <div className="lg:col-span-7">
          <ParameterDetailCards city={currentCity} />
        </div>
      </div>
    </div>
  );
}

