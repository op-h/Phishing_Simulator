import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="main-content">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Phishing & Smishing Templates</h1>
        <Link href="/templates/builder" className="button-neon">
          + New Template
        </Link>
      </header>

      <div className="grid-cards">
        {templates.map((template) => (
          <div key={template.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--accent-neon)' }}>{template.name}</h3>
              <span style={{ 
                background: 'rgba(102, 252, 241, 0.1)', 
                color: 'var(--text-bright)', 
                padding: '4px 8px', 
                borderRadius: '4px',
                fontSize: '0.8rem',
                border: '1px solid var(--border-light)'
              }}>
                EMAIL PHISHING
              </span>
            </div>
            
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {template.messageBody || 'No default message body.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-main)' }}>Difficulty:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3].map((level) => (
                  <div 
                    key={level} 
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%',
                      background: level <= template.difficulty ? 'var(--error-neon)' : 'rgba(255, 0, 60, 0.2)',
                      boxShadow: level <= template.difficulty ? '0 0 5px var(--error-neon)' : 'none'
                    }} 
                  />
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
              <Link href={`/sim/preview/${template.id}`} target="_blank" className="button-neon" style={{ flex: 1, padding: '8px' }}>
                Preview Live
              </Link>
            </div>
          </div>
        ))}
        {templates.length === 0 && (
          <div className="glass-panel" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>No templates found.</p>
            <p style={{ color: 'var(--text-main)' }}>Run the seed script or create a new template.</p>
          </div>
        )}
      </div>
    </div>
  );
}
