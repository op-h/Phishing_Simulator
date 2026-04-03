import Link from 'next/link';

const Icons = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
  ),
  Operations: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
  ),
  Payloads: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
  ),
  Intelligence: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
  )
};

export default function Sidebar() {
  return (
    <div className="sidebar shadow-2xl" style={{ position: 'relative', zIndex: 1100 }}>
      <div style={{ padding: '30px', borderBottom: '1px solid var(--border-light)' }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--accent-neon)', letterSpacing: '2px', fontWeight: '900' }}>
          SOC COMMAND
        </h2>
        <p style={{ fontSize: '0.6rem', color: 'var(--text-main)', margin: '5px 0 0', textTransform: 'uppercase', opacity: 0.7 }}>
          Simulation & Operations
        </p>
      </div>

      <nav className="sidebar-nav" style={{ marginTop: '20px' }}>
        <Link href="/" className="sidebar-nav-item">
          <span style={{ marginRight: '15px', color: 'var(--accent-neon)' }}><Icons.Dashboard /></span> 
          <span>Dashboard</span>
        </Link>
        <Link href="/campaigns" className="sidebar-nav-item">
          <span style={{ marginRight: '15px', color: 'var(--accent-neon)' }}><Icons.Operations /></span> 
          <span>Operations</span>
        </Link>
        <Link href="/templates" className="sidebar-nav-item">
          <span style={{ marginRight: '15px', color: 'var(--accent-neon)' }}><Icons.Payloads /></span> 
          <span>Payloads</span>
        </Link>
        <Link href="/analytics" className="sidebar-nav-item">
          <span style={{ marginRight: '15px', color: 'var(--accent-neon)' }}><Icons.Intelligence /></span> 
          <span>Intelligence</span>
        </Link>
      </nav>

      <div style={{ marginTop: 'auto', padding: '30px', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ fontSize: '0.6rem', color: 'var(--accent-neon)', marginBottom: '15px', letterSpacing: '1px', opacity: 0.8, lineHeight: '1.4' }}>
          CREATED & DESIGNED BY OPH<br/>
          MOTION EFFECT & PAYLOAD BY KAWTHER<br/>
          INTERACTIVE VISION BY SAIF
        </div>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '1px' }}>
          v1.0.6-STABLE | SYSTEM SECURED
        </div>
      </div>
    </div>
  );
}
