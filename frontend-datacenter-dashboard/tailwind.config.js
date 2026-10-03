const plugin = require('tailwindcss/plugin');
const twColors = require('tailwindcss/colors');

/* ---- Theme-aware palette -------------------------------------------------
 * Each palette colour resolves to a CSS variable. Dark (default) uses the stock
 * Tailwind values; `html.light` swaps in a mapped shade, so existing classes
 * like bg-slate-900 / text-cyan-400 re-theme automatically.
 */
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const NEUTRALS = ['slate'];
const ACCENTS = ['cyan', 'emerald', 'amber', 'rose', 'purple', 'pink', 'blue', 'indigo', 'sky', 'violet', 'teal', 'green', 'red', 'orange', 'yellow'];

// Neutral scale is mirrored (900 <-> 100). Accents keep solid fills (500-700)
// and only flip surfaces (800-950 -> pale) and text (300/400 -> deeper).
const lightShade = (name, s) => {
  if (NEUTRALS.includes(name)) return 1000 - s;
  const map = { 50: 950, 100: 900, 200: 800, 300: 700, 400: 600, 800: 200, 900: 100, 950: 50 };
  return map[s] ?? s;
};

const toChannels = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(' ');
};

const themedColors = {};
const darkVars = {};
const lightVars = {};
[...NEUTRALS, ...ACCENTS].forEach((name) => {
  themedColors[name] = {};
  SHADES.forEach((s) => {
    themedColors[name][s] = `rgb(var(--c-${name}-${s}) / <alpha-value>)`;
    darkVars[`--c-${name}-${s}`] = toChannels(twColors[name][s]);
    lightVars[`--c-${name}-${s}`] = toChannels(twColors[name][lightShade(name, s)]);
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...themedColors,
        cyber: {
          950: '#030712',
          900: '#0b1120',
          850: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          violet: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.25)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glow-amber': '0 0 25px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': darkVars,
        'html.light': lightVars,
      });
    }),
  ],
};
