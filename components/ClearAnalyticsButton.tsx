'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClearAnalyticsButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClear = async () => {
    if (!confirm('☢️ CRITICAL ACTION: Are you sure you want to PURGE all simulation intelligence data? This will reset all active missions to DRAFT status and delete all exposure logs.')) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/analytics/clear', { method: 'POST' });
      if (res.ok) {
        alert('Simulation Data Purged Successfully.');
        router.refresh(); // Refresh server component data
      } else {
        alert('Failed to clear data.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to command center.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleClear} 
      disabled={loading}
      className="button-neon button-danger"
      style={{ fontSize: '0.8rem' }}
    >
      {loading ? 'PURGING...' : '☢️ PURGE ALL DATA'}
    </button>
  );
}
