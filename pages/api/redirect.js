const { causes } = require('../../data/causes');

function handler(req, res) {
  try {
    // Get current date in Pacific Time
    const pacific = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles"
    });
    const today = new Date(pacific).toISOString().split('T')[0];

    const cause = causes.find(c => c.date === today);

    const redirectUrl = cause?.external_link || 'https://www.evergreenfund.life';
    console.log(`Redirecting to: ${redirectUrl}`);

    // Use writeHead and end for proper Vercel behavior
    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } catch (error) {
    console.error('API redirect error:', error);
    res.writeHead(302, { Location: 'https://www.evergreenfund.life' });
    res.end();
  }
}

export default handler; 