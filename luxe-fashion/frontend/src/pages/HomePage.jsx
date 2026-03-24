import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Stars } from '../components/Icons';

const API = import.meta.env.VITE_API_URL;

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isWishlisted, user, setAuthOpen } = useApp();

  if (!product) return null;
  const wishlisted = isWishlisted(product._id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!user) { setAuthOpen(true); return; }
    if (wishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>

      {/* IMAGE */}
      <div style={{
        width:'100%', aspectRatio:'3/4',
        background:'linear-gradient(135deg,var(--cream2),var(--cream3))',
        display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden',
      }}>
        {product.mainImage ? (
          <img src={product.mainImage} alt={product.name}
               style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
        ) : (
          <span style={{ fontSize:72 }}>{product.emoji}</span>
        )}
        {product.badge && <span className="product-badge">{product.badge}</span>}

        {/* HEART BUTTON */}
        <button
          onClick={handleWishlist}
          style={{
            position:'absolute', top:10, right:10,
            width:34, height:34, borderRadius:'50%',
            background: wishlisted ? '#e11d48' : 'rgba(255,255,255,.85)',
            border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:16, transition:'all .2s',
            boxShadow:'0 2px 8px rgba(0,0,0,.15)',
            color: wishlisted ? '#fff' : '#888',
          }}
        >
          {wishlisted ? '♥' : '♡'}
        </button>
      </div>

      {/* INFO */}
      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div style={{ display:'flex', alignItems:'center' }}>
          <span className="product-price">${product.price}</span>
          {product.oldPrice && <span className="product-old-price">${product.oldPrice}</span>}
        </div>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span>({product.numReviews})</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="product-actions" onClick={e => e.stopPropagation()}>
        <button className="btn btn-primary btn-sm" style={{ flex:1 }}
                onClick={() => navigate(`/product/${product._id}`)}>View</button>
        <button className="btn btn-outline btn-sm"
                onClick={() => addToCart(product, product.sizes?.[0], product.colors?.[0])}>
          + Cart
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate  = useNavigate();
  const { setFilterCat } = useApp();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`).then(r => setProducts(r.data)).catch(console.error);
  }, []);

  const bestsellers  = products.filter(p => p.badge === 'Bestseller').slice(0,4);
  const newArrivals  = products.filter(p => p.badge === 'New' || !p.badge).slice(0,4);
  const cats = ['Suits','Shirts','T-Shirts','Trousers','Jeans','Loafers'];
  const catEmojis = ['🕴️','👔','👕','👖','👖','👞'];

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="max-w">
          <div className="hero-eyebrow">New Collection 2026</div>
          <h1 className="hero-title">
            Dressed for<br/><em>Every Chapter</em><br/>of Your Story
          </h1>
          <p className="hero-sub">
            Premium menswear crafted for the modern gentleman.
            From boardroom suits to weekend essentials.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <button className="btn btn-accent btn-lg" onClick={() => navigate('/shop')}>
              Shop Collection →
            </button>
            <button className="btn" style={{ background:'rgba(255,255,255,.12)', color:'#fff', border:'1.5px solid rgba(255,255,255,.25)' }}
                    onClick={() => navigate('/shop')}>
              View All Products
            </button>
          </div>
          <div className="hero-cats">
            {cats.map(c => (
              <span key={c} className="hero-cat"
                    onClick={() => { setFilterCat(c); navigate('/shop'); }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* BESTSELLERS */}
      <div className="section">
        <div className="max-w">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
            <div>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:36 }}>Bestsellers</div>
              <div style={{ fontSize:14, color:'var(--grey)', marginTop:4 }}>Most loved by our customers</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/shop')}>View All</button>
          </div>
          <div className="grid-4">
            {bestsellers.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ background:'var(--cream2)', padding:'60px 0' }}>
        <div className="max-w">
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:36, marginBottom:28 }}>Shop by Category</div>
          <div className="grid-3">
            {cats.map((c,i) => (
              <div key={c}
                style={{ background:'var(--white)', borderRadius:8, padding:'32px 24px', border:'1px solid var(--cream3)', cursor:'pointer', transition:'all .2s', textAlign:'center' }}
                onClick={() => { setFilterCat(c); navigate('/shop'); }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
                <div style={{ fontSize:42, marginBottom:12 }}>{catEmojis[i]}</div>
                <div style={{ fontFamily:'var(--ff-serif)', fontSize:20 }}>{c}</div>
                <div style={{ fontSize:13, color:'var(--grey)', marginTop:4 }}>
                  {products.filter(p => p.category === c).length} items
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <div className="section">
        <div className="max-w">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
            <div>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:36 }}>New Arrivals</div>
              <div style={{ fontSize:14, color:'var(--grey)', marginTop:4 }}>Fresh additions to the collection</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/shop')}>See All</button>
          </div>
          <div className="grid-4">
            {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </div>

      {/* PERKS */}
      <div style={{ background:'var(--charcoal)', padding:'60px 0', color:'#fff' }}>
        <div className="max-w">
          <div className="grid-4" style={{ gap:24 }}>
            {[
              { icon:'🚚', title:'Free Shipping',       sub:'On orders over $150' },
              { icon:'✓',  title:'Quality Guaranteed',  sub:'Premium materials only' },
              { icon:'↩',  title:'Easy Returns',        sub:'30-day hassle-free returns' },
              { icon:'👔', title:'Expert Styling',      sub:'Personalised advice' },
            ].map(p => (
              <div key={p.title} style={{ textAlign:'center' }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{p.icon}</div>
                <div style={{ fontFamily:'var(--ff-serif)', fontSize:17, marginBottom:4 }}>{p.title}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.5)' }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}