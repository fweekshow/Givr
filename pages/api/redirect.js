import { causes } from '../../data/causes';

export default function handler(req, res) {
  // Get current date in Pacific Time
  const pacific = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const today = new Date(pacific).toISOString().split('T')[0];
  
  // Find the cause for today
  const cause = causes.find(c => c.date === today);
  
  if (cause) {
    // Redirect to the cause's external link
    res.redirect(302, cause.external_link);
  } else {
    // If no cause is found for today, redirect to a fallback page
    // You could redirect to your main site or a "no cause today" page
    res.redirect(302, 'https://www.evergreenfund.life');
  }
} 