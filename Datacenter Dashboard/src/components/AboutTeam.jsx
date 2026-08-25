import React from 'react';

const AboutTeam = () => {
  const team = [
    { name: 'Md Mabud', role: 'React Developer', bio: 'Expert in React Dashhboard Rendering.' },
    { name: 'Ambarish Manna', role: 'Java Developer', bio: 'Architects Spring Boot and REST API.' },
    { name: 'Md Rehan', role: 'Climate Risk Analyst', bio: 'Specializes in NDMA data integration.' }
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">Project Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {team.map((member, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-lg border border-slate-700 text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-3"></div>
            <h3 className="text-white font-bold">{member.name}</h3>
            <p className="text-cyan-400 text-sm">{member.role}</p>
            <p className="text-slate-400 text-xs mt-2">{member.bio}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-slate-900 p-4 rounded-lg border border-slate-700">
        <h3 className="text-lg text-white mb-2">Contact Information</h3>
        <p className="text-slate-400 text-sm">Email: <a href="mailto:info@hyperscale-dc.com" className="text-cyan-400">info@hyperscale-dc.com</a></p>
        <p className="text-slate-400 text-sm">Phone: +91 80 1234 5678</p>
      </div>
    </div>
  );
};

export default AboutTeam;