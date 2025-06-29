import Link from 'next/link';
import { usePrivy, useWallets } from '@privy-io/react-auth';

export default function Navbar() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();

  return (
    <nav className="bg-terminal-card border border-terminal rounded-lg max-w-4xl mx-auto mt-3 px-6 py-1 flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-6">
        {/* Home Link */}
        <Link href="/" legacyBehavior>
          <a className="flex items-center gap-2 hover:opacity-80 text-terminal font-bold tracking-wide">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4.5 10.5V21h15V10.5" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </a>
        </Link>
        {/* Claims Icon */}
        <Link href="/claim" legacyBehavior>
          <a className="flex items-center gap-2 hover:opacity-80 text-terminal font-bold tracking-wide">
            {/* Gift icon for claims */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h17.25M4.5 8.25V19.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5V8.25m-15 0A2.25 2.25 0 017.5 6h9a2.25 2.25 0 012.25 2.25m-15 0A2.25 2.25 0 003.75 9v1.5a2.25 2.25 0 002.25 2.25h.75m15-6h.75A2.25 2.25 0 0122.5 9v1.5a2.25 2.25 0 01-2.25 2.25h-.75M12 8.25v12" />
            </svg>
            <span className="hidden sm:inline">Claims</span>
          </a>
        </Link>
      </div>
      {/* Privy Auth Section */}
      <div className="flex flex-col items-end">
        {!ready ? (
          <button className="bg-gray-600 text-white px-4 py-2 rounded" disabled>Loading...</button>
        ) : authenticated ? (
          <div className="flex flex-col items-end gap-1">
            {wallets.length > 0 && (
              <span className="text-xs text-terminal">{wallets[0].address.slice(0, 6)}...{wallets[0].address.slice(-4)}</span>
            )}
            <button className="bg-red-500 text-white px-2 py-1 rounded text-xs font-mono mt-1 h-7 min-h-0 min-w-0" style={{lineHeight:'1.1'}} onClick={logout}>Sign out</button>
          </div>
        ) : (
          <button className="bg-terminal text-black px-4 py-2 rounded font-bold shadow border-2 border-terminal" onClick={login}>
            Sign in / Connect
          </button>
        )}
      </div>
    </nav>
  );
} 