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

export default function ClientWallet() {
  console.log('OnchainKit API Key:', process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY);
  return (
    <div className="z-50">
      <Wallet>
        <ConnectWallet className="flex items-center gap-2 bg-[#625df5] text-white px-4 py-2 rounded-md shadow-md transition w-[240px]">
          <Avatar className="h-5 w-5" />
          <Name className="truncate max-w-[160px] text-sm" />
        </ConnectWallet>
        <WalletDropdown className="mt-2 min-w-[220px] w-fit bg-white text-black border border-black rounded-md p-2">
          <WalletDropdownDisconnect className="w-full border border-black text-black text-sm px-3 py-2 rounded hover:bg-gray-100 transition" />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
