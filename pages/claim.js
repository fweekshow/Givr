import { useEffect, useState } from 'react';

function getToday() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export default function ClaimPage() {
  // Placeholder for wallet address (to be replaced with OnchainKit/wagmi logic)
  const [walletAddress, setWalletAddress] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual wallet connection logic
    // setWalletAddress(...)
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!walletAddress) return;
    const today = getToday();
    const key = `claim_${walletAddress}_${today}`;
    setClaimed(!!localStorage.getItem(key));
  }, [walletAddress]);

  const handleClaim = () => {
    if (!walletAddress) return;
    const today = getToday();
    const key = `claim_${walletAddress}_${today}`;
    localStorage.setItem(key, 'claimed');
    setClaimed(true);
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="bg-terminal-card border border-terminal rounded-xl p-8 max-w-md w-full text-center shadow-xl">
        <h1 className="text-2xl font-bold text-terminal mb-4">Claim Your Daily Reward</h1>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : !walletAddress ? (
          <p className="text-gray-400">Claims Coming Soon</p>
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