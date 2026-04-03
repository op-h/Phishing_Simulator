'use client';

import React, { useState } from 'react';

export default function DispatchButton({ campaignId }: { campaignId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDispatch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/dispatch`, { method: 'POST' });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Dispatch failed');
      }

      if (data.errors && data.errors.length > 0) {
        // Partial failure (some emails failed)
        const errorMsgs = data.errors.map((e: any) => `${e.email}: ${e.error}`).join(', ');
        throw new Error(`Partial failure: ${errorMsgs}`);
      }

      window.location.reload();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
      <button 
        className="button-neon"
        onClick={handleDispatch}
        disabled={loading}
        style={{ background: 'var(--bg-base)' }}
      >
        {loading ? 'DISPATCHING...' : '\u25B6 DISPATCH'}
      </button>
      {error && (
        <span style={{ color: 'var(--error-neon)', fontSize: '0.7rem', maxWidth: '200px', textAlign: 'right' }}>
          {error}
        </span>
      )}
    </div>
  );
}
