import React, { useState } from 'react';
import MapView from './components/MapView';
import { cities, riskTiers, cstiFormula, dataSources } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedCity, setSelectedCity] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'Risk Tiers':
        return (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Risk Tier Explorer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {riskTiers.map((tier, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-900/50 px-2 py-1 rounded">{tier.tier}</span>
                  <h3 className="text-xl text-white mt-3 mb-2">{tier.risk}</h3>
                  <p className="text-slate-400 text-sm mb-4">{tier.description}</p>
                  <div className="text-xs text-slate-500">
                    <strong>Examples:</strong> {tier.examples.join(', ')}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Data Table */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-3 px-4">Tier</th>
                    <th className="py-3 px-4">Risk Category</th>
                    <th className="py-3 px-4">City Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {riskTiers.map((t, i) => (
                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-900/50">
                      <td className="py-3 px-4 font-bold text-cyan-400">{t.tier}</td>
                      <td className="py-3 px-4">{t.risk}</td>
                      <td className="py-3 px-4">{t.examples.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Location Profile':
        return (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Location Profile: {selectedCity?.name || 'Select a City'}</h2>
            {selectedCity ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Radar Chart Placeholder */}
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center justify-center h-64">
                  <div className="w-32 h-32 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold">
                    CSTI Radar Chart
                  </div>
                </div>
                {/* Parameter Cards */}
                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-slate-400 text-sm">CSTI Score</h4>
                    <p className="text-3xl font-bold text-white">{selectedCity.csti}/100</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-slate-400 text-sm">Assigned Tier</h4>
                    <p className="text-3xl font-bold text-cyan-400">{selectedCity.tier}</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 col-span-2">
                    <h4 className="text-slate-400 text-sm mb-2">Backend Microservice Status</h4>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded">Data-Ingestion: Active</span>
                      <span className="bg-green-900/50 text-green-400 px-2 py-1 rounded">Ember-API: Synced</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-400">Please go to Dashboard and select a city.</p>
            )}
          </div>
        );

      case 'Reports':
        return (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6">
            <h2 className="text-2xl font-bold text-white">Reports & Methodology</h2>
            
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">CSTI Calculation Formula</h3>
              <p className="text-slate-300 bg-slate-950 p-3 rounded font-mono text-sm">{cstiFormula}</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Data Source Catalog</h3>
              <div className="space-y-3">
                {dataSources.map((src, i) => (
                  <div key={i} className="border-b border-slate-800 pb-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">{src.name}</span>
                      <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">{src.type}</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{src.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default: // Dashboard
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <MapView onSelectCity={(city) => { setSelectedCity(city); setActiveTab('Location Profile'); }} selectedCity={selectedCity} />
            </div>
            
            {/* City Comparison Panel */}
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 h-[400px] overflow-y-auto">
              <h3 className="text-lg font-semibold text-white mb-4">City Comparison</h3>
              <div className="space-y-3">
                {cities.map(city => (
                  <div key={city.id} className="bg-slate-900 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-cyan-500"
                       onClick={() => { setSelectedCity(city); setActiveTab('Location Profile'); }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-white">{city.name}</span>
                      <span className="text-xs text-cyan-400">{city.tier}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${city.csti}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <h1 className="text-xl font-bold text-white mb-8 leading-tight">
          HYPERSCALE DC<br/><span className="text-cyan-500 text-sm">Threat Assessment Portal</span>
        </h1>
        <nav className="space-y-2 flex-1">
          {['Dashboard', 'Location Profile', 'Risk Tiers', 'Reports', 'About Team'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="mt-8 text-xs text-slate-600">
          <p>Backend: Spring Boot</p>
          <p>Frontend: React.js</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white">{activeTab}</h2>
          <p className="text-slate-500">Real-time monitoring and assessment of hyperscale data center threats in India.</p>
        </header>
        
        {renderContent()}
      </main>
    </div>
  );
}