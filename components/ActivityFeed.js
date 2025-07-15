import { useEffect, useState } from 'react';

export default function ActivityFeed({ ein }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ein) return;
    setLoading(true);
    setError(null);
    fetch(`/api/activity?orgId=${ein}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch activity');
        return res.json();
      })
      .then(data => {
        console.log('Raw activity data:', data);
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [ein]);

  if (!ein) return <div>No EIN provided.</div>;
  if (loading) return <div>Loading activity...</div>;
  if (error) return <div>Error: {error}</div>;

  // Only show the 10 most recent donations or grants
  const filteredActivities = activities.filter(a => a.type === 'donation' || a.type === 'grant').slice(0, 10);

  return (
    <div>
      <h2 className="font-bold mb-2">Recent Activity</h2>
      <ul>
        {filteredActivities.length === 0 && <li>No recent activity found.</li>}
        {filteredActivities.map((activity, index) => {
          const amount = activity.usdcAmount || '0';
          const formattedAmount = (parseInt(amount, 10) / 1e6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const senderAddress = activity.actualSender || activity.transactor;
          const shortenAddress = (address) => address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Unknown';
          
          console.log('Activity:', activity.type, 'Sender:', senderAddress, 'Actual:', activity.actualSender);
          
          return (
            <li key={activity.id || `activity-${index}`} className="mb-2">
              <span className="font-semibold capitalize">{activity.type}</span>
              : <span className="text-green-400">${formattedAmount} USDC</span>
              {activity.to?.name && <> to <span className="font-semibold">{activity.to.name}</span></>}
              <br />
              <span className="text-xs text-gray-400">
                {new Date(activity.occurredAtUtc).toLocaleString()} by {shortenAddress(senderAddress)}
                {activity.actualSender && (
                  <a 
                    href={`https://basescan.org/address/${activity.actualSender}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 ml-1"
                  >
                    (View)
                  </a>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 