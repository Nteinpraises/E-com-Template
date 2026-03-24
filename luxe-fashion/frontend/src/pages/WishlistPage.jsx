import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, addToCart, user } = useApp();

  if (!user) return (
    <div style={{ padding:'100px 20px', textAlign:'center' }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
      <div style={{ fontFamily:'var(--ff-serif)', fontSize:24, marginBottom:10 }}>
        Sign in to view your wishlist
      </div>
      <div style={{ color:'var(--grey)', marginBottom:24, fontSize:14 }}>
        Create an account to save your favourite items.
      </div>
      <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  );

  return (
    <div style={{ padding:'40px 0 80px' }}>
      <div className="max-w">

        {/* HEADER */}
        <div style={{ marginBottom:36 }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:36 }}>
            My Wishlist
          </div>
          <div style={{ fontSize:14, color:'var(--grey)', marginTop:4 }}>
            {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <div style={{ fontSize:64, marginBottom:16 }}>♡</div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:26, marginBottom:10 }}>
              Your wishlist is empty
            </div>
            <div style={{ color:'var(--grey)', fontSize:14, marginBottom:28 }}>
              Browse our collection and save items you love.
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="grid-4">
            {wishlist.map(product => (
              <div key={product._id} style={{ background:'var(--white)', borderRadius:'var(--radius)', border:'1px solid var(--cream3)', overflow:'hidden', transition:'all .2s' }}
                   onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow2)'; }}
                   onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>

                {/* IMAGE */}
                <div style={{ width:'100%', aspectRatio:'3/4', background:'linear-gradient(135deg,var(--cream2),var(--cream3))', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', cursor:'pointer' }}
                     onClick={() => navigate(`/product/${product._id}`)}>
                  {product.mainImage ? (
                    <img src={product.mainImage} alt={product.name}
                         style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  ) : (
                    <span style={{ fontSize:72 }}>{product.emoji}</span>
                  )}

                  {/* REMOVE HEART */}
                  <button
                    onClick={e => { e.stopPropagation(); removeFromWishlist(product._id); }}
                    style={{
                      position:'absolute', top:10, right:10,
                      width:34, height:34, borderRadius:'50%',
                      background:'#e11d48', border:'none', cursor:'pointer',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:16, color:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,.2)',
                    }}
                    title="Remove from wishlist"
                  >
                    ♥
                  </button>
                </div>

                {/* INFO */}
                <div style={{ padding:'14px 16px' }}>
                  <div style={{ fontSize:11, color:'var(--grey)', textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>
                    {product.category}
                  </div>
                  <div style={{ fontWeight:500, fontSize:14, marginBottom:6, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                    {product.name}
                  </div>
                  <div style={{ fontWeight:600, fontSize:16, marginBottom:12 }}>
                    ${product.price}
                    {product.oldPrice && (
                      <span style={{ fontSize:13, color:'var(--stone)', textDecoration:'line-through', marginLeft:8 }}>
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <button className="btn btn-primary btn-sm" style={{ flex:1 }}
                            onClick={() => navigate(`/product/${product._id}`)}>
                      View
                    </button>
                    <button className="btn btn-outline btn-sm"
                            onClick={() => addToCart(product, product.sizes[0], product.colors[0])}>
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}