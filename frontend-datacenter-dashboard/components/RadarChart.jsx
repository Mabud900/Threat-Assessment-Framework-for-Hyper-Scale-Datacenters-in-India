import React from 'react';
import { RadarChart, Radar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';

export default function CityRiskRadar({ scores, csti, tier }) {
  const data = [
    { name: 'Power', score: scores.POWER || 0 },
    { name: 'Water', score: scores.WATER || 0 },
    { name: 'Climate', score: scores.CLIMATE || 0 },
    { name: 'Regulatory', score: scores.REGULATORY || 0 },
    { name: 'Infra', score: scores.INFRASTRUCTURE || 0 },
  ];

  const minScore = Math.min(...data.map((d) => d.score)), maxScore = Math.max(...data.map((d) => d.score));

  return (
    <RadarChart data={data} margin={{ top: 80, right: 80, bottom: 80, left: 80 }}>
      <Legend />
      <XAxis dataKey="name" />
      <YAxis domain={[{ min: minScore - 10, max: maxScore + 10 }]} ticks={5} />
      <Tooltip />
      <Cell stroke="#8884d8" strokeWidth={2} fill="#8884d8" fillOpacity={0.4} />
      {data.map((item, index) => (
        <key key={item.name}>
          <Radar dataKey="name" dataIndex={index} fill="#8884d8" fillOpacity={0.4} />
          <Cell dataKey="name" dataIndex={index} stroke="#8884d8" strokeWidth={2} />
        </key>
      ))}
    </RadarChart>
  );
}