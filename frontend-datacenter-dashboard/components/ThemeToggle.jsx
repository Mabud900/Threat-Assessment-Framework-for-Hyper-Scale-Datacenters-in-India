import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme-preference';

const OPTIONS = [
  {
    id: 'auto',
    label: 'Auto (System)',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'light',
    label: 'Light Mode',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    id: 'dark',
    label: 'Dark Mode',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
];

function applyTheme(preference) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const systemLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const isLight = preference === 'light' || (preference === 'auto' && systemLight);
  if (isLight) {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState('auto');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let saved = 'auto';
    try {
      saved = localStorage.getItem(STORAGE_KEY) || 'auto';
    } catch (e) {}
    setPreference(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    if (!mounted || preference !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => applyTheme('auto');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [preference, mounted]);

  const choose = (next) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    setPreference(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
    applyTheme(next);
    window.setTimeout(() => root.classList.remove('theme-transition'), 350);
  };

  return (
    <div
      className="flex items-center gap-0.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs shadow-sm no-print"
      role="group"
      aria-label="Color theme"
    >
      {OPTIONS.map((opt) => {
        const isActive = preference === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => choose(opt.id)}
            aria-pressed={isActive}
            aria-label={opt.label}
            title={opt.label}
            className={`flex items-center justify-center w-7 h-6 rounded-lg transition-all duration-150 ${
              isActive
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
}
