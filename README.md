# Scan-to-Support

A simple Next.js app that displays a daily rotating nonprofit pulled from a local data file.

## Development

1. Install dependencies (requires internet access):

```bash
npm install
```

2. Generate QR codes whenever `data/causes.js` changes:

```bash
node generate_qrs.js
```

3. Run the development server:

```bash
npm run dev
```

The app shows the cause that matches today's date or a placeholder message if none is found.

QR images are stored in `/public/qr/` and named after each nonprofit using a slug of its name (e.g. `evergreen-fund.png`).
