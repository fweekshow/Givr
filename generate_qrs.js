import { promises as fs } from 'fs';
import path from 'path';
import QRCode from 'qrcode';

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error('Error creating directory', err);
  }
}

async function generate() {
  const outDir = path.join(process.cwd(), 'public', 'qr');
  await ensureDir(outDir);

  // Generate a single static QR code that points to our redirect endpoint
  // Use the actual deployed URL
  const baseUrl = 'https://g1vr.vercel.app';
  const redirectUrl = `${baseUrl}/api/redirect`;
  
  const fileName = 'daily-cause.png';
  const outPath = path.join(outDir, fileName);
  
  try {
    await QRCode.toFile(outPath, redirectUrl);
    console.log(`Generated static QR code: ${outPath}`);
    console.log(`QR code points to: ${redirectUrl}`);
  } catch (err) {
    console.error('Failed to generate static QR code', err);
  }
}

generate();
