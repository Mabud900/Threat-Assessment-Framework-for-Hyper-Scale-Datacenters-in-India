export const cities = [
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', x: '25%', y: '65%', csti: 78, tier: 'Tier 2' },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', x: '45%', y: '80%', csti: 65, tier: 'Tier 3' },
  { id: 'hyd', name: 'Hyderabad', state: 'Telangana', x: '45%', y: '70%', csti: 72, tier: 'Tier 2' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', x: '35%', y: '75%', csti: 71, tier: 'Tier 2' },
  { id: 'noida', name: 'Noida', state: 'Uttar Pradesh', x: '55%', y: '60%', csti: 68, tier: 'Tier 3' },
];

export const riskTiers = [
  { tier: 'Tier 1', risk: 'Power Risk', description: 'High grid instability and power deficit.', examples: ['Delhi NCR', 'Hyderabad'] },
  { tier: 'Tier 2', risk: 'Water Stress', description: 'Severe water scarcity for cooling.', examples: ['Mumbai', 'Pune'] },
  { tier: 'Tier 3', risk: 'Climate / Physical', description: 'High flood/cyclone risk zones.', examples: ['Chennai', 'Kolkata'] },
  { tier: 'Tier 4', risk: 'Regulatory / Policy', description: 'Strict data localization laws.', examples: ['Jaipur', 'Ahmedabad'] },
  { tier: 'Tier 5', risk: 'Infrastructure', description: 'Poor fiber connectivity & land acquisition.', examples: ['Visakhapatnam'] },
];

export const cstiFormula = "CSTI = (W1*Power + W2*Water + W3*Climate + W4*Regulatory + W5*Infra) / 5";

export const dataSources = [
  { name: 'Ember Energy API', type: 'REST API', desc: 'Real-time grid carbon intensity & power outage data.' },
  { name: 'Aqueduct Water Risk', type: 'Dataset', desc: 'WRI baseline water stress scores.' },
  { name: 'NDMA India', type: 'Gov API', desc: 'Climate vulnerability & physical disaster risks.' },
];