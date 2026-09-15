export const cities = [
  {
    id: 'mumbai',
    code: 'IN-MH-MUM',
    name: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0760,
    lng: 72.8777,
    csti: 34,
    tier: 'Tier 1',
    riskLevel: 'Low-Moderate',
    capacityMW: 1020,
    activeDCs: 24,
    cableLandingStations: 16,
    scores: {
      POWER: 20,
      WATER: 30,
      CLIMATE: 60,
      REGULATORY: 25,
      INFRASTRUCTURE: 35,
    },
    metrics: {
      powerUptime: '99.98%',
      annualOutageHours: '1.4 hrs/yr',
      renewableMix: '34%',
      waterStressScore: '2.1 (Moderate)',
      waterConsumption: '1.8 L/kWh',
      climateHazards: 'Monsoon Flash Floods, Coastal Surge',
      seismicZone: 'Zone III (Moderate)',
      policyIncentive: 'Maharashtra DC Policy 2020 (Power Tariff Subsidies)',
      fiberRedundancy: 'High (16 CLS, Multiple Terrestrial Rings)',
    },
    details: {
      powerDesc: 'Highly resilient islanding grid system with dual-source substations and lowest unplanned downtime in India.',
      waterDesc: 'Municipal supply backed by municipal water treatment plants; moderate baseline water stress.',
      climateDesc: 'Vulnerable to intense monsoonal precipitation (>2,200mm) and high ambient coastal humidity.',
      regDesc: 'Established data center policy with fast-track clearances and renewable energy wheeling concessions.',
      infraDesc: 'India’s premier digital gateway hosting over 65% of national international internet bandwidth.',
    }
  },
  {
    id: 'chennai',
    code: 'IN-TN-CHE',
    name: 'Chennai',
    state: 'Tamil Nadu',
    lat: 13.0827,
    lng: 80.2707,
    csti: 61,
    tier: 'Tier 3',
    riskLevel: 'High',
    capacityMW: 480,
    activeDCs: 14,
    cableLandingStations: 8,
    scores: {
      POWER: 70,
      WATER: 85,
      CLIMATE: 70,
      REGULATORY: 35,
      INFRASTRUCTURE: 45,
    },
    metrics: {
      powerUptime: '99.82%',
      annualOutageHours: '8.2 hrs/yr',
      renewableMix: '48%',
      waterStressScore: '4.6 (Extremely High)',
      waterConsumption: '2.4 L/kWh',
      climateHazards: 'Tropical Cyclones, Coastal Inundation',
      seismicZone: 'Zone III (Moderate)',
      policyIncentive: 'Tamil Nadu Data Centre Policy 2021 (Dual Power Feeder Mandate)',
      fiberRedundancy: 'High (8 CLS, Direct links to Singapore & UAE)',
    },
    details: {
      powerDesc: 'High renewable integration introduces frequency volatility; backup diesel dependencies are frequent.',
      waterDesc: 'Acute structural groundwater stress; dependence on sea-water desalination plants for chilling circuits.',
      climateDesc: 'Severe vulnerability to Bay of Bengal cyclonic storms and heavy storm surge flooding.',
      regDesc: 'Proactive state policies with green power open access, though clearance processing times vary.',
      infraDesc: 'Second largest submarine cable landing hub with sub-40ms latency routes to Southeast Asia.',
    }
  },
  {
    id: 'hyd',
    code: 'IN-TS-HYD',
    name: 'Hyderabad',
    state: 'Telangana',
    lat: 17.3850,
    lng: 78.4867,
    csti: 54,
    tier: 'Tier 2',
    riskLevel: 'Moderate',
    capacityMW: 550,
    activeDCs: 16,
    cableLandingStations: 0,
    scores: {
      POWER: 55,
      WATER: 65,
      CLIMATE: 45,
      REGULATORY: 50,
      INFRASTRUCTURE: 55,
    },
    metrics: {
      powerUptime: '99.91%',
      annualOutageHours: '4.1 hrs/yr',
      renewableMix: '38%',
      waterStressScore: '3.8 (High)',
      waterConsumption: '2.1 L/kWh',
      climateHazards: 'Heatwaves (Peak >44°C)',
      seismicZone: 'Zone II (Low)',
      policyIncentive: 'Telangana ICT Policy & Single Window TS-iPASS',
      fiberRedundancy: 'Moderate (Dense terrestrial dark fiber to Mumbai & Chennai)',
    },
    details: {
      powerDesc: 'Steady 24/7 dedicated industrial feeders supported by state solar grid generation.',
      waterDesc: 'Dependent on Godavari/Krishna pipelines; elevated summer stress for cooling towers.',
      climateDesc: 'Geologically stable Deccan plateau with negligible seismic or coastal storm threat.',
      regDesc: 'Progressive regulatory framework with single-window industrial approvals within 21 days.',
      infraDesc: 'Fast-growing inland connectivity node with redundant DWDM links to east and west coasts.',
    }
  },
  {
    id: 'bengaluru',
    code: 'IN-KA-BLR',
    name: 'Bengaluru',
    state: 'Karnataka',
    lat: 12.9716,
    lng: 77.5946,
    csti: 58,
    tier: 'Tier 3',
    riskLevel: 'High',
    capacityMW: 420,
    activeDCs: 12,
    cableLandingStations: 0,
    scores: {
      POWER: 55,
      WATER: 90,
      CLIMATE: 40,
      REGULATORY: 45,
      INFRASTRUCTURE: 60,
    },
    metrics: {
      powerUptime: '99.88%',
      annualOutageHours: '5.6 hrs/yr',
      renewableMix: '52%',
      waterStressScore: '4.9 (Critical Crisis)',
      waterConsumption: '2.6 L/kWh',
      climateHazards: 'Urban Water Scarcity, Urban Flooding',
      seismicZone: 'Zone II (Low)',
      policyIncentive: 'Karnataka DC Policy 2022 (Renewable Mandates & Subsidies)',
      fiberRedundancy: 'Moderate-High (National tech fiber backbone)',
    },
    details: {
      powerDesc: 'High state green energy penetration with robust inter-state transmission linkages.',
      waterDesc: 'Critical water depletion crisis; stringent groundwater bans require closed-loop dry cooling retrofits.',
      climateDesc: 'Mild highland climate reduces baseline cooling energy demands, though urban flash floods occur.',
      regDesc: 'Comprehensive incentives with high focus on green datacenter certifications (LEED/IGBC).',
      infraDesc: 'Massive local enterprise demand, though land acquisition costs and urban congestion remain bottlenecks.',
    }
  },
  {
    id: 'noida',
    code: 'IN-UP-NOI',
    name: 'Noida',
    state: 'Uttar Pradesh',
    lat: 28.5355,
    lng: 77.3910,
    csti: 53,
    tier: 'Tier 2',
    riskLevel: 'Moderate',
    capacityMW: 620,
    activeDCs: 15,
    cableLandingStations: 0,
    scores: {
      POWER: 35,
      WATER: 75,
      CLIMATE: 65,
      REGULATORY: 40,
      INFRASTRUCTURE: 50,
    },
    metrics: {
      powerUptime: '99.94%',
      annualOutageHours: '2.8 hrs/yr',
      renewableMix: '24%',
      waterStressScore: '4.1 (High)',
      waterConsumption: '2.3 L/kWh',
      climateHazards: 'Extreme Summer Temperatures (>46°C), Air Particulates',
      seismicZone: 'Zone IV (High Seismic)',
      policyIncentive: 'UP Data Centre Policy 2021 (Capital & Interest Subsidies)',
      fiberRedundancy: 'Moderate (Hub for Northern India and NCR Backbone)',
    },
    details: {
      powerDesc: 'Dedicated 400kV and 220kV sub-stations ring specifically servicing Greater Noida DC parks.',
      waterDesc: 'High groundwater extraction in Yamuna basin; reliance on tertiary treated industrial water.',
      climateDesc: 'High peak ambient summer heatwaves and proximity to Himalayan tectonic faultline (Zone IV).',
      regDesc: 'Highly aggressive state policy offering up to 25% capital subsidy and 100% stamp duty exemption.',
      infraDesc: 'Primary north Indian junction with direct DWDM links across the National Capital Region.',
    }
  }
];

export const riskTiers = [
  {
    tier: 'Tier 1',
    id: 'POWER',
    name: 'Power Risk',
    color: '#10b981',
    weight: '30%',
    description: 'Grid stability, transmission loss, renewable mix, and outage frequency across regional grids.',
    scoringLogic: 'Evaluated by factoring annual outage duration, frequency fluctuations, peak grid deficit %, and captive renewable penetration.',
    indicators: [
      { metric: 'Grid Outage Frequency', unit: 'events/yr', formula: 'Normalized CEA grid fault occurrences' },
      { metric: 'Peak Grid Deficit', unit: '%', formula: 'Peak demand vs dispatchable supply gap' },
      { metric: 'Renewable Power Mix', unit: '%', formula: 'Fraction of solar/wind in regional supply' },
      { metric: 'Carbon Intensity', unit: 'gCO2/kWh', formula: 'Ember Energy grid generation emissions' },
    ],
    examples: ['Mumbai (Lowest Risk: 20)', 'Chennai (High Risk: 70)']
  },
  {
    tier: 'Tier 2',
    id: 'WATER',
    name: 'Water Stress',
    color: '#06b6d4',
    weight: '25%',
    description: 'Baseline water stress, aquifer depletion, cooling tower water demand, and municipal drought severity.',
    scoringLogic: 'Derived from WRI Aqueduct 4.0 Water Stress index, local groundwater exploitation level, and seasonal rainfall deficits.',
    indicators: [
      { metric: 'Baseline Water Stress (BWS)', unit: 'Index 0-5', formula: 'Total water withdrawals / available supply' },
      { metric: 'Cooling Water Footprint', unit: 'L/kWh', formula: 'Evaporative chiller consumption profile' },
      { metric: 'Aquifer Depletion Rate', unit: 'cm/yr', formula: 'Central Ground Water Board telemetry' },
      { metric: 'Drought Return Period', unit: 'Years', formula: 'Historical drought frequency probability' },
    ],
    examples: ['Bengaluru (Critical: 90)', 'Chennai (Severe: 85)']
  },
  {
    tier: 'Tier 3',
    id: 'CLIMATE',
    name: 'Climate & Physical Risk',
    color: '#f59e0b',
    weight: '20%',
    description: 'Natural hazards including tropical cyclones, coastal surge, monsoonal flash floods, and seismic zonation.',
    scoringLogic: 'Combines IMD cyclonic storm trajectories, NDMA flood vulnerability maps, wet-bulb heatwave days (>35°C), and BIS seismic zones.',
    indicators: [
      { metric: '100-Year Flood Vulnerability', unit: 'Risk Index', formula: 'Elevation profile & drainage catchment models' },
      { metric: 'Coastal Cyclone Severity', unit: 'Category Scale', formula: 'IMD track frequency & wind gust telemetry' },
      { metric: 'Wet-Bulb Temperature Max', unit: '°C', formula: 'NASA POWER ambient psychrometric peaks' },
      { metric: 'Seismic Hazard Category', unit: 'Zone II-V', formula: 'Bureau of Indian Standards IS 1893:2016' },
    ],
    examples: ['Chennai (70)', 'Noida (65)', 'Mumbai (60)']
  },
  {
    tier: 'Tier 4',
    id: 'REGULATORY',
    name: 'Regulatory & Policy Risk',
    color: '#8b5cf6',
    weight: '15%',
    description: 'State data center policies, DPDP Act compliance, open access renewable wheeling tariffs, and clearance approvals.',
    scoringLogic: 'Scored using compliance burden metrics, policy subsidy stability, cross-subsidy surcharge (CSS) tariffs, and statutory approval SLA.',
    indicators: [
      { metric: 'Data Protection (DPDP) Readiness', unit: 'Index 0-100', formula: 'Statutory compliance and audit complexity' },
      { metric: 'Open Access Surcharge (CSS)', unit: '₹/kWh', formula: 'State Electricity Regulatory Commission tariff orders' },
      { metric: 'State DC Policy Incentives', unit: 'Score 0-100', formula: 'Capital, land subsidy & dual feeder mandates' },
      { metric: 'Statutory Clearance SLA', unit: 'Days', formula: 'Average environmental & building permission turnaround' },
    ],
    examples: ['Mumbai (Favorable: 25)', 'Hyderabad (Balanced: 50)']
  },
  {
    tier: 'Tier 5',
    id: 'INFRASTRUCTURE',
    name: 'Infrastructure & Connectivity',
    color: '#ec4899',
    weight: '10%',
    description: 'Subsea cable landing density, terrestrial dark-fiber route diversity, substation redundancy, and transport access.',
    scoringLogic: 'Evaluated by counting landing stations, carrier-neutral Meet-Me-Rooms (MMR), latency to major exchange points, and power grid proximity.',
    indicators: [
      { metric: 'Submarine Cable Stations (CLS)', unit: 'Count', formula: 'Active undersea fiber landing links' },
      { metric: 'Dark Fiber Diverse Routes', unit: 'Paths', formula: 'Physically separated ring redundancies' },
      { metric: 'IXP Latency (Domestic Avg)', unit: 'ms', formula: 'Round-trip delay to Mumbai NIXI exchange' },
      { metric: 'Substation Proximity & Spec', unit: 'kV / Dist', formula: 'Dual-feed 220kV/400kV dedicated distance' },
    ],
    examples: ['Bengaluru (60)', 'Noida (50)', 'Mumbai (35)']
  }
];

export const historicalOutageTrends = [
  { year: '2018', Mumbai: 3.8, Chennai: 14.5, Hyderabad: 8.2, Bengaluru: 9.4, Noida: 6.5 },
  { year: '2019', Mumbai: 3.1, Chennai: 13.2, Hyderabad: 7.1, Bengaluru: 8.6, Noida: 5.8 },
  { year: '2020', Mumbai: 2.6, Chennai: 11.4, Hyderabad: 6.3, Bengaluru: 7.8, Noida: 4.9 },
  { year: '2021', Mumbai: 2.2, Chennai: 10.1, Hyderabad: 5.4, Bengaluru: 6.9, Noida: 4.1 },
  { year: '2022', Mumbai: 1.8, Chennai: 9.5, Hyderabad: 4.9, Bengaluru: 6.2, Noida: 3.5 },
  { year: '2023', Mumbai: 1.5, Chennai: 8.7, Hyderabad: 4.4, Bengaluru: 5.8, Noida: 3.1 },
  { year: '2024', Mumbai: 1.4, Chennai: 8.2, Hyderabad: 4.1, Bengaluru: 5.6, Noida: 2.8 },
];

export const renewableGenerationGrowth = [
  { year: '2018', Solar: 38, Wind: 52, Hydro: 45, Biomass: 10 },
  { year: '2019', Solar: 56, Wind: 64, Hydro: 48, Biomass: 12 },
  { year: '2020', Solar: 78, Wind: 72, Hydro: 51, Biomass: 13 },
  { year: '2021', Solar: 102, Wind: 85, Hydro: 54, Biomass: 14 },
  { year: '2022', Solar: 135, Wind: 98, Hydro: 56, Biomass: 16 },
  { year: '2023', Solar: 172, Wind: 112, Hydro: 59, Biomass: 17 },
  { year: '2024', Solar: 215, Wind: 128, Hydro: 62, Biomass: 19 },
];

export const cstiFormula = "CSTI = \\sum_{i=1}^{5} (w_i \\times \\text{Risk}_i) = (0.30 \\times \\text{Power}) + (0.25 \\times \\text{Water}) + (0.20 \\times \\text{Climate}) + (0.15 \\times \\text{Regulatory}) + (0.10 \\times \\text{Infra})";

export const dataSources = [
  {
    name: 'Ember Energy API',
    type: 'REST API (Live)',
    desc: 'National and state-level electricity grid carbon intensity, fossil vs renewable mix, and hourly dispatch telemetry.',
    frequency: 'Hourly',
    lastSync: '10 mins ago',
    status: 'Operational',
    badgeColor: 'emerald'
  },
  {
    name: 'NASA POWER Project',
    type: 'API Telemetry',
    desc: 'Solar irradiance, wet-bulb ambient temperatures, psychrometric dew points, and relative humidity for cooling load models.',
    frequency: 'Daily',
    lastSync: '1 hour ago',
    status: 'Operational',
    badgeColor: 'emerald'
  },
  {
    name: 'WRI Aqueduct 4.0',
    type: 'Geospatial Dataset',
    desc: 'Baseline water stress, interannual groundwater variability, and 2030/2050 climate change water projection layers.',
    frequency: 'Monthly',
    lastSync: '3 days ago',
    status: 'Operational',
    badgeColor: 'emerald'
  },
  {
    name: 'data.gov.in / CEA',
    type: 'Open Government Data',
    desc: 'Central Electricity Authority monthly power supply position, transmission line outages, and regional substation peak loads.',
    frequency: 'Monthly',
    lastSync: 'Yesterday',
    status: 'Operational',
    badgeColor: 'emerald'
  },
  {
    name: 'NDMA & IMD India',
    type: 'Spatial Hazards Feed',
    desc: 'National Disaster Management Authority hazard atlas, flood recurrence intervals, tropical cyclone tracks, and seismic zonation.',
    frequency: 'Real-time',
    lastSync: '15 mins ago',
    status: 'Operational',
    badgeColor: 'emerald'
  }
];

