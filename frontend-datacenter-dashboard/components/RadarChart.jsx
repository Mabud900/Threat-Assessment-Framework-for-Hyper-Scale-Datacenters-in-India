import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';

export default function CityRiskRadar({ scores = {}, csti = 0, tier = 'Tier 1' }) {
  // Safe extraction of all 5 tiers
  const data = [
    { subject: 'Tier 1: Power', score: scores?.POWER ?? 20, fullMark: 100 },
    { subject: 'Tier 2: Water', score: scores?.WATER ?? 30, fullMark: 100 },
    { subject: 'Tier 3: Climate', score: scores?.CLIMATE ?? 50, fullMark: 100 },
    { subject: 'Tier 4: Regulatory', score: scores?.REGULATORY ?? 35, fullMark: 100 },
    { subject: 'Tier 5: Infra', score: scores?.INFRASTRUCTURE ?? 40, fullMark: 100 },
  ];

  const getTierColor = (score) => {
    if (score < 36) return '#10b981';
    if (score < 56) return '#f59e0b';
    if (score < 76) return '#f43f5e';
    return '#8b5cf6';
  };

  const accentColor = getTierColor(csti);

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Radar Chart Display */}
      <div className="w-full h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#334155" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 9, fill: '#64748b' }}
              stroke="#334155"
              tickCount={5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              }}
              formatter={(val) => [`${val} / 100`, 'Threat Score']}
            />
            <Radar
              name="Threat Vector"
              dataKey="score"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fill="#06b6d4"
              fillOpacity={0.35}
              dot={{ r: 4, fill: '#38bdf8', stroke: '#0f172a', strokeWidth: 1.5 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Score Summary Badge & Gauge below radar */}
      <div className="w-full mt-2 pt-3 border-t border-slate-800/80 flex items-center justify-between px-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            Composite Threat
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-white">{csti}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block mb-0.5">
            Designated Tier
          </span>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-md font-mono"
            style={{
              backgroundColor: `${accentColor}25`,
              color: accentColor,
              border: `1px solid ${accentColor}50`,
            }}
          >
            {tier}
          </span>
        </div>
      </div>
    </div>
  );
}

