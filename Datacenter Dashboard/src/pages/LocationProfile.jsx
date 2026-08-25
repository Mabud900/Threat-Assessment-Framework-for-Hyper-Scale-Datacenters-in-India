import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const LocationProfile = ({ selectedCity }) => {
  // Mock data for the Radar Chart
  const radarData = [
    { subject: 'Power', A: 120, B: 110, fullMark: 150 },
    { subject: 'Water', A: 98, B: 130, fullMark: 150 },
    { subject: 'Climate', A: 86, B: 99, fullMark: 150 },
    { subject: 'Regulatory', A: 99, B: 85, fullMark: 150 },
    { subject: 'Infra', A: 85, B: 90, fullMark: 150 },
  ];

  if (!selectedCity) {
    return <div className="text-slate-400 p-6">Please select a city from the Dashboard map.</div>;
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Location Profile: {selectedCity.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 h-80">
          <h4 className="text-slate-400 text-sm mb-2">CSTI Vulnerability Radar</h4>
          <ResponsiveContainer width="100%" height="90%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={12} />
              <PolarRadiusAxis stroke="#475569" />
              <Radar name="Risk" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Parameter Cards */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
            <div>
              <h4 className="text-slate-400 text-sm">Overall CSTI Score</h4>
              <p className="text-3xl font-bold text-white">{selectedCity.csti}/100</p>
            </div>
            <span className="text-cyan-400 font-bold text-lg bg-cyan-900/50 px-3 py-1 rounded">{selectedCity.tier}</span>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <h4 className="text-slate-400 text-sm mb-2">Backend Microservice Status</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded">● Data-Ingestion: Active</span>
              <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded">● Ember-API: Synced</span>
              <span className="bg-yellow-900/50 text-yellow-400 px-2 py-1 rounded">● NDMA-API: Delayed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationProfile;