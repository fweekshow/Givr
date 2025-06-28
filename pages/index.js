import { causes } from '../data/causes';
import Head from 'next/head';
import '../styles/globals.css'



export default function Home({ cause }) {
  const slug = cause?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const qrPath = `/qr/${slug}.png`;

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
          className="w-28 h-28 object-contain drop-shadow-lg"
          style={{ borderRadius: '12px', background: 'white', padding: '4px' }}
        />
      </a>

      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark font-inter flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-xl w-full text-center">
          {cause && (
            <img
              src={cause.logo || '/logo.png'}
              alt={cause.name}
              className="w-28 h-28 object-contain mx-auto mb-6 hidden" // Hide the logo in the card
            />
          )}

          {cause ? (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {cause.name}
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                {cause.description}
              </p>

              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="bg-green-50 p-5 rounded-xl inline-block">
                  <img
                    src={qrPath}
                    alt={`QR Code for ${cause.name}`}
                    className="w-48 h-48 rounded-lg shadow-md"
                  />
                </div>
                <a
                  href={cause.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition text-center"
                >
                  Donate via Endaoment
                </a>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Scan the QR code above with your phone's camera to donate directly to this cause.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Cause Coming Soon
              </h1>
              <p className="text-md text-gray-500">
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
