export function Providers({ children }) {
  // Simple provider that just renders children
  // OnchainKit provider is now handled in the client-side wallet component
  return <>{children}</>;
} 