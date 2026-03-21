import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Stars } from '../components/Icons';

const API = import.meta.env.VITE_API_URL;

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useApp();
  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="product-img">
        <span style={{ fontSize:72 }}>{product.emoji}</span>
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </div>
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
      <div className="product-actions" onClick={e => e.stopPropagation()}>
        <button className="btn btn-primary btn-sm" style={{ flex:1 }}
                onClick={() => navigate(`/product/${product._id}`)}>View</button>
        <button className="btn btn-outline btn-sm"
                onClick={() => addToCart(product, product.sizes[0], product.colors[0])}>+ Cart</button>
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
      .then(r => setProducts(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filterCat, search, sort]);

  return (
    <div>
      <div className="page-header">
        <div className="max-w">
          <div className="breadcrumb">
            <span>Home</span><span style={{ color:'var(--stone)' }}>›</span><span>Shop</span>
          </div>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:32 }}>Men's Collection</div>
          <div style={{ fontSize:13, color:'var(--grey)', marginTop:4 }}>{products.length} products</div>
        </div>
      </div>

      <div className="max-w" style={{ paddingBottom:60 }}>
        <div className="filter-bar">
          {cats.map(c => (
            <span key={c} className={`filter-chip ${filterCat === c ? 'active' : ''}`}
                  onClick={() => setFilterCat(c)}>{c}</span>
          ))}
          <div style={{ marginLeft:'auto' }}>
            <select
              style={{ padding:'7px 32px 7px 12px', border:'1.5px solid var(--cream3)', borderRadius:'var(--radius)', background:'var(--white)', fontSize:13, color:'var(--grey2)', appearance:'none', outline:'none', cursor:'pointer' }}
              value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

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
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}