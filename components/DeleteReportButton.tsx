'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteReportButton({ campaignId }: { campaignId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the report detail page
    e.stopPropagation();

    if (!confirm('🚨 Confirm Mission Deletion: Are you sure you want to PURGE this specific intelligence report? Active data for this mission will be lost.')) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/delete/${campaignId}`, { method: 'POST' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to purge report.');
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
        padding: '8px', 
        minWidth: '40px', 
        marginLeft: '20px',
        opacity: loading ? 0.5 : 1
      }}
      title="Purge Report"
    >
      {loading ? '...' : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      )}
    </button>
  );
}
