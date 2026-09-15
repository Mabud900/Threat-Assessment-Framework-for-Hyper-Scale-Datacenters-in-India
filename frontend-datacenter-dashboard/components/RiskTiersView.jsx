import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import {
  riskTiers,
  historicalOutageTrends,
  renewableGenerationGrowth,
} from '../data';

export default function RiskTiersView() {
  const [activeTierTab, setActiveTierTab] = useState('ALL');

  const filteredTiers =
    activeTierTab === 'ALL'
      ? riskTiers
      : riskTiers.filter((t) => t.id === activeTierTab);

  return (
    <div className="space-y-6">
      {/* Top Header & Filter Pills */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <span>Risk Tiers &amp; Data Explorer</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              5 Core Tiers
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Exhaustive telemetry variables, raw statistical matrices, historical trend analyses, and standardization logic
          </p>
        </div>

        {/* Tier Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTierTab('ALL')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeTierTab === 'ALL'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Tiers
          </button>
          {riskTiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTierTab(t.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeTierTab === t.id
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.tier}: {t.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* TIER 1: POWER RISK (Deep Dive with Historical Charts) */}
      {(activeTierTab === 'ALL' || activeTierTab === 'POWER') && (
        <div className="cyber-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                TIER 1
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Power Risk &amp; Grid Resilience</h3>
                <p className="text-xs text-slate-400">Parameter Weighting: 30% of Composite CSTI</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Benchmark Outliers:</span>
              <span className="text-emerald-400 font-semibold">Mumbai (Lowest: 20)</span>
              <span className="text-slate-500">|</span>
              <span className="text-rose-400 font-semibold">Chennai (Highest: 70)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Left: Raw Data Matrix */}
            <div className="lg:col-span-6 space-y-4">
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/60 text-slate-400 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="p-3">Indicator</th>
                      <th className="p-3">Unit</th>
                      <th className="p-3">Telemetry Normalization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-medium text-white">Grid Outage Frequency</td>
                      <td className="p-3 font-mono text-cyan-400">events/yr</td>
                      <td className="p-3 text-slate-400">Normalized CEA grid interruption indices (SAIFI/SAIDI)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Peak Grid Deficit</td>
                      <td className="p-3 font-mono text-cyan-400">%</td>
                      <td className="p-3 text-slate-400">Regional dispatchable generation margin shortfall</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Renewable Mix Penetration</td>
                      <td className="p-3 font-mono text-cyan-400">%</td>
                      <td className="p-3 text-slate-400">Solar &amp; Wind generation fraction in state grid</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Grid Carbon Intensity</td>
                      <td className="p-3 font-mono text-cyan-400">gCO2/kWh</td>
                      <td className="p-3 text-slate-400">Ember Energy hourly emission tracking factor</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Scoring Logic Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  Standardization &amp; Scoring Logic
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Raw outage hours ($h$) and grid deficit ($d$) are scaled via inverse min-max scaling against national CEA baselines. Cities with high renewable open access and dual-feeder 400kV substations receive mitigation offsets of up to 15 points.
                </p>
              </div>
            </div>

            {/* Right: Side Charts (Outage Trends & Renewable Generation) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Chart 1: Outage Frequency Trends (Line Chart) */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">Outage Frequency Trends (hrs/yr)</span>
                  <span className="text-[10px] font-mono text-slate-400">2018 – 2024</span>
                </div>
                <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalOutageTrends} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                      />
                      <Line type="monotone" dataKey="Mumbai" stroke="#10b981" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Chennai" stroke="#f43f5e" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Bengaluru" stroke="#06b6d4" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="Noida" stroke="#f59e0b" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Mumbai</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Chennai</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400"></span> Bengaluru</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Noida</span>
                </div>
              </div>

              {/* Chart 2: Renewable Generation Growth (Bar Chart) */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">Renewable Energy Generation Mix (GW)</span>
                  <span className="text-[10px] font-mono text-emerald-400">CAGR +18.4%</span>
                </div>
                <div className="h-[140px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={renewableGenerationGrowth} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                      />
                      <Bar dataKey="Solar" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="Wind" stackId="a" fill="#06b6d4" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="Hydro" stackId="a" fill="#10b981" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TIER 2: WATER STRESS */}
      {(activeTierTab === 'ALL' || activeTierTab === 'WATER') && (
        <div className="cyber-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                TIER 2
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Water Stress &amp; Aquifer Depletion</h3>
                <p className="text-xs text-slate-400">Parameter Weighting: 25% of Composite CSTI</p>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Critical Crisis Point: <span className="text-rose-400 font-bold">Bengaluru (90) &amp; Chennai (85)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/60 text-slate-400 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="p-3">Water Parameter</th>
                      <th className="p-3">Telemetry Metric</th>
                      <th className="p-3">Impact on Hyperscale Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-medium text-white">Baseline Water Stress (BWS)</td>
                      <td className="p-3 font-mono text-cyan-400">WRI Score 0.0 – 5.0</td>
                      <td className="p-3 text-slate-400">Ratio of total water withdrawals to available renewable water supply</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Chiller Cooling Water Demand</td>
                      <td className="p-3 font-mono text-cyan-400">Liters / kWh IT</td>
                      <td className="p-3 text-slate-400">Evaporative cooling circuit consumption vs dry adiabatic alternatives</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Aquifer Depletion Velocity</td>
                      <td className="p-3 font-mono text-cyan-400">cm / year</td>
                      <td className="p-3 text-slate-400">Over-exploited groundwater blocks per Central Ground Water Board</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1.5">
                Scoring Logic &amp; Cooling Penalty
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px] mb-2">
                Locations exceeding a BWS score of 4.0 incur an exponential penalty due to municipal groundwater extraction bans. Data centers with zero-liquid discharge (ZLD) and closed-loop direct-to-chip liquid cooling receive protective credits.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] text-slate-400 font-mono">
                Formula: Tier2_Score = (0.50 &times; BWS_norm) + (0.30 &times; Chiller_intensity) + (0.20 &times; Aquifer_trend)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TIER 3: CLIMATE & PHYSICAL RISK */}
      {(activeTierTab === 'ALL' || activeTierTab === 'CLIMATE') && (
        <div className="cyber-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-amber-950 text-amber-400 border border-amber-800">
                TIER 3
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Climate, Natural Hazards &amp; Physical Risk</h3>
                <p className="text-xs text-slate-400">Parameter Weighting: 20% of Composite CSTI</p>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Primary Driver: <span className="text-amber-400 font-bold">Cyclonic Storms &amp; Monsoon Flash Floods</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/60 text-slate-400 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="p-3">Hazard Dimension</th>
                      <th className="p-3">Source &amp; Scale</th>
                      <th className="p-3">Standardized Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-3 font-medium text-white">100-Year Flood Zone</td>
                      <td className="p-3 text-slate-400">NDMA Digital Elevation Models</td>
                      <td className="p-3 font-mono text-amber-400">0 – 100 Index</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Coastal Cyclone Severity</td>
                      <td className="p-3 text-slate-400">IMD Tropical Cyclone Atlas (1980-2024)</td>
                      <td className="p-3 font-mono text-amber-400">Cat 1 – Cat 5 normalized</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Peak Wet-Bulb Heat Index</td>
                      <td className="p-3 text-slate-400">NASA POWER Psychrometric Peaks</td>
                      <td className="p-3 font-mono text-amber-400">&gt;32°C Critical Threshold</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Seismic Zonation</td>
                      <td className="p-3 text-slate-400">BIS IS 1893:2016 Guidelines</td>
                      <td className="p-3 font-mono text-amber-400">Zone II (Low) to Zone IV (High)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1.5">
                Scoring Logic
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Calculated by overlaying historical inundation return periods with ambient cooling design conditions. Coastal cities like Chennai face cyclone surge and coastal flood hazards, while Noida is situated in Seismic Zone IV with extreme summer dry-bulb peaks exceeding 46°C.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TIER 4 & TIER 5 IN SIDE-BY-SIDE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TIER 4: REGULATORY / POLICY */}
        {(activeTierTab === 'ALL' || activeTierTab === 'REGULATORY') && (
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-purple-950 text-purple-400 border border-purple-800">
                  TIER 4
                </span>
                <h3 className="text-base font-bold text-white">Regulatory &amp; Policy Risk</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Weight: 15%</span>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">DPDP Act Data Localization Audit Compliance</span>
                <span className="font-mono text-purple-400">Statutory Metric</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">Renewable Open Access Wheeling Surcharge (CSS)</span>
                <span className="font-mono text-purple-400">₹/kWh Tariff</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">State Data Center Capital Subsidy &amp; Stamp Duty</span>
                <span className="font-mono text-purple-400">State Policy</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-200">Scoring Logic:</strong> Scores capture policy predictability, tariff certainty, and single-window statutory approval turnarounds across state electricity and environmental boards.
            </div>
          </div>
        )}

        {/* TIER 5: INFRASTRUCTURE & CONNECTIVITY */}
        {(activeTierTab === 'ALL' || activeTierTab === 'INFRASTRUCTURE') && (
          <div className="cyber-card p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-pink-950 text-pink-400 border border-pink-800">
                  TIER 5
                </span>
                <h3 className="text-base font-bold text-white">Infrastructure &amp; Connectivity</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Weight: 10%</span>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">Undersea Submarine Cable Landing Stations (CLS)</span>
                <span className="font-mono text-pink-400">Count / Capacity</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">Terrestrial Diverse Dark-Fiber Conduit Paths</span>
                <span className="font-mono text-pink-400">N+2 Redundancy</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">Proximity to 400kV / 220kV Grid Substation</span>
                <span className="font-mono text-pink-400">&lt; 5 km Radius</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-200">Scoring Logic:</strong> Cities lacking international submarine cable landings (such as Noida, Hyderabad, and Bengaluru) rely on overland backhaul routes to Mumbai and Chennai, elevating fiber transit latency and terrestrial route cut risks.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

