const { causes } = require('../data/causes');
import Head from 'next/head';

export default function Home({ cause }) {
  // Use the static QR code path
  const qrPath = '/qr/daily-cause.png';

  return (
    <>
      <Head>
        <title>Scan to Support - {cause ? cause.name : 'Cause Coming Soon'}</title>
        <meta name="description" content={cause ? cause.description : 'Support amazing causes through QR code donations'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1DB64F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      {/* Fixed logo in the top right corner, responsive sizing */}
      <a
        href="https://www.evergreenfund.life"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50"
        style={{ display: 'block' }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-lg border-2 md:border-4 border-terminal bg-terminal-card rounded-lg"
        />
      </a>

      <div className="min-h-screen flex items-center justify-center px-4 md:px-6 bg-terminal-bg">
        <div className="bg-terminal-card rounded-xl p-6 md:p-10 shadow-xl max-w-xl w-full text-center border border-terminal mx-4">
          {cause ? (
            <>
              <h1 className="text-2xl md:text-3xl font-bold text-terminal mb-4 tracking-wide">
                {cause.name}
              </h1>
              <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-8 max-w-md mx-auto leading-relaxed">
                {cause.description}
              </p>

              <div className="flex flex-col items-center gap-4 mb-6 md:mb-8">
                <div className="bg-terminal-bg p-3 md:p-5 rounded-xl inline-block border-2 border-terminal shadow-md">
                  <img
                    src={qrPath}
                    alt="Daily Cause QR Code"
                    className="w-40 h-40 md:w-48 md:h-48 rounded-lg"
                  />
                </div>
                <a
                  href={cause.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs bg-terminal text-black px-6 md:px-8 py-4 md:py-3 rounded font-bold shadow hover:bg-terminal/80 active:bg-terminal/90 transition text-center border-2 border-terminal tracking-widest text-base md:text-sm"
                  style={{ fontFamily: 'Fira Mono, Menlo, Consolas, monospace' }}
                >
                  DONATE
                </a>
              </div>

              <p className="text-xs md:text-sm text-terminal mt-4 md:mt-6 px-2">
                Scan the QR code above with your phone's camera to donate directly to today's cause.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-semibold text-terminal mb-4">
                Cause Coming Soon
              </h1>
              <p className="text-sm md:text-md text-gray-400">
                Please check back later for today's featured cause.
              </p>
            </>
          )}
        </div>
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
