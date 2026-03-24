import { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';

const API = import.meta.env.VITE_API_URL;

export default function TrackOrderPage() {
  const { user } = useApp();
  const [orderId,  setOrderId]  = useState('');
  const [order,    setOrder]    = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState('');

  const track = async () => {
    if (!orderId.trim()) { setErr('Please enter an order ID'); return; }
    if (!user)           { setErr('Please sign in to track your order'); return; }
    setLoading(true); setErr(''); setOrder(null);
    try {
      const { data } = await axios.get(`${API}/orders/${orderId.trim()}`);
      setOrder(data);
    } catch (e) {
      setErr('Order not found. Please check your order ID and try again.');
    } finally { setLoading(false); }
  };

  const steps = ['Processing','Shipped','Delivered'];
  const statusIndex = order
    ? order.orderStatus === 'processing' ? 0
    : order.orderStatus === 'shipped'    ? 1
    : order.orderStatus === 'delivered'  ? 2 : 0
    : -1;

  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:680 }}>

        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>Delivery</div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300 }}>Track Your Order</h1>
          <p style={{ color:'var(--grey)', marginTop:12 }}>
            Enter your order ID to see real-time delivery status.
          </p>
        </div>

        {/* SEARCH BOX */}
        <div style={{ background:'var(--white)', borderRadius:12, padding:32, border:'1px solid var(--cream3)', marginBottom:32 }}>
          <div className="input-group" style={{ marginBottom:16 }}>
            <label className="input-label">Order ID</label>
            <input
              className="input-field"
              placeholder="e.g. 67a3f2c1b4e5d8901234abcd"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && track()}
            />
            <div style={{ fontSize:12, color:'var(--grey)', marginTop:6 }}>
              Your order ID can be found in your order confirmation email.
            </div>
          </div>
          {err && (
            <div style={{ color:'var(--danger)', fontSize:13, marginBottom:14, background:'#FDEDEC', padding:'8px 12px', borderRadius:4 }}>
              {err}
            </div>
          )}
          <button className="btn btn-primary btn-full btn-lg" onClick={track} disabled={loading}>
            {loading ? 'Tracking…' : '🔍 Track Order'}
          </button>
        </div>

        {/* ORDER RESULT */}
        {order && (
          <div style={{ background:'var(--white)', borderRadius:12, padding:32, border:'1px solid var(--cream3)' }}>

            {/* STATUS TRACKER */}
            <div style={{ marginBottom:32 }}>
              <div style={{ display:'flex', justifyContent:'space-between', position:'relative', marginBottom:8 }}>
                <div style={{ position:'absolute', top:14, left:'10%', right:'10%', height:3, background:'var(--cream3)', zIndex:0 }} />
                <div style={{
                  position:'absolute', top:14, left:'10%', height:3,
                  background:'var(--success)', zIndex:1,
                  width: statusIndex === 0 ? '0%' : statusIndex === 1 ? '50%' : '80%',
                  transition:'width .5s ease',
                }} />
                {steps.map((s,i) => (
                  <div key={s} style={{ textAlign:'center', zIndex:2, flex:1 }}>
                    <div style={{
                      width:32, height:32, borderRadius:'50%', margin:'0 auto 8px',
                      background: i<=statusIndex ? 'var(--success)' : 'var(--cream3)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color: i<=statusIndex ? '#fff' : 'var(--grey)',
                      fontSize:14, fontWeight:600, border:'3px solid var(--white)',
                    }}>
                      {i<=statusIndex ? '✓' : i+1}
                    </div>
                    <div style={{ fontSize:12, fontWeight: i===statusIndex?600:400, color: i<=statusIndex?'var(--success)':'var(--grey)' }}>
                      {s}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER DETAILS */}
            <div style={{ borderTop:'1px solid var(--cream3)', paddingTop:24 }}>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:20, marginBottom:16 }}>Order Details</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {[
                  { l:'Order ID',         v: order._id?.slice(-12).toUpperCase() },
                  { l:'Status',           v: order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1) },
                  { l:'Payment',          v: order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1) },
                  { l:'Shipping Method',  v: order.shippingMethod?.charAt(0).toUpperCase() + order.shippingMethod?.slice(1) },
                  { l:'Order Total',      v: `$${order.totalPrice?.toFixed(2)}` },
                  { l:'Order Date',       v: new Date(order.createdAt).toLocaleDateString() },
                ].map(d => (
                  <div key={d.l} style={{ background:'var(--cream2)', borderRadius:8, padding:'12px 14px' }}>
                    <div style={{ fontSize:11, color:'var(--grey)', textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>{d.l}</div>
                    <div style={{ fontWeight:500, fontSize:14 }}>{d.v}</div>
                  </div>
                ))}
              </div>

              {/* SHIPPING ADDRESS */}
              {order.shippingAddress && (
                <div style={{ marginTop:20 }}>
                  <div style={{ fontWeight:600, marginBottom:8 }}>Shipping To</div>
                  <div style={{ fontSize:14, color:'var(--grey2)', lineHeight:1.8 }}>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br/>
                    {order.shippingAddress.address}<br/>
                    {order.shippingAddress.city}, {order.shippingAddress.country}
                  </div>
                </div>
              )}

              {order.trackingNumber && (
                <div style={{ marginTop:20, padding:'12px 16px', background:'#EAF2FF', borderRadius:8, fontSize:14 }}>
                  <strong>Tracking Number:</strong> {order.trackingNumber}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}