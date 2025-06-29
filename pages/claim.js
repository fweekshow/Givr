import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';

function getToday() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export default function ClaimPage() {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (!authenticated || wallets.length === 0) {
      setLoading(false);
      return;
    }
    const today = getToday();
    const key = `claim_${wallets[0].address}_${today}`;
    setClaimed(!!localStorage.getItem(key));
    setLoading(false);
  }, [ready, authenticated, wallets]);

  const handleClaim = () => {
    if (wallets.length === 0) return;
    const today = getToday();
    const key = `claim_${wallets[0].address}_${today}`;
    localStorage.setItem(key, 'claimed');
    setClaimed(true);
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="bg-terminal-card border border-terminal rounded-xl p-8 max-w-md w-full text-center shadow-xl">
        <h1 className="text-2xl font-bold text-terminal mb-4">Claim Your Daily Reward</h1>
        {!ready || loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : !authenticated || wallets.length === 0 ? (
          <p className="text-gray-400">Please sign in and connect your wallet to claim your reward.</p>
        ) : claimed ? (
          <div>
            <p className="text-terminal mb-2">🎉 You have already claimed your reward for today!</p>
            <p className="text-gray-400 text-sm">Come back tomorrow for another reward.</p>
          </div>
        ) : (
          <button className="bg-terminal text-black px-8 py-3 rounded font-bold shadow hover:bg-terminal/80 active:bg-terminal/90 transition border-2 border-terminal tracking-widest text-lg" onClick={handleClaim}>
            Claim Token
          </button>
        )}
      </div>
    </div>
  );
} 