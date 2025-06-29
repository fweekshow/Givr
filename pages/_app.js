import '../styles/globals.css'
import { PrivyProvider } from '@privy-io/react-auth'
import Navbar from '../components/Navbar';

export default function MyApp({ Component, pageProps }) {
  return (
    <PrivyProvider appId="cmci3tfzs009kla0mw08lkuky">
      <Navbar />
      <Component {...pageProps} />
    </PrivyProvider>
  )
} 