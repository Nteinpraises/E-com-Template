import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

const API = import.meta.env.VITE_API_URL;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, user, clearCart, toast } = useApp();

  const [step,       setStep]      = useState(1);
  const [payMethod,  setPayMethod] = useState('stripe');
  const [shipping,   setShipping]  = useState('standard');
  const [loading,    setLoading]   = useState(false);
  const [orderId,    setOrderId]   = useState('');

  const [form, setForm] = useState({
    firstName:'', lastName:'', email: user?.email || '',
    phone:'', address:'', city:'', state:'', zip:'', country:'',
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const shippingRates = {
    standard: { label:'Standard Shipping', time:'5–8 business days', price:0  },
    express:  { label:'Express Shipping',  time:'2–3 business days', price:18 },
    overnight:{ label:'Overnight',         time:'Next business day',  price:35 },
  };
  const shippingCost = cartTotal >= 150 && shipping === 'standard' ? 0 : shippingRates[shipping].price;
  const total = cartTotal + shippingCost;

  const placeOrder = async () => {
    if (!form.firstName || !form.address || !form.city) {
      toast('Please fill in all required fields', 'error'); return;
    }
    if (!user) { toast('Please sign in to place an order', 'error'); return; }

    setLoading(true);
    try {
      const orderData = {
        items: cart.map(i => ({
          product: i.product._id,
          name:    i.product.name,
          emoji:   i.product.emoji,
          price:   i.product.price,
          size:    i.size,
          color:   i.color,
          qty:     i.qty,
        })),
        shippingAddress: form,
        shippingMethod:  shipping,
        shippingPrice:   shippingCost,
        subtotal:        cartTotal,
        totalPrice:      total,
        paymentMethod:   payMethod,
      };
      const { data } = await axios.post(`${API}/orders`, orderData);
      setOrderId(data._id);
      clearCart();
      setStep(3);
    } catch (e) {
      toast(e.response?.data?.message || 'Order failed. Please try again.', 'error');
    } finally { setLoading(false); }
  };

  if (cart.length === 0 && step !== 3) return (
    <div style={{ padding:'100px 20px', textAlign:'center' }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🛒</div>
      <div style={{ fontFamily:'var(--ff-serif)', fontSize:24, marginBottom:10 }}>Your cart is empty</div>
      <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>Start Shopping</button>
    </div>
  );

  return (
    <div style={{ padding:'40px 0 80px' }}>
      <div className="max-w">
        <div style={{ fontFamily:'var(--ff-serif)', fontSize:32, marginBottom:32 }}>Checkout</div>

        {/* STEPS */}
        <div style={{ display:'flex', gap:12, marginBottom:36, alignItems:'center' }}>
          {['Shipping','Payment','Confirmation'].map((s,i) => (
            <div key={s} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{
                width:28, height:28, borderRadius:'50%',
                background: step>i+1 ? 'var(--success)' : step===i+1 ? 'var(--charcoal)' : 'var(--cream3)',
                color: step>=i+1 ? '#fff' : 'var(--grey)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:13, fontWeight:600, flexShrink:0,
              }}>
                {step>i+1 ? '✓' : i+1}
              </div>
              <span style={{ fontSize:13.5, fontWeight: step===i+1?600:400, color: step===i+1?'var(--charcoal)':'var(--grey)' }}>{s}</span>
              {i < 2 && <span style={{ color:'var(--stone)', margin:'0 4px' }}>›</span>}
            </div>
          ))}
        </div>

        {step === 3 ? (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div style={{ width:72, height:72, background:'#D5F5E3', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
              <Icon name="check" size={32} color="var(--success)" />
            </div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:32, marginBottom:10 }}>Order Placed!</div>
            <div style={{ color:'var(--grey)', marginBottom:24 }}>
              Thank you! Your order has been received.<br />
              <span style={{ color:'var(--accent)' }}>Order ID: {orderId}</span>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        ) : (
          <div className="checkout-grid">
            <div>
              {step === 1 && (
                <div>
                  <div style={{ fontWeight:600, fontSize:17, marginBottom:20 }}>Shipping Information</div>
                  <div className="grid-2" style={{ gap:14 }}>
                    <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">First Name *</label><input className="input-field" value={form.firstName} onChange={set('firstName')} /></div>
                    <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">Last Name</label><input className="input-field" value={form.lastName} onChange={set('lastName')} /></div>
                  </div>
                  <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">Email *</label><input className="input-field" type="email" value={form.email} onChange={set('email')} /></div>
                  <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">Phone</label><input className="input-field" value={form.phone} onChange={set('phone')} /></div>
                  <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">Address *</label><input className="input-field" value={form.address} onChange={set('address')} /></div>
                  <div className="grid-2" style={{ gap:14 }}>
                    <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">City *</label><input className="input-field" value={form.city} onChange={set('city')} /></div>
                    <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">State / Region</label><input className="input-field" value={form.state} onChange={set('state')} /></div>
                  </div>
                  <div className="grid-2" style={{ gap:14 }}>
                    <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">ZIP Code</label><input className="input-field" value={form.zip} onChange={set('zip')} /></div>
                    <div className="input-group" style={{ marginBottom:14 }}>
                      <label className="input-label">Country</label>
                      <select className="input-field" value={form.country} onChange={set('country')}>
                        <option value="">Select country</option>
                        <option>Cameroon</option><option>Nigeria</option><option>Ghana</option>
                        <option>United States</option><option>United Kingdom</option>
                        <option>France</option><option>Canada</option><option>South Africa</option><option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop:8, marginBottom:24 }}>
                    <div style={{ fontWeight:600, marginBottom:14 }}>Shipping Method</div>
                    {Object.entries(shippingRates).map(([k,v]) => (
                      <div key={k} className={`shipping-option ${shipping===k?'selected':''}`} onClick={() => setShipping(k)}>
                        <div>
                          <div style={{ fontWeight:500, fontSize:14 }}>{v.label}</div>
                          <div style={{ fontSize:12, color:'var(--grey)' }}>{v.time}</div>
                        </div>
                        <div style={{ fontWeight:600, color: k==='standard'&&cartTotal>=150?'var(--success)':'var(--charcoal)' }}>
                          {k==='standard'&&cartTotal>=150 ? 'FREE' : `$${v.price}`}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary btn-full btn-lg" onClick={() => setStep(2)}>
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div style={{ fontWeight:600, fontSize:17, marginBottom:20 }}>Payment Method</div>
                  {[
                    { key:'stripe', color:'#6772E5', label:'STRIPE', sub:'Credit / Debit Card — Visa, Mastercard, Amex' },
                    { key:'paypal', color:'#003087', label:'PAYPAL', sub:'Pay with your PayPal account' },
                  ].map(p => (
                    <div key={p.key} className={`pay-option ${payMethod===p.key?'selected':''}`} onClick={() => setPayMethod(p.key)}>
                      <div style={{ width:40, height:40, background:p.color, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span style={{ color:'#fff', fontWeight:700, fontSize:13 }}>{p.label[0]}</span>
                      </div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:13, color:p.color }}>{p.label}</div>
                        <div style={{ fontSize:12, color:'var(--grey)' }}>{p.sub}</div>
                      </div>
                      {payMethod===p.key && <div style={{ marginLeft:'auto' }}><Icon name="check" color="var(--accent)" /></div>}
                    </div>
                  ))}

                  {payMethod === 'stripe' && (
                    <div style={{ background:'var(--cream2)', borderRadius:8, padding:20, marginTop:8 }}>
                      <div className="input-group" style={{ marginBottom:14 }}><label className="input-label">Card Number</label><input className="input-field" placeholder="1234 5678 9012 3456" /></div>
                      <div className="grid-2" style={{ gap:14 }}>
                        <div className="input-group" style={{ marginBottom:0 }}><label className="input-label">Expiry</label><input className="input-field" placeholder="MM / YY" /></div>
                        <div className="input-group" style={{ marginBottom:0 }}><label className="input-label">CVV</label><input className="input-field" placeholder="•••" /></div>
                      </div>
                    </div>
                  )}
                  {payMethod === 'paypal' && (
                    <div style={{ background:'#F0F8FF', border:'1.5px solid #BDD7EE', borderRadius:8, padding:20, marginTop:8, textAlign:'center' }}>
                      <div style={{ color:'#003087', fontWeight:600 }}>You will be redirected to PayPal</div>
                      <div style={{ fontSize:12, color:'var(--grey)', marginTop:4 }}>Complete your payment securely on PayPal's website</div>
                    </div>
                  )}
                  <div style={{ display:'flex', gap:10, marginTop:24 }}>
                    <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary btn-lg" style={{ flex:1 }} onClick={placeOrder} disabled={loading}>
                      {loading ? 'Placing Order…' : `Place Order — $${total.toFixed(2)}`}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ORDER SUMMARY */}
            <div className="checkout-summary">
              <div style={{ fontWeight:600, marginBottom:16 }}>Order Summary</div>
              {cart.map(i => (
                <div key={i.key} style={{ display:'flex', justifyContent:'space-between', marginBottom:12, fontSize:14 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:20 }}>{i.product.emoji}</span>
                    <div>
                      <div style={{ fontWeight:500 }}>{i.product.name}</div>
                      <div style={{ fontSize:11, color:'var(--grey)' }}>Size: {i.size} × {i.qty}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight:500 }}>${(i.product.price*i.qty).toFixed(2)}</div>
                </div>
              ))}
              <div style={{ borderTop:'1px solid var(--cream3)', marginTop:14, paddingTop:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}>
                  <span style={{ color:'var(--grey)' }}>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}>
                  <span style={{ color:'var(--grey)' }}>Shipping</span>
                  <span style={{ color: shippingCost===0?'var(--success)':'inherit', fontWeight:500 }}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                  </span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--ff-serif)', fontSize:20, marginTop:12, paddingTop:12, borderTop:'1px solid var(--cream3)' }}>
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}