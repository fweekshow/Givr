import '../styles/globals.css'
import { PrivyProvider } from '@privy-io/react-auth'
import Navbar from '../components/Navbar';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <PrivyProvider appId="cmci3tfzs009kla0mw08lkuky">
      <Head>
        <title>G1VR – Scan to Support</title>
        <meta name="description" content="G1VR lets you support a new nonprofit every day by scanning a QR code. Simple, secure, and impactful giving." />
        <meta property="og:title" content="G1VR – Scan to Support" />
        <meta property="og:site_name" content="G1VR" />
        <meta property="og:description" content="G1VR lets you support a new nonprofit every day by scanning a QR code. Simple, secure, and impactful giving." />
        <meta property="og:url" content="https://g1vr.vercel.app" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="G1VR – Scan to Support" />
        <meta name="twitter:description" content="G1VR lets you support a new nonprofit every day by scanning a QR code. Simple, secure, and impactful giving." />
        <meta name="twitter:image" content="/logo.png" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </PrivyProvider>
  )
} 