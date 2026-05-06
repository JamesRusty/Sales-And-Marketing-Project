// Storefront — screens (home, shop, PDP, cart drawer, checkout, order tracking)
const { useState: useStateS } = React;

function HomeScreen({ setScreen, addToCart, openProduct }) {
  const featured = PRODUCTS.slice(0, 4);
  const best = PRODUCTS.slice(2, 6);
  return (
    <div style={{maxWidth: 1280, margin:'0 auto', padding:'24px 40px 48px', display:'flex', flexDirection:'column', gap: 56}}>
      <Hero/>
      <div>
        <SectionHeading eyebrow="Browse" title="Shop by category" action="See all"/>
        <CategoryTiles/>
      </div>
      <div>
        <SectionHeading eyebrow="Featured" title="Featured this week" action="See all"/>
        <ProductGrid products={featured} onAdd={addToCart} onClick={openProduct} cols={4}/>
      </div>
      <div style={{
        padding:'28px 32px', borderRadius:'var(--radius-lg)',
        background:'var(--color-accent-soft)',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap: 24,
      }}>
        <div style={{display:'flex', alignItems:'center', gap: 16}}>
          <div style={{width: 48, height: 48, borderRadius: 12, background:'var(--color-accent)', color:'var(--color-text)', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon name="tag" size={22}/>
          </div>
          <div>
            <div style={{fontSize: 17, fontWeight: 700}}>Buying for a store?</div>
            <div style={{fontSize: 14, color:'var(--color-text)', opacity: 0.8}}>Apply for reseller pricing — tier discounts on every order.</div>
          </div>
        </div>
        <Button variant="accent" size="lg">Apply for wholesale</Button>
      </div>
      <div>
        <SectionHeading eyebrow="Best sellers" title="What others are buying" action="See all"/>
        <ProductGrid products={best} onAdd={addToCart} onClick={openProduct} cols={4}/>
      </div>
      <DeliveryStrip/>
      <div>
        <SectionHeading title="Trusted by households and stores" eyebrow="Reviews"/>
        <Testimonials/>
      </div>
    </div>
  );
}

function ShopScreen({ addToCart, openProduct }) {
  const [filter, setFilter] = useStateS('All');
  const cats = ['All', ...new Set(PRODUCTS.map(p => p.cat))];
  const visible = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  return (
    <div style={{maxWidth: 1280, margin:'0 auto', padding:'24px 40px 48px'}}>
      <h1 style={{fontFamily:'var(--font-display)', fontSize: 38, fontWeight: 700, letterSpacing:'-0.01em', margin:'0 0 8px'}}>Shop</h1>
      <p style={{color:'var(--color-text-muted)', margin:'0 0 24px'}}>{visible.length} products · Restocks Mondays and Thursdays</p>
      <div style={{display:'flex', gap: 8, marginBottom: 28, flexWrap:'wrap'}}>
        {cats.map(c => (
          <span key={c} onClick={() => setFilter(c)} style={{
            padding:'7px 14px', borderRadius: 9999, fontSize: 13, fontWeight: 500, cursor:'pointer',
            background: filter === c ? 'var(--color-primary-soft)' : 'var(--color-surface)',
            color: filter === c ? 'var(--color-primary-darker)' : 'var(--color-text)',
            border: `1px solid ${filter === c ? 'var(--color-primary)' : 'var(--color-border)'}`,
          }}>{c}</span>
        ))}
      </div>
      <ProductGrid products={visible} onAdd={addToCart} onClick={openProduct} cols={4}/>
    </div>
  );
}

function ProductScreen({ product, addToCart, setScreen }) {
  const [qty, setQty] = useStateS(1);
  if (!product) return null;
  return (
    <div style={{maxWidth: 1280, margin:'0 auto', padding:'24px 40px 48px'}}>
      <div style={{fontSize: 13, color:'var(--color-text-muted)', marginBottom: 20}}>
        <a onClick={() => setScreen('shop')} style={{cursor:'pointer'}}>Shop</a> · <span>{product.cat}</span> · <span style={{color:'var(--color-text)'}}>{product.name}</span>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 48}}>
        <div style={{
          aspectRatio:'1', background:`linear-gradient(135deg, ${product.tone}, #fff)`,
          borderRadius:'var(--radius-xl)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 220,
          boxShadow:'var(--shadow-sm)',
        }}>{product.emoji}</div>
        <div>
          <div style={{fontSize: 12, fontWeight: 700, color:'var(--color-text-muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom: 8}}>{product.cat}</div>
          <h1 style={{fontFamily:'var(--font-display)', fontSize: 34, fontWeight: 700, letterSpacing:'-0.01em', margin:'0 0 12px', lineHeight: 1.15}}>{product.name}</h1>
          <div style={{color:'var(--color-accent)', display:'flex', gap: 2, marginBottom: 16, alignItems:'center'}}>
            {[0,1,2,3,4].map(s => <Icon key={s} name="star" size={16}/>)}
            <span style={{fontSize: 13, color:'var(--color-text-muted)', marginLeft: 8}}>4.8 · 124 reviews</span>
          </div>
          <div style={{display:'flex', alignItems:'baseline', gap: 12, marginBottom: 24}}>
            <span style={{fontSize: 36, fontWeight: 700, color: product.sale ? 'var(--color-accent-dark)' : 'var(--color-text)', fontVariantNumeric:'tabular-nums'}}>₱{product.price.toLocaleString()}</span>
            {product.was && <span style={{color:'var(--color-text-subtle)', textDecoration:'line-through', fontSize: 18, fontVariantNumeric:'tabular-nums'}}>₱{product.was.toLocaleString()}</span>}
            {product.sale && <span style={{padding:'4px 10px', borderRadius: 9999, background:'var(--color-accent)', color:'var(--color-text)', fontSize: 11, fontWeight: 700, letterSpacing:'0.04em', textTransform:'uppercase'}}>Save ₱{(product.was-product.price).toLocaleString()}</span>}
          </div>
          <div style={{padding: 16, background:'var(--color-info-soft)', borderRadius: 10, fontSize: 13, color:'var(--color-info)', display:'flex', gap: 10, alignItems:'flex-start', marginBottom: 24}}>
            <Icon name="info" size={18}/>
            <div><b>Bulk pricing available.</b> Buying 10 or more? Get reseller pricing — apply once, save on every order.</div>
          </div>
          <div style={{display:'flex', gap: 12, alignItems:'center', marginBottom: 20}}>
            <div style={{display:'inline-flex', alignItems:'center', border:'1px solid var(--color-border)', borderRadius: 9999, overflow:'hidden'}}>
              <button onClick={() => setQty(q => Math.max(1, q-1))} style={{width: 40, height: 40, background:'transparent', border:'none', cursor:'pointer', fontSize: 18}}>−</button>
              <span style={{padding:'0 16px', fontWeight: 600, fontVariantNumeric:'tabular-nums'}}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{width: 40, height: 40, background:'transparent', border:'none', cursor:'pointer', fontSize: 18}}>+</button>
            </div>
            <Button size="lg" icon="cart" onClick={() => addToCart(product, qty)}>Add to cart · ₱{(product.price * qty).toLocaleString()}</Button>
          </div>
          <div style={{padding: 16, border:'1px solid var(--color-border)', borderRadius: 10, fontSize: 14, lineHeight: 1.6}}>
            <div style={{display:'flex', gap: 10, marginBottom: 8}}><Icon name="truck" size={18}/><b>Free delivery within Metro Manila on orders over ₱2,000.</b></div>
            <div style={{display:'flex', gap: 10, color:'var(--color-text-muted)'}}><Icon name="pkg" size={18}/>Restocks every Monday and Thursday.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, cart, removeItem, setScreen }) {
  const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 2000 ? 0 : 99;
  return (
    <div style={{position:'fixed', inset: 0, zIndex: 100, pointerEvents: open ? 'auto':'none'}}>
      <div onClick={onClose} style={{position:'absolute', inset: 0, background:'rgba(17,24,39,0.5)', opacity: open ? 1 : 0, transition:'opacity 200ms'}}/>
      <div style={{
        position:'absolute', top: 0, right: 0, bottom: 0, width: 440, maxWidth:'100vw',
        background:'var(--color-surface)', boxShadow:'var(--shadow-lg)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition:'transform 250ms var(--ease-out-quart)',
        display:'flex', flexDirection:'column',
      }}>
        <div style={{padding:'20px 24px', borderBottom:'1px solid var(--color-border)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3 style={{margin: 0, fontSize: 18, fontWeight: 700}}>Your cart ({cart.length})</h3>
          <button onClick={onClose} style={{background:'transparent', border:'none', cursor:'pointer', padding: 8}}><Icon name="x" size={20}/></button>
        </div>
        <div style={{flex: 1, overflow:'auto', padding: 16}}>
          {cart.length === 0 ? (
            <div style={{padding: 48, textAlign:'center', color:'var(--color-text-muted)'}}>
              <div style={{fontSize: 48, marginBottom: 16}}>🛒</div>
              <div style={{fontSize: 15, fontWeight: 600, color:'var(--color-text)'}}>Your cart is empty</div>
              <div style={{fontSize: 13, marginTop: 6}}>Browse rice, oil, and pantry staples to get started.</div>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{display:'flex', gap: 12, padding:'12px 0', borderBottom:'1px solid var(--color-border)'}}>
              <div style={{width: 64, height: 64, borderRadius: 10, background:`linear-gradient(135deg, ${item.tone}, #fff)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize: 32, flexShrink: 0}}>{item.emoji}</div>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 2}}>{item.name}</div>
                <div style={{fontSize: 12, color:'var(--color-text-muted)', marginBottom: 6}}>Qty {item.qty}</div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontSize: 14, fontWeight: 700, fontVariantNumeric:'tabular-nums'}}>₱{(item.price * item.qty).toLocaleString()}</span>
                  <button onClick={() => removeItem(item.id)} style={{background:'transparent', border:'none', color:'var(--color-text-muted)', cursor:'pointer', padding: 4}}><Icon name="trash" size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{padding: 20, borderTop:'1px solid var(--color-border)'}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize: 13, marginBottom: 6}}><span style={{color:'var(--color-text-muted)'}}>Subtotal</span><span style={{fontVariantNumeric:'tabular-nums'}}>₱{subtotal.toLocaleString()}</span></div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize: 13, marginBottom: 12}}><span style={{color:'var(--color-text-muted)'}}>Shipping</span><span style={{fontVariantNumeric:'tabular-nums', color: shipping===0 ? 'var(--color-success)' : 'inherit'}}>{shipping === 0 ? 'Free' : '₱'+shipping}</span></div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize: 16, fontWeight: 700, marginBottom: 16, paddingTop: 12, borderTop:'1px solid var(--color-border)'}}><span>Total</span><span style={{fontVariantNumeric:'tabular-nums'}}>₱{(subtotal+shipping).toLocaleString()}</span></div>
            <Button full size="lg" onClick={() => { onClose(); setScreen('checkout'); }}>Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutScreen({ cart, setScreen }) {
  const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 2000 ? 0 : 99;
  return (
    <div style={{maxWidth: 1100, margin:'0 auto', padding:'24px 40px 48px'}}>
      <h1 style={{fontFamily:'var(--font-display)', fontSize: 34, fontWeight: 700, letterSpacing:'-0.01em', margin:'0 0 24px'}}>Checkout</h1>
      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 32}}>
        <div style={{display:'flex', flexDirection:'column', gap: 20}}>
          <Section title="Contact">
            <Field label="Email" placeholder="you@example.com"/>
            <Field label="Mobile" placeholder="0917 …"/>
          </Section>
          <Section title="Delivery address">
            <Field label="Full name" placeholder="Maria Lopez"/>
            <Field label="Street and unit" placeholder="123 Mabini St., Unit 4B"/>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
              <Field label="Barangay" placeholder="Brgy. Poblacion"/>
              <Field label="City" placeholder="Makati"/>
            </div>
          </Section>
          <Section title="Payment">
            <div style={{display:'flex', flexDirection:'column', gap: 8}}>
              {['Cash on delivery','GCash','Bank transfer','Credit card'].map((m,i) => (
                <label key={m} style={{display:'flex', alignItems:'center', gap: 12, padding:'12px 14px', border:'1px solid var(--color-border)', borderRadius: 10, cursor:'pointer', background: i===0 ? 'var(--color-primary-soft)' : 'transparent', borderColor: i===0 ? 'var(--color-primary)' : 'var(--color-border)'}}>
                  <input type="radio" name="pay" defaultChecked={i===0}/>
                  <span style={{fontSize: 14, fontWeight: 500}}>{m}</span>
                </label>
              ))}
            </div>
          </Section>
        </div>
        <div>
          <div style={{padding: 24, background:'var(--color-surface)', borderRadius:'var(--radius-lg)', border:'1px solid var(--color-border)', position:'sticky', top: 88}}>
            <h3 style={{margin:'0 0 16px', fontSize: 16, fontWeight: 700}}>Order summary</h3>
            {cart.map(i => (
              <div key={i.id} style={{display:'flex', justifyContent:'space-between', fontSize: 13, padding:'8px 0'}}>
                <span style={{flex: 1, paddingRight: 8}}>{i.name} <span style={{color:'var(--color-text-muted)'}}>· {i.qty}</span></span>
                <span style={{fontVariantNumeric:'tabular-nums', fontWeight: 600}}>₱{(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            <div style={{borderTop:'1px solid var(--color-border)', marginTop: 12, paddingTop: 12}}>
              <Row label="Subtotal" value={`₱${subtotal.toLocaleString()}`}/>
              <Row label="Shipping" value={shipping === 0 ? 'Free' : `₱${shipping}`} good={shipping===0}/>
              <Row label="Total" value={`₱${(subtotal+shipping).toLocaleString()}`} bold/>
            </div>
            <Button full size="lg" onClick={() => setScreen('tracking')} style={{marginTop: 16}}>Place order</Button>
            <div style={{fontSize: 11, color:'var(--color-text-muted)', textAlign:'center', marginTop: 10}}>By placing this order you agree to Pantria's terms.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{padding: 24, background:'var(--color-surface)', borderRadius:'var(--radius-lg)', border:'1px solid var(--color-border)'}}>
      <h3 style={{margin:'0 0 16px', fontSize: 16, fontWeight: 700}}>{title}</h3>
      <div style={{display:'flex', flexDirection:'column', gap: 12}}>{children}</div>
    </div>
  );
}

function Field({ label, placeholder }) {
  return (
    <label style={{display:'flex', flexDirection:'column', gap: 6, fontSize: 13, fontWeight: 600}}>{label}
      <input placeholder={placeholder} style={{padding:'10px 12px', borderRadius: 10, border:'1px solid var(--color-border)', fontSize: 14, fontFamily:'var(--font-sans)'}}/>
    </label>
  );
}

function Row({ label, value, bold, good }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', padding:'6px 0', fontSize: bold ? 16 : 13, fontWeight: bold ? 700 : 400}}>
      <span style={{color: bold ? 'var(--color-text)' : 'var(--color-text-muted)'}}>{label}</span>
      <span style={{fontVariantNumeric:'tabular-nums', color: good ? 'var(--color-success)' : 'var(--color-text)', fontWeight: bold ? 700 : 600}}>{value}</span>
    </div>
  );
}

function TrackingScreen({ setScreen }) {
  const steps = [
    { t:'Order placed', sub:'Today 10:24 AM', done: true },
    { t:'Preparing your order', sub:'Today 11:00 AM', done: true },
    { t:'Out for delivery', sub:'Today, by 4:00 PM', done: false, current: true },
    { t:'Delivered', sub:'Pending', done: false },
  ];
  return (
    <div style={{maxWidth: 880, margin:'0 auto', padding:'24px 40px 48px'}}>
      <div style={{padding: 32, background:'var(--color-primary-tint)', borderRadius:'var(--radius-xl)', marginBottom: 24}}>
        <div style={{fontSize: 12, fontWeight: 700, color:'var(--color-primary-darker)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom: 8}}>Order #PNT-7421</div>
        <h1 style={{fontFamily:'var(--font-display)', fontSize: 34, fontWeight: 700, letterSpacing:'-0.01em', margin:'0 0 8px'}}>Out for delivery</h1>
        <p style={{margin: 0, color:'var(--color-text-muted)'}}>Arriving today by 4:00 PM at Brgy. Poblacion, Makati.</p>
      </div>
      <div style={{padding: 32, background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)'}}>
        <h3 style={{margin:'0 0 20px', fontSize: 16, fontWeight: 700}}>Timeline</h3>
        <div style={{display:'flex', flexDirection:'column', gap: 0}}>
          {steps.map((s,i) => (
            <div key={i} style={{display:'flex', gap: 16, paddingBottom: 24, position:'relative'}}>
              {i < steps.length-1 && <div style={{position:'absolute', left: 13, top: 28, bottom: 0, width: 2, background: s.done ? 'var(--color-primary)' : 'var(--color-border)'}}/>}
              <div style={{
                width: 28, height: 28, borderRadius:'50%',
                background: s.done ? 'var(--color-primary)' : s.current ? 'var(--color-accent)' : 'var(--color-surface-2)',
                color: '#fff',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
                border: s.current ? '3px solid var(--color-accent-soft)' : 'none',
              }}>
                {s.done && <Icon name="check" size={14} stroke={3}/>}
                {s.current && <span style={{width: 8, height: 8, borderRadius:'50%', background:'#fff'}}/>}
              </div>
              <div>
                <div style={{fontSize: 15, fontWeight: 600, color: s.done || s.current ? 'var(--color-text)' : 'var(--color-text-muted)'}}>{s.t}</div>
                <div style={{fontSize: 13, color:'var(--color-text-muted)', marginTop: 2}}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{marginTop: 24, textAlign:'center'}}>
        <Button variant="ghost" onClick={() => setScreen('home')}>Back to home</Button>
      </div>
    </div>
  );
}

function AboutScreen() {
  const values = [
    { i:'truck', t:'Honest delivery', s:"If we can't deliver to your barangay yet, we'll tell you upfront — no surprises at checkout." },
    { i:'pkg', t:'Tight ship, fair prices', s:'We negotiate hard with suppliers and pass the savings on. No hidden markups.' },
    { i:'leaf', t:'Built for resellers', s:'Sari-sari owners and restaurant buyers get tier discounts that actually move the needle.' },
  ];
  const stats = [
    { n:'8,400+', l:'Households served' },
    { n:'1,200+', l:'Sari-sari partners' },
    { n:'120', l:'Barangays delivered to' },
    { n:'2 days', l:'Average restock time' },
  ];
  return (
    <div style={{maxWidth: 1100, margin:'0 auto', padding:'24px 40px 64px'}}>
      <div style={{padding:'56px 48px', borderRadius:'var(--radius-xl)', background:'var(--color-primary-tint)', marginBottom: 48}}>
        <div style={{fontSize: 12, fontWeight: 700, color:'var(--color-primary-darker)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom: 12}}>About Pantria</div>
        <h1 style={{fontFamily:'var(--font-display)', fontSize: 52, fontWeight: 700, letterSpacing:'-0.02em', lineHeight: 1.05, margin:'0 0 16px', maxWidth: 720}}>A neighborhood store, run like a tight ship.</h1>
        <p style={{fontSize: 17, color:'var(--color-text-muted)', maxWidth: 620, lineHeight: 1.55, margin: 0}}>We started Pantria because pantry shopping shouldn't mean three trips, four delivery apps, and surprise stockouts. We restock weekly, price clearly, and tell you the truth about delivery.</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 16, marginBottom: 56}}>
        {stats.map(s => (
          <div key={s.l} style={{padding: 24, background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)'}}>
            <div style={{fontFamily:'var(--font-display)', fontSize: 36, fontWeight: 700, letterSpacing:'-0.01em', color:'var(--color-primary-darker)'}}>{s.n}</div>
            <div style={{fontSize: 13, color:'var(--color-text-muted)', marginTop: 4}}>{s.l}</div>
          </div>
        ))}
      </div>
      <h2 style={{fontFamily:'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing:'-0.01em', margin:'0 0 24px'}}>What we believe</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16, marginBottom: 56}}>
        {values.map(v => (
          <div key={v.t} style={{padding: 24, background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)'}}>
            <div style={{width: 44, height: 44, borderRadius: 12, background:'var(--color-primary-soft)', color:'var(--color-primary)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom: 16}}>
              <Icon name={v.i} size={22}/>
            </div>
            <div style={{fontSize: 17, fontWeight: 700, marginBottom: 6}}>{v.t}</div>
            <div style={{fontSize: 14, color:'var(--color-text-muted)', lineHeight: 1.5}}>{v.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactScreen() {
  return (
    <div style={{maxWidth: 1100, margin:'0 auto', padding:'24px 40px 64px'}}>
      <div style={{marginBottom: 32}}>
        <div style={{fontSize: 12, fontWeight: 700, color:'var(--color-text-muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom: 8}}>Get in touch</div>
        <h1 style={{fontFamily:'var(--font-display)', fontSize: 42, fontWeight: 700, letterSpacing:'-0.02em', margin:'0 0 8px'}}>We're easy to reach.</h1>
        <p style={{margin: 0, fontSize: 16, color:'var(--color-text-muted)'}}>Replies within 4 hours, Monday to Saturday, 8am–6pm.</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap: 32}}>
        <div style={{padding: 28, background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)'}}>
          <h3 style={{margin:'0 0 16px', fontSize: 17, fontWeight: 700}}>Send us a message</h3>
          <div style={{display:'flex', flexDirection:'column', gap: 14}}>
            <Field label="Your name" placeholder="Maria Lopez"/>
            <Field label="Email" placeholder="you@example.com"/>
            <Field label="Mobile" placeholder="0917 …"/>
            <label style={{display:'flex', flexDirection:'column', gap: 6, fontSize: 13, fontWeight: 600}}>How can we help?
              <select style={{padding:'10px 12px', borderRadius: 10, border:'1px solid var(--color-border)', fontSize: 14, fontFamily:'var(--font-sans)', background:'#fff'}}>
                <option>Order question</option>
                <option>Delivery question</option>
                <option>Wholesale inquiry</option>
                <option>Something else</option>
              </select>
            </label>
            <label style={{display:'flex', flexDirection:'column', gap: 6, fontSize: 13, fontWeight: 600}}>Message
              <textarea rows={5} placeholder="Tell us what's going on…" style={{padding:'10px 12px', borderRadius: 10, border:'1px solid var(--color-border)', fontSize: 14, fontFamily:'var(--font-sans)', resize:'vertical'}}/>
            </label>
            <Button size="lg">Send message</Button>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap: 16}}>
          {[
            { i:'msg', t:'Messenger', s:'Fastest reply — usually within 30 minutes', a:'Open chat' },
            { i:'tag', t:'Email', s:'hello@pantria.ph', a:'Send email' },
            { i:'truck', t:'Warehouse', s:'Unit 12, Sucat Industrial Park, Parañaque', a:'Get directions' },
          ].map(x => (
            <div key={x.t} style={{padding: 20, background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)', display:'flex', gap: 14}}>
              <div style={{width: 40, height: 40, borderRadius: 10, background:'var(--color-primary-soft)', color:'var(--color-primary)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
                <Icon name={x.i} size={20}/>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 15, fontWeight: 700}}>{x.t}</div>
                <div style={{fontSize: 13, color:'var(--color-text-muted)', margin:'2px 0 8px'}}>{x.s}</div>
                <a style={{fontSize: 13, fontWeight: 600, color:'var(--color-primary)', cursor:'pointer'}}>{x.a} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WholesaleScreen() {
  const tiers = [
    { name:'Starter', vol:'₱5k–20k / month', d:'5%', f:['Tier-1 pricing on 200+ SKUs','Weekly restock alerts','Standard delivery'] },
    { name:'Growth', vol:'₱20k–100k / month', d:'8%', f:['Tier-2 pricing','Priority restocks','Free delivery in Metro Manila','Net-7 payment terms'], featured: true },
    { name:'Volume', vol:'₱100k+ / month', d:'12%+', f:['Custom pricing','Dedicated account manager','Same-day cutoff','Net-15 payment terms'] },
  ];
  return (
    <div style={{maxWidth: 1280, margin:'0 auto', padding:'24px 40px 64px'}}>
      <div style={{padding:'48px 40px', borderRadius:'var(--radius-xl)', background:'var(--color-accent-soft)', marginBottom: 48, display:'grid', gridTemplateColumns:'1.2fr 1fr', gap: 32, alignItems:'center'}}>
        <div>
          <div style={{display:'inline-flex', alignItems:'center', gap: 8, padding:'6px 12px', background:'var(--color-accent)', borderRadius: 9999, fontSize: 12, fontWeight: 700, color:'var(--color-text)', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom: 16}}>
            <Icon name="tag" size={14}/> Wholesale program
          </div>
          <h1 style={{fontFamily:'var(--font-display)', fontSize: 46, fontWeight: 700, letterSpacing:'-0.02em', lineHeight: 1.05, margin:'0 0 14px'}}>Buy more, pay less. Apply once.</h1>
          <p style={{margin: 0, fontSize: 16, color:'var(--color-text)', opacity: 0.85, maxWidth: 480, lineHeight: 1.55}}>For sari-sari stores, restaurants, canteens, and resellers. Volume-based discounts on every order — automatically applied at checkout.</p>
        </div>
        <div style={{aspectRatio:'4/3', borderRadius:'var(--radius-lg)', background:'linear-gradient(135deg, #FFEDE7, #FAF8EC)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 140, boxShadow:'var(--shadow-md)'}}>📦</div>
      </div>
      <h2 style={{fontFamily:'var(--font-display)', fontSize: 30, fontWeight: 600, letterSpacing:'-0.01em', margin:'0 0 24px'}}>Discount tiers</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16, marginBottom: 48}}>
        {tiers.map(t => (
          <div key={t.name} style={{
            padding: 28, borderRadius:'var(--radius-lg)',
            background: t.featured ? 'var(--color-primary-tint)' : 'var(--color-surface)',
            border: t.featured ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
            position:'relative',
          }}>
            {t.featured && <span style={{position:'absolute', top: -12, left: 24, padding:'4px 10px', background:'var(--color-primary)', color:'#fff', fontSize: 11, fontWeight: 700, letterSpacing:'0.04em', textTransform:'uppercase', borderRadius: 9999}}>Most popular</span>}
            <div style={{fontSize: 13, fontWeight: 700, color:'var(--color-text-muted)', letterSpacing:'0.04em', textTransform:'uppercase', marginBottom: 8}}>{t.name}</div>
            <div style={{fontFamily:'var(--font-display)', fontSize: 44, fontWeight: 700, letterSpacing:'-0.02em', color:'var(--color-primary-darker)'}}>{t.d} <span style={{fontSize: 16, fontWeight: 500, color:'var(--color-text-muted)'}}>off</span></div>
            <div style={{fontSize: 13, color:'var(--color-text-muted)', marginBottom: 20}}>{t.vol}</div>
            <ul style={{margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 10}}>
              {t.f.map(x => (
                <li key={x} style={{display:'flex', gap: 10, fontSize: 14, color:'var(--color-text)'}}>
                  <span style={{color:'var(--color-success)', flexShrink: 0, marginTop: 2}}><Icon name="check" size={16} stroke={3}/></span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{padding: 32, background:'var(--color-surface)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-lg)', maxWidth: 720, margin:'0 auto'}}>
        <h3 style={{margin:'0 0 4px', fontSize: 22, fontWeight: 700, fontFamily:'var(--font-display)', letterSpacing:'-0.01em'}}>Apply for wholesale pricing</h3>
        <p style={{margin:'0 0 24px', fontSize: 14, color:'var(--color-text-muted)'}}>Takes 2 minutes. We review applications within 1 business day.</p>
        <div style={{display:'flex', flexDirection:'column', gap: 14}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
            <Field label="Business name" placeholder="Aling Mhel's Sari-sari"/>
            <Field label="Owner / contact name" placeholder="Carmela Reyes"/>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
            <Field label="Mobile" placeholder="0917 …"/>
            <Field label="Email" placeholder="you@example.com"/>
          </div>
          <label style={{display:'flex', flexDirection:'column', gap: 6, fontSize: 13, fontWeight: 600}}>Business type
            <select style={{padding:'10px 12px', borderRadius: 10, border:'1px solid var(--color-border)', fontSize: 14, fontFamily:'var(--font-sans)', background:'#fff'}}>
              <option>Sari-sari store</option>
              <option>Restaurant / canteen</option>
              <option>Reseller</option>
              <option>Office pantry</option>
              <option>Other</option>
            </select>
          </label>
          <Field label="Estimated monthly volume (₱)" placeholder="e.g. 30,000"/>
          <Field label="Delivery address" placeholder="Street, Barangay, City"/>
          <Button size="lg">Submit application</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, ShopScreen, ProductScreen, CartDrawer, CheckoutScreen, TrackingScreen, AboutScreen, ContactScreen, WholesaleScreen });
