import Head from 'next/head';
import 'leaflet/dist/leaflet.css';
import '../src/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=localStorage.getItem('theme-preference')||'auto';var l=p==='light'||(p==='auto'&&window.matchMedia('(prefers-color-scheme: light)').matches);var r=document.documentElement;r.classList.add(l?'light':'dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;