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

Each entry in `data/causes.js` lists a `qr_image` path (e.g. `/qr/evergreen-fund.png`).
Run `node generate_qrs.js` to create these images whenever you update the causes list.
