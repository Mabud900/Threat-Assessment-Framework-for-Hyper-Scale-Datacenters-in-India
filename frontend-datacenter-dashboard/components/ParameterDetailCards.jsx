import React from 'react';

export default function ParameterDetailCards({ city }) {
  if (!city) return null;

  const getScoreBadge = (score) => {
    if (score < 36)
      return {
        label: 'Low Threat',
        bg: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80',
        bar: 'from-emerald-500 to-emerald-400',
      };
    if (score < 56)
      return {
        label: 'Moderate',
        bg: 'bg-amber-950/60 text-amber-400 border-amber-800/80',
        bar: 'from-amber-500 to-amber-400',
      };
    if (score < 76)
      return {
        label: 'High Threat',
        bg: 'bg-rose-950/60 text-rose-400 border-rose-800/80',
        bar: 'from-rose-500 to-rose-400',
      };
    return {
      label: 'Critical Alert',
      bg: 'bg-purple-950/60 text-purple-400 border-purple-800/80',
      bar: 'from-purple-500 to-purple-400',
    };
  };

  const parameters = [
    {
      id: 'POWER',
      title: 'Power Grid Reliability Score',
      score: city.scores?.POWER ?? 20,
      icon: (
        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      metrics: [
        { label: 'Grid Uptime', val: city.metrics?.powerUptime || '99.9%' },
        { label: 'Annual Outages', val: city.metrics?.annualOutageHours || '2.5 hrs/yr' },
        { label: 'Renewable Penetration', val: city.metrics?.renewableMix || '30%' },
      ],
      description: city.details?.powerDesc || 'Grid supply stability and regional transmission contingency.',
    },
    {
      id: 'WATER',
      title: 'WRI Aqueduct Water Stress Score',
      score: city.scores?.WATER ?? 30,
      icon: (
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      ),
      metrics: [
        { label: 'Aqueduct BWS', val: city.metrics?.waterStressScore || '3.2 (High)' },
        { label: 'Chiller Intensity', val: city.metrics?.waterConsumption || '2.2 L/kWh' },
      ],
      description: city.details?.waterDesc || 'Chiller circuit vulnerability against municipal and aquifer supply.',
    },
    {
      id: 'CLIMATE',
      title: 'Climate & Physicality Hazard Score',
      score: city.scores?.CLIMATE ?? 60,
      icon: (
        <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
        </svg>
      ),
      metrics: [
        { label: 'Primary Hazards', val: city.metrics?.climateHazards || 'None' },
        { label: 'Seismic Zone', val: city.metrics?.seismicZone || 'Zone III' },
      ],
      description: city.details?.climateDesc || 'Environmental vulnerability to cyclonic activity, precipitation, and seismic hazards.',
    },
    {
      id: 'REGULATORY',
      title: 'Regulatory & Policy Compliance Score',
      score: city.scores?.REGULATORY ?? 25,
      icon: (
        <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      metrics: [
        { label: 'Policy Framework', val: city.metrics?.policyIncentive || 'State DC Policy Active' },
      ],
      description: city.details?.regDesc || 'Statutory approval velocity, state power open access incentives, and DPDP mandates.',
    },
    {
      id: 'INFRASTRUCTURE',
      title: 'Infrastructure & Connectivity Score',
      score: city.scores?.INFRASTRUCTURE ?? 35,
      icon: (
        <svg className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      ),
      metrics: [
        { label: 'Subsea Cable Stations', val: `${city.cableLandingStations || 0} CLS Active` },
        { label: 'Fiber Redundancy', val: city.metrics?.fiberRedundancy || 'Dense Rings' },
      ],
      description: city.details?.infraDesc || 'Carrier-neutral landing capacity and terrestrial optical fiber route diversity.',
    },
  ];

  return (
    <div className="space-y-3.5">
      {parameters.map((param) => {
        const badge = getScoreBadge(param.score);
        return (
          <div
            key={param.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                  {param.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {param.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">{param.description}</span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="font-mono text-base font-extrabold text-white">
                  {param.score}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border mt-0.5 ${badge.bg}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden my-2">
              <div
                className={`h-full bg-gradient-to-r ${badge.bar} rounded-full transition-all duration-500`}
                style={{ width: `${param.score}%` }}
              ></div>
            </div>

            {/* Telemetry sub-metrics */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-300 pt-1 border-t border-slate-800/60">
              {param.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-slate-400">{m.label}:</span>
                  <span className="font-medium text-slate-200">{m.val}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Backend Microservice Status Bar */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-slate-400 font-semibold text-[11px]">Backend Microservice Status:</span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Data-Ingestion: Active
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Ember-API: Synced
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Aqueduct: Connected
          </span>
        </div>
      </div>
    </div>
  );
}

