export const cities = [
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', csti: 34, tier: 'Tier 1' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', csti: 61, tier: 'Tier 3' },
  { id: 'hyd', name: 'Hyderabad', state: 'Telangana', csti: 54, tier: 'Tier 2' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', csti: 58, tier: 'Tier 3' },
  { id: 'noida', name: 'Noida', state: 'Uttar Pradesh', csti: 53, tier: 'Tier 2' },
];

export const riskTiers = [
  { tier: 'Tier 1', risk: 'Power Risk', description: 'High grid instability and power deficit.', examples: ['Mumbai'] },
  { tier: 'Tier 2', risk: 'Water Stress', description: 'Severe water scarcity for cooling.', examples: ['Mumbai', 'Noida'] },
  { tier: 'Tier 3', risk: 'Climate / Physical', description: 'High flood/cyclone risk zones.', examples: ['Chennai', 'Bengaluru'] },
  { tier: 'Tier 4', risk: 'Regulatory / Policy', description: 'Strict data localization laws.', examples: [] },
  { tier: 'Tier 5', risk: 'Infrastructure', description: 'Poor fiber connectivity & land acquisition.', examples: [] },
];

export const cstiFormula = "CSTI = (W1*Power + W2*Water + W3*Climate + W4*Regulatory + W5*Infra) / 5";

export const dataSources = [
  { name: 'Ember Energy API', type: 'REST API', desc: 'Real-time grid carbon intensity & power outage data.' },
  { name: 'Aqueduct Water Risk', type: 'Dataset', desc: 'WRI baseline water stress scores.' },
  { name: 'NDMA India', type: 'Gov API', desc: 'Climate vulnerability & physical disaster risks.' },
];