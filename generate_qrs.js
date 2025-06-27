import { promises as fs } from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import { causes } from './data/causes.js';

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

  for (const cause of causes) {
    const fileName = path.basename(cause.qr_image);
    const outPath = path.join(outDir, fileName);
    try {
      await QRCode.toFile(outPath, cause.external_link);
      console.log(`Generated ${outPath}`);
    } catch (err) {
      console.error(`Failed to generate QR for ${cause.name}`, err);
    }
  }
}

generate();
