import { causes } from '../data/causes';
import { useEffect, useState } from 'react';

export default function Home() {
  const [cause, setCause] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const match = causes.find(c => c.date === today);
    if (match) {
      setCause(match);
    }
  }, []);

  if (!cause) {
    return (
      <main style={{padding: '1rem', fontFamily: 'Arial', textAlign: 'center'}}>
        <h1>Cause coming soon</h1>
        <p>Please check back later.</p>
      </main>
    );
  }

  const slug = cause.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const qrPath = `/qr/${slug}.png`

  return (
    <main style={{maxWidth: '600px', margin: 'auto', padding: '1rem', fontFamily: 'Arial', textAlign: 'center'}}>
      <h1>{cause.name}</h1>
      <p>{cause.description}</p>
      <img src={qrPath} alt={`QR for ${cause.name}`} style={{width: '200px', height: '200px'}} />
      <div style={{marginTop: '1rem'}}>
        <a href={cause.external_link} target="_blank" rel="noopener noreferrer" style={{backgroundColor: '#0070f3', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none'}}>
          Donate via Endaoment
        </a>
      </div>
    </main>
  );
}
