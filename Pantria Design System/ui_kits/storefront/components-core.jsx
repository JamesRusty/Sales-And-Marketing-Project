// Storefront — shared components
// All exposed to window for cross-script use.

const { useState } = React;

// ---------- Icon ----------
function Icon({ name, size = 20, stroke = 2 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>,
    cart: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>,
    home: <><path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    shop: <><path d="M3 7h18l-2 13H5L3 7Z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></>,
    user2: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    chevR: <path d="m9 18 6-6-6-6"/>,
    chevL: <path d="m15 18-6-6 6-6"/>,
    chevD: <path d="m6 9 6 6 6-6"/>,
    truck: <><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></>,
    pkg: <><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></>,
    tag: <><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z"/><path d="M7 7h.01"/></>,
    msg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
    x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    menu: <><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>,
    check: <path d="M20 6 9 17l-5-5"/>,
    pin: <><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96a1 1 0 0 1 1.8.5c0 5.05-1.5 9.86-5.7 12.1A7 7 0 0 1 11 20Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    info: <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>,
    trash: <><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
      {paths[name]}
    </svg>
  );
}

// ---------- Brand ----------
function Logo({ size = 28, dark = false }) {
  return (
    <span style={{
      fontFamily: "'Inter', sans-serif",
      fontWeight: 800,
      fontSize: size,
      letterSpacing: '-0.02em',
      color: dark ? '#fff' : 'var(--color-primary)',
      display: 'inline-flex',
      alignItems: 'baseline',
      lineHeight: 1,
    }}>
      Pantr<span style={{color:'var(--color-accent)'}}>í</span>a
    </span>
  );
}

// ---------- Top nav ----------
function Nav({ screen, setScreen, cartCount, openCart }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '14px 40px',
        display: 'flex', alignItems: 'center', gap: 32,
      }}>
        <a onClick={() => setScreen('home')} style={{cursor:'pointer'}}><Logo size={26}/></a>
        <nav style={{display:'flex', gap: 6, alignItems:'center'}}>
          {[['home','Home'],['shop','Shop'],['wholesale','Wholesale'],['about','About'],['contact','Contact']].map(([k,l]) => (
            <a key={k} onClick={() => setScreen(k)}
               style={{
                 padding:'6px 12px', fontSize: 14, fontWeight: 500,
                 color: screen === k ? 'var(--color-primary)' : 'var(--color-text)',
                 cursor:'pointer', borderRadius: 8,
                 background: screen === k ? 'var(--color-primary-soft)' : 'transparent',
               }}>{l}</a>
          ))}
        </nav>
        <div style={{flex:1, maxWidth: 480, position:'relative'}}>
          <span style={{position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--color-text-muted)'}}><Icon name="search" size={18}/></span>
          <input placeholder="Search rice, oil, canned goods…" style={{
            width:'100%', boxSizing:'border-box',
            padding:'10px 14px 10px 40px', borderRadius: 9999,
            background:'var(--color-surface-2)', border:'1px solid transparent',
            fontSize: 14, fontFamily:'var(--font-sans)',
          }}/>
        </div>
        <div style={{display:'flex', alignItems:'center', gap: 6}}>
          <IconBtn name="heart"/>
          <IconBtn name="user"/>
          <IconBtn name="cart" badge={cartCount} onClick={openCart}/>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ name, badge, onClick }) {
  return (
    <button onClick={onClick} style={{
      position:'relative', width: 40, height: 40, borderRadius: '50%',
      background:'transparent', border:'none', cursor:'pointer',
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      color:'var(--color-text)',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-soft)'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <Icon name={name} size={20}/>
      {badge > 0 && (
        <span style={{
          position:'absolute', top: 4, right: 4,
          minWidth: 18, height: 18, padding:'0 5px',
          borderRadius: 9999, background:'var(--color-accent)',
          color:'var(--color-text)', fontSize: 10, fontWeight: 700,
          display:'inline-flex', alignItems:'center', justifyContent:'center',
        }}>{badge}</span>
      )}
    </button>
  );
}

// ---------- Buttons ----------
function Button({ children, variant = 'primary', size = 'md', onClick, full, icon }) {
  const vmap = {
    primary: { bg: 'var(--color-primary)', color: '#fff', hover: 'var(--color-primary-dark)' },
    secondary: { bg: 'var(--color-primary-soft)', color: 'var(--color-primary-darker)', hover: '#BBF7D0' },
    ghost: { bg: 'transparent', color: 'var(--color-text)', hover: 'var(--color-surface-2)', border: '1px solid var(--color-border)' },
    accent: { bg: 'var(--color-accent)', color: 'var(--color-text)', hover: 'var(--color-accent-dark)' },
  };
  const smap = { sm: '6px 12px / 13px', md: '11px 20px / 15px', lg: '14px 26px / 16px' };
  const v = vmap[variant];
  const [pad, fz] = smap[size].split(' / ');
  return (
    <button onClick={onClick} style={{
      padding: pad, fontSize: fz, fontWeight: 600,
      background: v.bg, color: v.color, border: v.border || 'none',
      borderRadius: 'var(--radius-md)', cursor:'pointer',
      display:'inline-flex', alignItems:'center', justifyContent:'center', gap: 8,
      transition: 'all 150ms var(--ease-out-quart)',
      fontFamily:'var(--font-sans)',
      width: full ? '100%' : 'auto',
    }}
    onMouseEnter={e => e.currentTarget.style.background = v.hover}
    onMouseLeave={e => e.currentTarget.style.background = v.bg}
    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
      {icon && <Icon name={icon} size={16}/>}
      {children}
    </button>
  );
}

Object.assign(window, { Icon, Logo, Nav, IconBtn, Button });
