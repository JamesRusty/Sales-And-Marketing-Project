// Storefront — product card, grid, hero, categories, etc.
const { useState: useState2 } = React;

const PRODUCTS = [
  { id: 'r25', cat: 'Rice', name: 'Premium jasmine rice, 25 kg sack', price: 1275, was: 1500, sale: true, emoji: '🍚', tone: '#FAF8EC' },
  { id: 'oil1', cat: 'Cooking oil', name: 'Extra-virgin olive oil, 1 L', price: 459, emoji: '🫒', tone: '#F0F4E8' },
  { id: 'sard', cat: 'Canned goods', name: 'Sardines in tomato sauce, case of 24', price: 720, bulk: true, emoji: '🥫', tone: '#FFEDE7' },
  { id: 'milk', cat: 'Beverages', name: 'Fresh whole milk, 1 L', price: 89, emoji: '🥛', tone: '#F1F5F9' },
  { id: 'soap', cat: 'Toiletries', name: 'Bath soap variety pack, 12 pcs', price: 360, emoji: '🧼', tone: '#F0F0FA' },
  { id: 'fish', cat: 'Frozen', name: 'Frozen tilapia fillet, 1 kg', price: 240, low: true, emoji: '🐟', tone: '#E8F1F8' },
  { id: 'eggs', cat: 'Daily essentials', name: 'Farm fresh eggs, tray of 30', price: 280, emoji: '🥚', tone: '#FAF6E8' },
  { id: 'sugar', cat: 'Daily essentials', name: 'White sugar, 1 kg', price: 78, emoji: '🍬', tone: '#F8F4F0' },
];

function ProductCard({ p, onAdd, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)', overflow:'hidden', cursor:'pointer',
      transition: 'all 150ms var(--ease-out-quart)', position:'relative',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='var(--shadow-md)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-sm)'; }}>
      {p.sale && <span style={badgeStyle('var(--color-accent)','var(--color-text)')}>Sale</span>}
      {p.bulk && <span style={badgeStyle('var(--color-info-soft)','var(--color-info)')}>Bulk</span>}
      {p.low && <span style={badgeStyle('var(--color-danger-soft)','var(--color-danger)')}>Low stock</span>}
      <div style={{aspectRatio:'1', background:`linear-gradient(135deg, ${p.tone}, #fff)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize: 64}}>
        <span>{p.emoji}</span>
      </div>
      <div style={{padding: 14}}>
        <div style={{fontSize: 11, fontWeight: 600, color:'var(--color-text-muted)', letterSpacing:'0.04em', textTransform:'uppercase'}}>{p.cat}</div>
        <div style={{fontSize: 14, fontWeight: 600, lineHeight: 1.3, margin:'4px 0 10px', color:'var(--color-text)', display:'-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient:'vertical', overflow:'hidden', minHeight: 36}}>{p.name}</div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <span style={{fontSize: 16, fontWeight: 700, fontVariantNumeric:'tabular-nums', color: p.sale ? 'var(--color-accent-dark)':'var(--color-text)'}}>₱{p.price.toLocaleString()}</span>
            {p.was && <span style={{color:'var(--color-text-subtle)', textDecoration:'line-through', fontSize: 12, marginLeft: 6, fontVariantNumeric:'tabular-nums'}}>₱{p.was.toLocaleString()}</span>}
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAdd && onAdd(p); }} style={{
            width: 34, height: 34, borderRadius:'50%', background:'var(--color-primary)', color:'#fff', border:'none', cursor:'pointer',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
          }} aria-label="Add"><Icon name="plus" size={16} stroke={2.5}/></button>
        </div>
      </div>
    </div>
  );
}

function badgeStyle(bg, color) {
  return {
    position:'absolute', top: 10, left: 10, zIndex: 2,
    padding:'4px 10px', borderRadius: 9999,
    fontSize: 10, fontWeight: 700, letterSpacing:'0.04em', textTransform:'uppercase',
    background: bg, color,
  };
}

function ProductGrid({ products, onAdd, onClick, cols = 4 }) {
  return (
    <div style={{display:'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16}}>
      {products.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} onClick={() => onClick && onClick(p)}/>)}
    </div>
  );
}

function Hero() {
  return (
    <div style={{
      borderRadius:'var(--radius-xl)',
      background:'var(--color-primary-tint)',
      padding:'56px 48px', display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 32, alignItems:'center', overflow:'hidden', position:'relative',
    }}>
      <div>
        <div style={{display:'inline-flex', alignItems:'center', gap: 8, padding:'6px 12px', background:'var(--color-accent-soft)', borderRadius: 9999, fontSize: 12, fontWeight: 700, color:'var(--color-accent-dark)', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom: 20}}>
          <Icon name="tag" size={14}/> Promo this week
        </div>
        <h1 style={{fontFamily:'var(--font-display)', fontSize: 60, fontWeight: 700, letterSpacing:'-0.02em', lineHeight: 1.02, margin:'0 0 16px', color:'var(--color-text)'}}>Buy 5 sacks of rice,<br/>save ₱200.</h1>
        <p style={{fontSize: 17, color:'var(--color-text-muted)', margin:'0 0 28px', maxWidth: 460, lineHeight: 1.5}}>Restocks every Monday and Thursday. Free delivery within Metro Manila on orders over ₱2,000.</p>
        <div style={{display:'flex', gap: 12}}>
          <Button size="lg">Shop rice</Button>
          <Button variant="ghost" size="lg" icon="truck">Check delivery area</Button>
        </div>
      </div>
      <div style={{
        aspectRatio:'1', borderRadius:'var(--radius-xl)',
        background:'linear-gradient(135deg, #FAF8EC, #ECF8E5)',
        display:'flex', alignItems:'center', justifyContent:'center', fontSize: 200,
        boxShadow:'var(--shadow-md)',
      }}>🍚</div>
    </div>
  );
}

const CATS = [
  { name: 'Rice', icon: 'cat-rice' },
  { name: 'Cooking oil', icon: 'cat-oil' },
  { name: 'Canned', icon: 'cat-canned' },
  { name: 'Beverages', icon: 'cat-beverages' },
  { name: 'Toiletries', icon: 'cat-toiletries' },
  { name: 'Frozen', icon: 'cat-frozen' },
  { name: 'Essentials', icon: 'cat-essentials' },
];

function CategoryTiles() {
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap: 12}}>
      {CATS.map(c => (
        <a key={c.name} style={{
          display:'flex', flexDirection:'column', alignItems:'center', gap: 12,
          padding:'20px 12px', borderRadius:'var(--radius-lg)',
          background:'var(--color-surface)', border:'1px solid var(--color-border)',
          cursor:'pointer', transition:'all 150ms var(--ease-out-quart)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='var(--color-primary-soft)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.borderColor='var(--color-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.background='var(--color-surface)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='var(--color-border)'; }}>
          <img src={`../../assets/${c.icon}.svg`} width="44" height="44"/>
          <span style={{fontSize: 13, fontWeight: 600, color:'var(--color-text)'}}>{c.name}</span>
        </a>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 16, marginBottom: 20}}>
      <div style={{flex: 1, minWidth: 0}}>
        {eyebrow && <div style={{fontSize: 12, fontWeight: 700, color:'var(--color-text-muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom: 6}}>{eyebrow}</div>}
        <h2 style={{fontFamily:'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing:'-0.01em', margin: 0, whiteSpace:'nowrap'}}>{title}</h2>
      </div>
      {action && <a style={{color:'var(--color-primary)', fontWeight: 600, fontSize: 14, cursor:'pointer'}}>{action} →</a>}
    </div>
  );
}

function Testimonials() {
  const t = [
    { quote: "Reliable restocks every week — my sari-sari shelves stay full.", who: "Aling Mhel", role: "Sari-sari owner, Pasig" },
    { quote: "Bulk rice pricing saves me about ₱4,000 a month for the restaurant.", who: "Chef Carlo", role: "Restaurant, Quezon City" },
    { quote: "The delivery checker is honest. They told me they don't deliver to my barangay yet — I appreciated that.", who: "Maria L.", role: "Household, Bulacan" },
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16}}>
      {t.map((x,i) => (
        <div key={i} style={{padding: 24, background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)'}}>
          <div style={{color:'var(--color-accent)', display:'flex', gap: 2, marginBottom: 12}}>
            {[0,1,2,3,4].map(s => <Icon key={s} name="star" size={16}/>)}
          </div>
          <p style={{margin:'0 0 16px', fontSize: 15, lineHeight: 1.5, color:'var(--color-text)'}}>"{x.quote}"</p>
          <div style={{fontSize: 13, fontWeight: 600}}>{x.who}</div>
          <div style={{fontSize: 12, color:'var(--color-text-muted)'}}>{x.role}</div>
        </div>
      ))}
    </div>
  );
}

function DeliveryStrip() {
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 24,
      padding: 28, background:'var(--color-surface)', borderRadius:'var(--radius-lg)', border:'1px solid var(--color-border)',
    }}>
      {[
        { i:'truck', t:'Free delivery', s:'On orders over ₱2,000 within Metro Manila' },
        { i:'pkg',   t:'Restocked weekly', s:'New shipments every Monday and Thursday' },
        { i:'leaf',  t:'Wholesale pricing', s:'Apply once, save on every order' },
      ].map((x,i) => (
        <div key={i} style={{display:'flex', gap: 14, alignItems:'flex-start'}}>
          <div style={{width: 40, height: 40, borderRadius: 10, background:'var(--color-primary-soft)', color:'var(--color-primary)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
            <Icon name={x.i} size={20}/>
          </div>
          <div>
            <div style={{fontSize: 15, fontWeight: 700}}>{x.t}</div>
            <div style={{fontSize: 13, color:'var(--color-text-muted)', marginTop: 2}}>{x.s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{borderTop:'1px solid var(--color-border)', padding:'48px 40px 32px', background:'var(--color-surface)'}}>
      <div style={{maxWidth: 1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap: 48}}>
        <div>
          <Logo size={26}/>
          <p style={{margin:'14px 0', fontSize: 14, color:'var(--color-text-muted)', maxWidth: 280, lineHeight: 1.5}}>Modern grocery for households, sari-sari stores, restaurants, and resellers.</p>
        </div>
        {[
          ['Shop', ['All products','Rice','Cooking oil','Canned goods','Toiletries']],
          ['Wholesale', ['Reseller signup','Bulk pricing','Restaurant supply','Contact sales']],
          ['Help', ['Delivery areas','Order tracking','Returns','Contact us']],
        ].map(([t,l]) => (
          <div key={t}>
            <div style={{fontSize: 13, fontWeight: 700, marginBottom: 14}}>{t}</div>
            {l.map(x => <div key={x} style={{fontSize: 13, color:'var(--color-text-muted)', padding:'5px 0', cursor:'pointer'}}>{x}</div>)}
          </div>
        ))}
      </div>
      <div style={{maxWidth: 1280, margin:'32px auto 0', paddingTop: 24, borderTop:'1px solid var(--color-border)', fontSize: 12, color:'var(--color-text-subtle)', display:'flex', justifyContent:'space-between'}}>
        <div>© 2026 Pantria. All rights reserved.</div>
        <div>Privacy · Terms</div>
      </div>
    </footer>
  );
}

function MessengerFab() {
  return (
    <button style={{
      position:'fixed', bottom: 24, right: 24, zIndex: 50,
      width: 56, height: 56, borderRadius:'50%',
      background:'var(--color-primary)', color:'#fff', border:'none', cursor:'pointer',
      boxShadow:'var(--shadow-md)',
      display:'inline-flex', alignItems:'center', justifyContent:'center',
    }} aria-label="Chat with us">
      <Icon name="msg" size={24}/>
    </button>
  );
}

Object.assign(window, { PRODUCTS, ProductCard, ProductGrid, Hero, CategoryTiles, SectionHeading, Testimonials, DeliveryStrip, Footer, MessengerFab });
