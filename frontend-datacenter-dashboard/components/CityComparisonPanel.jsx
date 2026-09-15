import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

export default function CityComparisonPanel({ cities = [], onSelectCity }) {
  const [metricMode, setMetricMode] = useState('csti'); // 'csti' | 'breakdown'

  // Format data for Recharts
  const chartData = cities.map((c) => ({
    name: c.name,
    id: c.id,
    csti: c.csti,
    Power: c.scores?.POWER || 0,
    Water: c.scores?.WATER || 0,
    Climate: c.scores?.CLIMATE || 0,
    Regulatory: c.scores?.REGULATORY || 0,
    Infrastructure: c.scores?.INFRASTRUCTURE || 0,
    tier: c.tier,
    riskLevel: c.riskLevel,
  }));

  const getTierColor = (csti) => {
    if (csti < 36) return '#10b981'; // Green
    if (csti < 56) return '#f59e0b'; // Amber
    if (csti < 76) return '#f43f5e'; // Rose
    return '#8b5cf6'; // Purple
  };

  return (
    <div className="cyber-card p-6">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              City Comparison Panel
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              Comparative Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-cluster benchmark across India’s primary hyperscale datacenter hubs
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMetricMode('csti')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metricMode === 'csti'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Composite CSTI Score
          </button>
          <button
            onClick={() => setMetricMode('breakdown')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metricMode === 'breakdown'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5-Tier Parameter Breakdown
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[280px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {metricMode === 'csti' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                domain={[0, 100]}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
                tickFormatter={(v) => `${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
                formatter={(val, name, props) => [`${val} / 100`, 'CSTI Score']}
                labelFormatter={(label) => `Datacenter Hub: ${label}`}
              />
              <Bar
                dataKey="csti"
                radius={[6, 6, 0, 0]}
                cursor="pointer"
                onClick={(data) => {
                  const target = cities.find((c) => c.id === data.id);
                  if (target && onSelectCity) onSelectCity(target);
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getTierColor(entry.csti)} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                domain={[0, 100]}
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '10px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  fontSize: '12px',
                  color: '#f8fafc',
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 10, fontSize: '11px' }}
                iconType="circle"
              />
              <Bar dataKey="Power" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Water" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Climate" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Regulatory" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Infrastructure" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* City Mini Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() => onSelectCity && onSelectCity(city)}
            className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-800/40 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                {city.name}
              </span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${getTierColor(city.csti)}20`,
                  color: getTierColor(city.csti),
                }}
              >
                {city.tier}
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[11px] text-slate-400">CSTI Threat:</span>
              <span className="font-mono text-base font-extrabold text-white">
                {city.csti}<span className="text-xs text-slate-400">/100</span>
              </span>
            </div>
            {/* Mini progress bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${city.csti}%`,
                  backgroundColor: getTierColor(city.csti),
                }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>{city.capacityMW} MW</span>
              <span className="text-cyan-400 group-hover:underline">Inspect &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

