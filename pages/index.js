import { causes } from '../data/causes';
import Head from 'next/head';

export default function Home({ cause }) {
  // Use the static QR code path
  const qrPath = '/qr/daily-cause.png';

  return (
    <>
      <Head>
        <title>Scan to Support - {cause ? cause.name : 'Cause Coming Soon'}</title>
        <meta name="description" content={cause ? cause.description : 'Support amazing causes through QR code donations'} />
      </Head>

      {/* Fixed logo in the top right corner, now clickable */}
      <a
        href="https://www.evergreenfund.life"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-50"
        style={{ display: 'block' }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="w-24 h-24 object-contain drop-shadow-lg border-4 border-terminal bg-terminal-card rounded-lg"
        />
      </a>

      <div className="min-h-screen flex items-center justify-center px-6 bg-terminal-bg">
        <div className="bg-terminal-card rounded-xl p-10 shadow-xl max-w-xl w-full text-center border border-terminal">
          {cause ? (
            <>
              <h1 className="text-3xl font-bold text-terminal mb-4 tracking-wide">
                {cause.name}
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-md mx-auto leading-relaxed">
                {cause.description}
              </p>

              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="bg-terminal-bg p-5 rounded-xl inline-block border-2 border-terminal shadow-md">
                  <img
                    src={qrPath}
                    alt="Daily Cause QR Code"
                    className="w-48 h-48 rounded-lg"
                  />
                </div>
                <a
                  href={cause.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs bg-terminal text-black px-8 py-3 rounded font-bold shadow hover:bg-terminal/80 transition text-center border-2 border-terminal tracking-widest"
                  style={{ fontFamily: 'Fira Mono, Menlo, Consolas, monospace' }}
                >
                  DONATE
                </a>
              </div>

              <p className="text-sm text-terminal mt-6">
                Scan the QR code above with your phone's camera to donate directly to today's cause.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-terminal mb-4">
                Cause Coming Soon
              </h1>
              <p className="text-md text-gray-400">
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
