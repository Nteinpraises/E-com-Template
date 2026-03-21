import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { cartOpen, setCartOpen, cart, removeFromCart, updateQty, cartTotal } = useApp();

  const goCheckout = () => { setCartOpen(false); navigate('/checkout'); };
  const goShop     = () => { setCartOpen(false); navigate('/shop'); };

  return (
    <>
      <div className={`drawer-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />
      <div className={`cart-drawer ${cartOpen ? 'open' : ''}`}>

        {/* HEAD */}
        <div className="drawer-head">
          <div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:20 }}>Your Cart</div>
            <div style={{ fontSize:13, color:'var(--grey)' }}>{cart.length} item{cart.length !== 1 ? 's' : ''}</div>
          </div>
          <button className="icon-btn" onClick={() => setCartOpen(false)}>
            <Icon name="x" />
          </button>
        </div>

        {/* BODY */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0', color:'var(--grey)' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🛍️</div>
              <div>Your cart is empty</div>
              <button className="btn btn-outline" style={{ marginTop:16 }} onClick={goShop}>
                Browse Collection
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.key} className="cart-item">
                <div className="cart-item-img">{item.product.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:500, fontSize:14 }}>{item.product.name}</div>
                  <div style={{ fontSize:12, color:'var(--grey)', marginTop:2 }}>
                    Size: {item.size} ·{' '}
                    <span style={{ display:'inline-block', width:10, height:10, background:item.color, borderRadius:'50%', verticalAlign:'middle' }} />
                  </div>
                  <div style={{ fontWeight:600, marginTop:6 }}>${item.product.price}</div>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQty(item.key, item.qty - 1)}>
                      <Icon name="minus" size={12} />
                    </button>
                    <span style={{ fontSize:14, fontWeight:500, minWidth:20, textAlign:'center' }}>
                      {item.qty}
                    </span>
                    <button className="qty-btn" onClick={() => updateQty(item.key, item.qty + 1)}>
                      <Icon name="plus" size={12} />
                    </button>
                    <button
                      className="icon-btn"
                      style={{ marginLeft:'auto', color:'var(--grey)' }}
                      onClick={() => removeFromCart(item.key)}
                    >
                      <Icon name="trash" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOT */}
        {cart.length > 0 && (
          <div className="drawer-foot">
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:14 }}>
              <span style={{ color:'var(--grey)' }}>Subtotal</span>
              <span style={{ fontWeight:600 }}>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, fontSize:14 }}>
              <span style={{ color:'var(--grey)' }}>Shipping</span>
              <span style={{ color:'var(--accent)', fontWeight:500 }}>Calculated at checkout</span>
            </div>
            <button className="btn btn-primary btn-full btn-lg" onClick={goCheckout}>
              Checkout — ${cartTotal.toFixed(2)}
            </button>
            <button className="btn btn-ghost btn-full" style={{ marginTop:8 }} onClick={goShop}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}