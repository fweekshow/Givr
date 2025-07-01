import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';
import { useRef } from 'react';

export default function ClientWallet() {
  const dropdownRef = useRef(null);

  return (
    <div className="flex justify-end relative z-50" ref={dropdownRef}>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        dropdownContainerRef={dropdownRef}
      >
        <Wallet>
          <ConnectWallet>
            <Avatar className="h-4 w-4" />
            <Name className="truncate max-w-[70px] text-xs" />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-2 py-1 text-xs gap-1" hasCopyAddressOnClick>
              <Avatar className="h-4 w-4" />
              <Name className="truncate max-w-[70px] text-xs" />
              <Address className="text-[10px] text-gray-400 truncate max-w-[90px]" />
            </Identity>
            <WalletDropdownDisconnect className="w-full bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition mt-1" />
          </WalletDropdown>
        </Wallet>
      </OnchainKitProvider>
    </div>
  );
}
