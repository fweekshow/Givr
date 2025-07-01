export default async function handler(req, res) {
  const { orgId } = req.query;
  if (!orgId) {
    return res.status(400).json({ error: 'Missing orgId parameter' });
  }
  try {
    // 1. Search for the org by EIN to get the UUID
    const searchUrl = `https://api.endaoment.org/v2/orgs/search?searchTerm=${orgId}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!Array.isArray(searchData) || searchData.length === 0) {
      return res.status(404).json({ error: 'Organization not found for given EIN' });
    }

    const uuid = searchData[0].id;

    // 2. Fetch the activity feed by UUID
    const activityRes = await fetch(`https://api.endaoment.org/v1/activity/org/${uuid}`);
    const activityText = await activityRes.text();
    if (!activityRes.ok) {
      return res.status(activityRes.status).json({ error: 'Failed to fetch activity from Endaoment', details: activityText });
    }
    const activityData = JSON.parse(activityText);
    res.status(200).json(activityData);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
} 