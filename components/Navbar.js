import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the client-side wallet component with no SSR
const ClientWallet = dynamic(
  () => import('./ClientWallet'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-20 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    )
  }
);

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center h-14 px-4 mt-3 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        {/* Home Link */}
        <Link href="/" legacyBehavior>
          <a className="flex items-center gap-2 hover:opacity-80 font-bold tracking-wide">
            <span className="border border-white rounded-xl p-2 flex items-center justify-center bg-black bg-opacity-60" style={{boxShadow:'0 2px 8px 0 rgba(0,0,0,0.06)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5" />
              </svg>
            </span>
            <span className="hidden sm:inline text-base text-white">Home</span>
          </a>
        </Link>
        {/* Claims Icon */}
        <Link href="/claim" legacyBehavior>
          <a className="flex items-center gap-2 hover:opacity-80 font-bold tracking-wide">
            <span className="border border-white rounded-xl p-2 flex items-center justify-center bg-black bg-opacity-60" style={{boxShadow:'0 2px 8px 0 rgba(0,0,0,0.06)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h17.25M4.5 8.25V19.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V8.25m-15 0A2.25 2.25 0 017.5 6h9a2.25 2.25 0 012.25 2.25m-15 0A2.25 2.25 0 003.75 9v1.5a2.25 2.25 0 002.25 2.25h.75m15-6h.75A2.25 2.25 0 0122.5 9v1.5a2.25 2.25 0 01-2.25 2.25h-.75M12 8.25v12" />
              </svg>
            </span>
            <span className="hidden sm:inline text-base text-white">Claims</span>
          </a>
        </Link>
      </div>
      {/* Client-side only wallet component */}
      <div className="flex items-center gap-2">
        <ClientWallet />
      </div>
    </nav>
  );
} 