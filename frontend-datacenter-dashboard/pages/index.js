import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ThreatParameterPanel from '../components/ThreatParameterPanel';
import MapView from '../components/MapView';
import CityComparisonPanel from '../components/CityComparisonPanel';
import RiskTiersView from '../components/RiskTiersView';
import LocationProfileView from '../components/LocationProfileView';
import ReportsView from '../components/ReportsView';
import { cities as initialCities } from '../data';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [cityData, setCityData] = useState(initialCities);
  const [selectedCity, setSelectedCity] = useState(initialCities[0]);
  const [selectedFilters, setSelectedFilters] = useState([
    'POWER',
    'WATER',
    'CLIMATE',
    'REGULATORY',
    'INFRASTRUCTURE',
  ]);
  const [backendStatus, setBackendStatus] = useState('Live Telemetry');

  useEffect(() => {
    fetch('http://localhost:8080/api/dashboard/summary')
      .then((res) => {
        if (!res.ok) throw new Error('not ok');
        return res.json();
      })
      .then((data) => {
        if (data && data.cities && data.cities.length > 0) {
          const merged = initialCities.map((c) => {
            const apiMatch = data.cities.find(
              (ac) =>
                ac.id?.toLowerCase() === c.id.toLowerCase() ||
                ac.name?.toLowerCase() === c.name.toLowerCase()
            );
            if (apiMatch) {
              return {
                ...c,
                csti: Math.round(apiMatch.csti ?? c.csti),
                tier: apiMatch.tier || c.tier,
                scores: { ...c.scores, ...(apiMatch.scores || {}) },
              };
            }
            return c;
          });
          setCityData(merged);
          setBackendStatus('Connected');
        }
      })
      .catch(() => {
        setBackendStatus('Standalone Telemetry');
      });
  }, []);

  const handleToggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleResetFilters = () => {
    setSelectedFilters(['POWER', 'WATER', 'CLIMATE', 'REGULATORY', 'INFRASTRUCTURE']);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setActiveTab('Location Profile');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Head>
        <title>Hyperscale DC Threat Assessment Portal | India</title>
        <meta name="description" content="Real-time multi-hazard threat assessment for Indian hyperscale datacenters." />
      </Head>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} backendStatus={backendStatus} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeTab === 'Dashboard' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-4 h-full">
                <ThreatParameterPanel
                  selectedFilters={selectedFilters}
                  onToggleFilter={handleToggleFilter}
                  onResetFilters={handleResetFilters}
                  cities={cityData}
                />
              </div>
              <div className="lg:col-span-8 h-full min-h-[440px]">
                <MapView
                  cities={cityData}
                  selectedCity={selectedCity}
                  onSelectCity={handleSelectCity}
                  selectedFilters={selectedFilters}
                />
              </div>
            </div>
            <CityComparisonPanel cities={cityData} onSelectCity={handleSelectCity} />
          </div>
        )}

        {activeTab === 'Risk Tiers' && (
          <div className="animate-fade-in-up">
            <RiskTiersView />
          </div>
        )}

        {activeTab === 'Location Profile' && (
          <div className="animate-fade-in-up">
            <LocationProfileView
              cities={cityData}
              selectedCity={selectedCity}
              onSelectCity={(city) => setSelectedCity(city)}
            />
          </div>
        )}

        {activeTab === 'Reports' && (
          <div className="animate-fade-in-up">
            <ReportsView />
          </div>
        )}
      </main>

      <footer className="mt-12 border-t border-slate-900 bg-slate-950/90 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            <span className="font-semibold text-slate-400">Hyperscale DC Threat Assessment Framework (India)</span>
          </div>
          <div className="font-mono">
            Compliant with CEA &bull; WRI Aqueduct 4.0 &bull; Uptime Institute Tier Standards
          </div>
        </div>
      </footer>
    </div>
  );
}

