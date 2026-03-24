import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Stars } from '../components/Icons';

const API = import.meta.env.VITE_API_URL;

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isWishlisted, user, setAuthOpen } = useApp();

  if (!product || !product._id) return null;

  const wishlisted = isWishlisted(product._id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!user) { setAuthOpen(true); return; }
    wishlisted ? removeFromWishlist(product._id) : addToWishlist(product);
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

        {/* HEART */}
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
          {product.oldPrice && (
            <span className="product-old-price">${product.oldPrice}</span>
          )}
        </div>
        <div className="product-rating">
          <Stars rating={product.rating || 0} />
          <span>({product.numReviews || 0})</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="product-actions" onClick={e => e.stopPropagation()}>
        <button className="btn btn-primary btn-sm" style={{ flex:1 }}
                onClick={() => navigate(`/product/${product._id}`)}>View</button>
        <button className="btn btn-outline btn-sm"
                onClick={() => {
                  const size  = product.sizes  && product.sizes.length  > 0 ? product.sizes[0]  : '';
                  const color = product.colors && product.colors.length > 0 ? product.colors[0] : '';
                  addToCart(product, size, color);
                }}>
          + Cart
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { filterCat, setFilterCat, search } = useApp();
  const [products, setProducts] = useState([]);
  const [sort,     setSort]     = useState('default');
  const [loading,  setLoading]  = useState(true);

  const cats = ['All','Suits','Shirts','T-Shirts','Trousers','Jeans','Loafers'];

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filterCat !== 'All') params.category = filterCat;
    if (search)              params.search   = search;
    if (sort !== 'default')  params.sort     = sort;

    axios.get(`${API}/products`, { params })
      .then(r => setProducts(r.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filterCat, search, sort]);

  return (
    <div>
      <div className="page-header">
        <div className="max-w">
          <div className="breadcrumb">
            <span>Home</span>
            <span style={{ color:'var(--stone)' }}>›</span>
            <span>Shop</span>
          </div>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:32 }}>Men's Collection</div>
          <div style={{ fontSize:13, color:'var(--grey)', marginTop:4 }}>
            {products.length} products
          </div>
        </div>
      </div>

      <div className="max-w" style={{ paddingBottom:60 }}>

        {/* FILTERS */}
        <div className="filter-bar">
          {cats.map(c => (
            <span key={c}
                  className={`filter-chip ${filterCat === c ? 'active' : ''}`}
                  onClick={() => setFilterCat(c)}>
              {c}
            </span>
          ))}
          <div style={{ marginLeft:'auto' }}>
            <select
              style={{
                padding:'7px 32px 7px 12px', border:'1.5px solid var(--cream3)',
                borderRadius:'var(--radius)', background:'var(--white)',
                fontSize:13, color:'var(--grey2)', appearance:'none',
                outline:'none', cursor:'pointer',
              }}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--grey)' }}>
            Loading products…
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--grey)' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:24 }}>No products found</div>
            <div style={{ fontSize:13, marginTop:6 }}>Try adjusting your search or filters</div>
          </div>
        ) : (
          <div className="grid-4">
            {products.map(p => p && p._id ? <ProductCard key={p._id} product={p} /> : null)}
          </div>
        )}
      </div>
    </div>
  );
}