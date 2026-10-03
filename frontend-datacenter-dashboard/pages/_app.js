import Head from 'next/head';
import '../src/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
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