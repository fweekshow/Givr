import { useRef, useEffect, useState } from 'react';
const { causes } = require('../data/causes');
const Head = require('next/head').default;
const Link = require('next/link').default;
import ActivityFeed from '../components/ActivityFeed';

export default function Home({ cause }) {
  // Use the static QR code path
  const qrPath = '/qr/daily-cause.png';

  // Helper to extract EIN from external_link and remove hyphens
  function extractEinFromUrl(url) {
    const match = url && url.match(/orgs\/([\d-]+)/);
    return match ? match[1].replace(/-/g, '') : null;
  }
  const ein = extractEinFromUrl(cause?.external_link);

  // Pixel-perfect height matching for desktop
  const leftCardRef = useRef(null);
  const [leftCardHeight, setLeftCardHeight] = useState();
  useEffect(() => {
    function updateHeight() {
      if (leftCardRef.current) {
        setLeftCardHeight(leftCardRef.current.offsetHeight);
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [cause, ein]);

  return (
    <>
      <Head>
        <title>{`Scan to Support - ${cause ? cause.name : 'Cause Coming Soon'}`}</title>
        <meta name="description" content={cause ? cause.description : 'Support amazing causes through QR code donations'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1DB64F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      <div className="container-layout mt-8">
        {/* Cause Card */}
        <div ref={leftCardRef} className="card-layout card-fixed-size">
          {cause ? (
            <>
              <h1 className="text-xl md:text-2xl font-bold text-terminal mb-2 tracking-wide text-center mx-auto">
                {cause.name}
              </h1>
              <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-6 max-w-md mx-auto leading-relaxed">
                {cause.description}
              </p>

              <div className="flex flex-col items-center gap-3 mb-4 md:mb-6">
                <div className="bg-white p-2 md:p-3 rounded-xl inline-block border-2 border-terminal shadow-md">
                  <img
                    src={qrPath}
                    alt="Daily Cause QR Code"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-lg"
                  />
                </div>
                <a
                  href={cause.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs bg-terminal text-black px-4 md:px-6 py-3 md:py-2 rounded font-bold shadow hover:bg-terminal/80 active:bg-terminal/90 transition text-center border-2 border-terminal tracking-widest text-base md:text-sm"
                  style={{ fontFamily: 'Fira Mono, Menlo, Consolas, monospace' }}
                >
                  DONATE
                </a>
              </div>

              <p className="text-xs md:text-sm text-white mt-2 md:mt-4 px-2 text-center">
                Scan the QR code above with your phone's camera to donate directly to today's cause.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl md:text-2xl font-semibold text-terminal mb-2">
                Cause Coming Soon
              </h1>
              <p className="text-sm md:text-md text-gray-400">
                Please check back later for today's featured cause.
              </p>
            </>
          )}
        </div>
        {/* Activity Feed Card */}
        {ein && (
          <div
            className="card-layout card-fixed-size overflow-y-auto"
            style={leftCardHeight ? { maxHeight: leftCardHeight, minHeight: 0 } : {}}
          >
            <ActivityFeed ein={ein} />
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Get current date in Pacific Time
  const pacific = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const today = new Date(pacific).toISOString().split('T')[0];
  const match = causes.find(c => c.date === today);
  return {
    props: {
      cause: match || null,
    },
  };
}
