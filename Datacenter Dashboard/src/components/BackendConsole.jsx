import React from 'react';

const BackendConsole = () => {
  const services = [
    { name: 'Data-Ingestion-Svc', status: 'Healthy', desc: 'Pulls raw data from APIs' },
    { name: 'CSTI-Calc-Engine', status: 'Healthy', desc: 'Computes threat index scores' },
    { name: 'Location-API', status: 'Healthy', desc: 'Serves city profile data to frontend' },
  ];

  const sources = ['Ember Energy API', 'WRI Aqueduct', 'NDMA India'];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Backend & Data Flow Console</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sources.map((src, i) => (
          <div key={i} className="bg-slate-900 p-3 rounded border border-yellow-800 text-yellow-400 text-sm text-center">
            🌐 {src}
          </div>
        ))}
      </div>

      <div className="flex justify-center text-slate-500 mb-4">↓ | ↓ | ↓</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((svc, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-white font-mono text-sm">{svc.name}</h4>
              <span className="text-xs bg-green-900 text-green-400 px-2 py-0.5 rounded">{svc.status}</span>
            </div>
            <p className="text-slate-400 text-xs">{svc.desc}</p>
            <p className="text-slate-600 text-xs mt-2">Spring Boot | Port: 808{i+1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackendConsole;