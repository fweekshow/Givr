import React, { useEffect, useState } from 'react';

export default function ClientWallet() {
  const [WalletComponent, setWalletComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically import OnchainKit components only on client side
    const loadWalletComponents = async () => {
      try {
        const { OnchainKitProvider } = await import('@coinbase/onchainkit');
        const { base } = await import('wagmi/chains');
        const { Wallet, ConnectWallet, WalletDropdown, WalletDropdownFundLink, WalletDropdownDisconnect } = await import('@coinbase/onchainkit/wallet');
        const { Address, Avatar, Name, Identity, EthBalance } = await import('@coinbase/onchainkit/identity');
        
        const WalletUI = () => (
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={base}
          >
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-5 w-5" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownFundLink />
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </OnchainKitProvider>
        );
        
        setWalletComponent(() => WalletUI);
      } catch (error) {
        console.error('Failed to load wallet components:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWalletComponents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-20 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (!WalletComponent) {
    return (
      <div className="flex items-center gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Connect Wallet
        </button>
      </div>
    );
  }

  return <WalletComponent />;
} 