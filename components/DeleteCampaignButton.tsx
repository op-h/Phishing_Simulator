'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteCampaignButton({ campaignId }: { campaignId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('☢️ TERMINATE MISSION: This will permanently delete the campaign and all associated data. Are you sure?')) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/delete`, { method: 'POST' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete campaign.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="button-neon button-danger"
      style={{ 
        padding: '8px 15px', 
        fontSize: '0.7rem',
        opacity: loading ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      {loading ? 'TERMINATING...' : 'TERMINATE'}
    </button>
  );
}
