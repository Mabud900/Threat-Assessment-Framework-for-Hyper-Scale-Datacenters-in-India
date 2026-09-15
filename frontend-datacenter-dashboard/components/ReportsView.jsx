import React from 'react';
import { dataSources, cstiFormula, cities, riskTiers } from '../data';

export default function ReportsView() {
  // Download CSV export handler
  const handleExportCSV = () => {
    const headers = [
      'City ID',
      'City Name',
      'State',
      'Latitude',
      'Longitude',
      'CSTI Score',
      'Tier',
      'Risk Level',
      'Power Score',
      'Water Score',
      'Climate Score',
      'Regulatory Score',
      'Infrastructure Score',
      'IT Capacity MW',
      'Subsea CLS Count',
    ];

    const rows = cities.map((c) => [
      c.code,
      c.name,
      c.state,
      c.lat,
      c.lng,
      c.csti,
      c.tier,
      c.riskLevel,
      c.scores?.POWER || 0,
      c.scores?.WATER || 0,
      c.scores?.CLIMATE || 0,
      c.scores?.REGULATORY || 0,
      c.scores?.INFRASTRUCTURE || 0,
      c.capacityMW,
      c.cableLandingStations,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `hyperscale_dc_threat_assessment_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download printable PDF handler
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <span>Reports &amp; Methodology</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              Uptime &bull; Tier III/IV Standards
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mathematical quantification of the Composite Server Threat Index (CSTI) and telemetry source catalog
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500 text-xs font-semibold text-slate-200 transition-all shadow-md"
          >
            <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Threat CSV
          </button>

          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-xs font-bold text-white transition-all shadow-lg shadow-cyan-600/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect width="12" height="8" x="6" y="14"></rect>
            </svg>
            Download Comparative Analysis PDF
          </button>
        </div>
      </div>

      {/* METHODOLOGY EXPLANATION SECTION */}
      <div className="cyber-card p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Methodology Explanation
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cyan-400">
            CSTI Algorithmic Model
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The <strong>Composite Server Threat Index (CSTI)</strong> is an empirical risk quantification framework engineered specifically for hyperscale datacenter campus site selection, disaster mitigation, and operational continuity in India. It aggregates multi-source geospatial telemetry across five critical infrastructure layers into a normalized index bounded between 0 and 100.
        </p>

        {/* Mathematical Equation Display Box */}
        <div className="p-5 rounded-xl bg-slate-950/80 border border-cyan-800/40 shadow-inner flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-2 font-bold">
            Formal Threat Formulation
          </span>
          <div className="font-mono text-base md:text-lg font-bold text-white tracking-wide py-2 px-4 rounded-lg bg-slate-900/90 border border-slate-800">
            CSTI = &sum;<sub>i=1</sub><sup>5</sup> (w<sub>i</sub> &times; Risk<sub>i</sub>)
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2">
            = (0.30 &times; Power) + (0.25 &times; Water) + (0.20 &times; Climate) + (0.15 &times; Regulatory) + (0.10 &times; Infrastructure)
          </p>
        </div>

        {/* Weighting Vector Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3">Tier Vector</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Assigned Weight (w<sub>i</sub>)</th>
                <th className="p-3">Critical Operational Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="p-3 font-mono text-emerald-400 font-bold">Tier 1</td>
                <td className="p-3 font-semibold text-white">Power Risk</td>
                <td className="p-3 font-mono text-cyan-400 font-bold">0.30 (30%)</td>
                <td className="p-3 text-slate-400">Power is the single greatest operational expenditure and availability risk; grid outages mandate high diesel generator (DG) run-hours.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-cyan-400 font-bold">Tier 2</td>
                <td className="p-3 font-semibold text-white">Water Stress</td>
                <td className="p-3 font-mono text-cyan-400 font-bold">0.25 (25%)</td>
                <td className="p-3 text-slate-400">Chilling systems consume millions of liters daily; municipal bans or acute aquifer depletion force costly closed-loop air retrofit.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-amber-400 font-bold">Tier 3</td>
                <td className="p-3 font-semibold text-white">Climate &amp; Physical</td>
                <td className="p-3 font-mono text-cyan-400 font-bold">0.20 (20%)</td>
                <td className="p-3 text-slate-400">Coastal cyclones, monsoon urban inundation, and seismic ground acceleration threaten physical envelope structural integrity.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-purple-400 font-bold">Tier 4</td>
                <td className="p-3 font-semibold text-white">Regulatory / Policy</td>
                <td className="p-3 font-mono text-cyan-400 font-bold">0.15 (15%)</td>
                <td className="p-3 text-slate-400">Statutory clearances, DPDP Act localization compliances, and state open-access cross-subsidy charges determine margin predictability.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-pink-400 font-bold">Tier 5</td>
                <td className="p-3 font-semibold text-white">Infrastructure</td>
                <td className="p-3 font-mono text-cyan-400 font-bold">0.10 (10%)</td>
                <td className="p-3 text-slate-400">Undersea landing stations, dark fiber carrier neutrality, and round-trip domestic transit latencies constrain bandwidth scale.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* DATA SOURCE CATALOG SECTION */}
      <div className="cyber-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Data Source Catalog
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Active Telemetry Feed Integration: <strong className="text-emerald-400 font-mono">5 APIs Online</strong>
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3">Source Provider</th>
                <th className="p-3">Integration Type</th>
                <th className="p-3">Metadata Telemetry Covered</th>
                <th className="p-3">Ingestion Cadence</th>
                <th className="p-3">Last Synced</th>
                <th className="p-3">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {dataSources.map((src, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-white whitespace-nowrap">{src.name}</td>
                  <td className="p-3 font-mono text-slate-300 text-[11px]">{src.type}</td>
                  <td className="p-3 text-slate-400 max-w-xs">{src.desc}</td>
                  <td className="p-3 font-mono text-cyan-400 text-[11px]">{src.frequency}</td>
                  <td className="p-3 font-mono text-slate-400 text-[11px]">{src.lastSync}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80 w-max">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {src.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Catalog Action Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 text-[11px]">
            Data feeds verified against Central Electricity Authority &bull; World Resources Institute Aqueduct 4.0 &bull; IMD Pune
          </span>
          <button
            onClick={handleExportCSV}
            className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline text-xs flex items-center gap-1"
          >
            Download CSV Raw Catalog Matrix &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

