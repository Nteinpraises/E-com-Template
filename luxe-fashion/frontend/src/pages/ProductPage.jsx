import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Stars, Icon } from '../components/Icons';

const API = import.meta.env.VITE_API_URL;

export default function ProductPage() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const { addToCart, user, toast } = useApp();

  const [product,       setProduct]       = useState(null);
  const [related,       setRelated]       = useState([]);
  const [selectedSize,  setSelectedSize]  = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [qty,           setQty]           = useState(1);
  const [reviewText,    setReviewText]    = useState('');
  const [reviewRating,  setReviewRating]  = useState(5);
  const [loading,       setLoading]       = useState(true);
  const [submitting,    setSubmitting]    = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/products/${id}`)
      .then(r => {
        setProduct(r.data);
        setSelectedColor(r.data.colors[0]);
        // fetch related
        return axios.get(`${API}/products`, { params: { category: r.data.category } });
      })
      .then(r => setRelated(r.data.filter(p => p._id !== id).slice(0,4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const submitReview = async () => {
    if (!user)             { toast('Please sign in to leave a review', 'error'); return; }
    if (!reviewText.trim()){ toast('Please write a review', 'error'); return; }
    setSubmitting(true);
    try {
      await axios.post(`${API}/products/${id}/reviews`, { rating: reviewRating, text: reviewText });
      toast('Review submitted ✓', 'success');
      setReviewText('');
      // refresh product
      const r = await axios.get(`${API}/products/${id}`);
      setProduct(r.data);
    } catch (e) {
      toast(e.response?.data?.message || 'Error submitting review', 'error');
    } finally { setSubmitting(false); }
  };

  if (loading) return <div style={{ padding:'100px', textAlign:'center', color:'var(--grey)' }}>Loading…</div>;
  if (!product) return <div style={{ padding:'100px', textAlign:'center' }}>Product not found</div>;

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <div style={{ padding:'40px 0 80px' }}>
      <div className="max-w">
        {/* BREADCRUMB */}
        <div className="breadcrumb" style={{ marginBottom:28 }}>
          <span style={{ cursor:'pointer', color:'var(--accent)' }} onClick={() => navigate('/')}>Home</span>
          <span style={{ color:'var(--stone)' }}>›</span>
          <span style={{ cursor:'pointer', color:'var(--accent)' }} onClick={() => navigate('/shop')}>Shop</span>
          <span style={{ color:'var(--stone)' }}>›</span>
          <span>{product.name}</span>
        </div>

        {/* MAIN GRID */}
        <div className="detail-grid">
          <div className="detail-img">{product.emoji}</div>

          <div>
            <div style={{ fontSize:11, color:'var(--grey)', letterSpacing:2, textTransform:'uppercase', marginBottom:8 }}>
              {product.category}
            </div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:34, fontWeight:400, lineHeight:1.1, marginBottom:10 }}>
              {product.name}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <Stars rating={product.rating} size={15} />
              <span style={{ fontSize:13, color:'var(--grey)' }}>({product.numReviews} reviews)</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
              <span style={{ fontFamily:'var(--ff-serif)', fontSize:28, fontWeight:600 }}>${product.price}</span>
              {product.oldPrice && <span style={{ fontSize:18, color:'var(--stone)', textDecoration:'line-through' }}>${product.oldPrice}</span>}
              {discount && <span style={{ background:'#FDEDEC', color:'var(--danger)', fontSize:12, fontWeight:600, padding:'3px 8px', borderRadius:4 }}>{discount}% OFF</span>}
            </div>
            <p style={{ fontSize:14, color:'var(--grey2)', lineHeight:1.8, marginBottom:24 }}>{product.desc}</p>

            {/* COLOURS */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:500, marginBottom:10 }}>Colour</div>
              <div style={{ display:'flex', gap:8 }}>
                {product.colors.map(c => (
                  <div key={c}
                    className={`color-dot ${selectedColor === c ? 'selected' : ''}`}
                    style={{ background:c }}
                    onClick={() => setSelectedColor(c)} />
                ))}
              </div>
            </div>

            {/* SIZES */}
            <div style={{ marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                <span style={{ fontSize:13, fontWeight:500 }}>Size</span>
                <span style={{ fontSize:13, color:'var(--accent)', textDecoration:'underline', cursor:'pointer' }}>Size Guide</span>
              </div>
              <div className="size-grid">
                {product.sizes.map(s => (
                  <button key={s} className={`size-btn ${selectedSize === s ? 'selected' : ''}`}
                          onClick={() => setSelectedSize(s)}>{s}</button>
                ))}
              </div>
              {!selectedSize && <div style={{ fontSize:12, color:'var(--grey)', marginTop:8 }}>Please select a size</div>}
            </div>

            {/* QTY + ADD */}
            <div style={{ display:'flex', gap:8, marginBottom:12 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, border:'1.5px solid var(--cream3)', borderRadius:'var(--radius)', padding:'0 12px' }}>
                <button className="qty-btn" style={{ border:'none' }} onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
                <span style={{ fontWeight:500, minWidth:20, textAlign:'center' }}>{qty}</span>
                <button className="qty-btn" style={{ border:'none' }} onClick={() => setQty(q => q+1)}>+</button>
              </div>
              <button className="btn btn-primary" style={{ flex:1 }}
                      onClick={() => addToCart(product, selectedSize, selectedColor, qty)}>
                Add to Cart — ${(product.price * qty).toFixed(2)}
              </button>
            </div>
            <div style={{ fontSize:12, color:'var(--grey)', display:'flex', gap:6, alignItems:'center', marginTop:8 }}>
              🚚 Free shipping on orders over $150 · {product.stock} in stock
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div style={{ marginTop:60 }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:28, marginBottom:28 }}>Customer Reviews</div>
          {product.reviews?.length > 0 ? product.reviews.map((r,i) => (
            <div key={i} className="review-card">
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div style={{ fontWeight:500 }}>{r.name}</div>
                <div style={{ fontSize:13, color:'var(--grey)' }}>
                  {new Date(r.createdAt).toLocaleDateString()}
                </div>
              </div>
              <Stars rating={r.rating} size={13} />
              <p style={{ fontSize:13, marginTop:8, color:'var(--grey2)', lineHeight:1.7 }}>{r.text}</p>
            </div>
          )) : (
            <div style={{ fontSize:13, color:'var(--grey)', marginBottom:20 }}>No reviews yet. Be the first!</div>
          )}

          {/* WRITE REVIEW */}
          <div style={{ background:'var(--cream2)', borderRadius:'var(--radius)', padding:24, marginTop:24 }}>
            <div style={{ fontWeight:600, marginBottom:14 }}>Write a Review</div>
            <div style={{ marginBottom:10 }}>
              <span style={{ fontSize:13, color:'var(--grey)', marginRight:8 }}>Rating:</span>
              {[1,2,3,4,5].map(n => (
                <span key={n} className="stars" style={{ fontSize:20, cursor:'pointer' }}
                      onClick={() => setReviewRating(n)}>
                  {n <= reviewRating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <textarea className="input-field" rows={3}
              placeholder="Share your experience…"
              value={reviewText} onChange={e => setReviewText(e.target.value)} />
            <button className="btn btn-primary" style={{ marginTop:12 }}
                    onClick={submitReview} disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Review'}
            </button>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div style={{ marginTop:60 }}>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:28, marginBottom:28 }}>You May Also Like</div>
            <div className="grid-4">
              {related.map(p => (
                <div key={p._id} className="product-card" onClick={() => navigate(`/product/${p._id}`)}>
                  <div className="product-img"><span style={{ fontSize:72 }}>{p.emoji}</span></div>
                  <div className="product-info">
                    <div className="product-cat">{p.category}</div>
                    <div className="product-name">{p.name}</div>
                    <span className="product-price">${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}