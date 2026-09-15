import React from 'react';

export default function ThreatParameterPanel({
  selectedFilters,
  onToggleFilter,
  onResetFilters,
  cities = [],
}) {
  const filterOptions = [
    {
      id: 'POWER',
      label: 'Power Grid Reliability',
      badge: 'Tier 1',
      desc: 'Outages, grid deficit, fossil fuel vs solar/wind mix',
      color: 'emerald',
      activeBorder: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400',
    },
    {
      id: 'WATER',
      label: 'Water Stress & Depletion',
      badge: 'Tier 2',
      desc: 'Aqueduct BWS index, cooling consumption, aquifer level',
      color: 'cyan',
      activeBorder: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400',
    },
    {
      id: 'CLIMATE',
      label: 'Climate & Physical Risk',
      badge: 'Tier 3',
      desc: 'Cyclones, 100-yr flood inundation, wet-bulb heatwaves',
      color: 'amber',
      activeBorder: 'border-amber-500/50 bg-amber-950/20 text-amber-400',
    },
    {
      id: 'REGULATORY',
      label: 'Regulatory / Policy Risk',
      badge: 'Tier 4',
      desc: 'DPDP compliance, state incentives, open-access tariffs',
      color: 'violet',
      activeBorder: 'border-purple-500/50 bg-purple-950/20 text-purple-400',
    },
    {
      id: 'INFRASTRUCTURE',
      label: 'Infrastructure & Fiber',
      badge: 'Tier 5',
      desc: 'Subsea landing stations, diverse dark-fiber routes',
      color: 'rose',
      activeBorder: 'border-rose-500/50 bg-rose-950/20 text-rose-400',
    },
  ];

  return (
    <div className="cyber-card p-5 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="font-bold text-sm tracking-wide text-white uppercase">
              Threat Parameter Panel
            </h3>
          </div>
          <button
            onClick={onResetFilters}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-all"
          >
            Reset All
          </button>
        </div>

        {/* Filters List */}
        <div className="space-y-2 mb-5">
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
            Active Risk Filters ({selectedFilters.length}/5 Active)
          </p>

          {filterOptions.map((opt) => {
            const isChecked = selectedFilters.includes(opt.id);
            return (
              <label
                key={opt.id}
                className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isChecked
                    ? `${opt.activeBorder} shadow-sm`
                    : 'border-slate-800/80 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleFilter(opt.id)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      {opt.label}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-400">
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-snug">
                    {opt.desc}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Color Legend */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-5">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block mb-2.5">
            CSTI Threat Tier Legend
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
              <span className="text-slate-300 text-[11px]">Tier 1 (&lt;36 Low)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
              <span className="text-slate-300 text-[11px]">Tier 2 (36-55 Mod)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
              <span className="text-slate-300 text-[11px]">Tier 3 (56-75 High)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></span>
              <span className="text-slate-300 text-[11px]">Tier 4/5 (&gt;75 Critical)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Insights Card */}
      <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-950/40 to-slate-900/80 border border-cyan-800/40 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-semibold text-cyan-300 text-[11px]">National DC Telemetry</span>
          <span className="text-[10px] font-mono text-cyan-400">5 Hubs</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-cyan-900/40 text-[11px]">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Monitored IT:</span>
            <span className="font-bold text-white font-mono">3,090 MW</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Max Risk Parameter:</span>
            <span className="font-bold text-rose-400 font-mono">Water (Bengaluru)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

