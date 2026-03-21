import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Icon, Stars } from '../components/Icons';

const API = import.meta.env.VITE_API_URL;

// ── ADD PRODUCT MODAL ─────────────────────────
function AddProductModal({ open, onClose, onAdd }) {
  const cats = ['Suits','Shirts','T-Shirts','Trousers','Jeans','Loafers'];
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState('');
  const [form,    setForm]    = useState({
    name:'', category:'Suits', price:'', oldPrice:'',
    sizes:'S,M,L,XL', colors:'#1A1714', stock:'10',
    desc:'', badge:'', emoji:'👔',
  });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.price || !form.desc) {
      setErr('Name, price and description are required'); return;
    }
    setLoading(true); setErr('');
    try {
      await onAdd({
        ...form,
        price:    Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        sizes:    form.sizes.split(',').map(s => s.trim()),
        colors:   form.colors.split(',').map(c => c.trim()),
        stock:    Number(form.stock),
        badge:    form.badge || null,
      });
      // reset form
      setForm({ name:'', category:'Suits', price:'', oldPrice:'', sizes:'S,M,L,XL', colors:'#1A1714', stock:'10', desc:'', badge:'', emoji:'👔' });
      onClose();
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to add product');
    } finally { setLoading(false); }
  };

  if (!open) return null;
  return (
    <div
      style={{ position:'fixed', inset:0, background:'rgba(26,23,20,.6)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
      onClick={onClose}
    >
      <div
        style={{ background:'var(--white)', borderRadius:12, width:'100%', maxWidth:560, maxHeight:'90vh', overflowY:'auto', boxShadow:'var(--shadow2)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* HEAD */}
        <div style={{ padding:'24px 28px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:24 }}>Add New Product</div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
        </div>

        {/* BODY */}
        <div style={{ padding:'20px 28px 28px' }}>
          <div className="grid-2" style={{ gap:12 }}>
            <div className="input-group" style={{ marginBottom:12 }}>
              <label className="input-label">Product Name *</label>
              <input className="input-field" placeholder="e.g. Classic Black Suit" value={form.name} onChange={set('name')} />
            </div>
            <div className="input-group" style={{ marginBottom:12 }}>
              <label className="input-label">Category</label>
              <select className="input-field" value={form.category} onChange={set('category')}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="input-group" style={{ marginBottom:12 }}>
              <label className="input-label">Price ($) *</label>
              <input className="input-field" type="number" placeholder="99" value={form.price} onChange={set('price')} />
            </div>
            <div className="input-group" style={{ marginBottom:12 }}>
              <label className="input-label">Old Price ($) — optional</label>
              <input className="input-field" type="number" placeholder="Leave blank if no sale" value={form.oldPrice} onChange={set('oldPrice')} />
            </div>
            <div className="input-group" style={{ marginBottom:12 }}>
              <label className="input-label">Emoji Icon</label>
              <input className="input-field" placeholder="👔" value={form.emoji} onChange={set('emoji')} />
            </div>
            <div className="input-group" style={{ marginBottom:12 }}>
              <label className="input-label">Stock Quantity</label>
              <input className="input-field" type="number" placeholder="10" value={form.stock} onChange={set('stock')} />
            </div>
          </div>

          <div className="input-group" style={{ marginBottom:12 }}>
            <label className="input-label">Sizes (comma-separated)</label>
            <input className="input-field" placeholder="S,M,L,XL  or  28,30,32,34" value={form.sizes} onChange={set('sizes')} />
          </div>

          <div className="input-group" style={{ marginBottom:12 }}>
            <label className="input-label">Colours (hex codes, comma-separated)</label>
            <input className="input-field" placeholder="#1A1714, #FFFFFF" value={form.colors} onChange={set('colors')} />
            <div style={{ display:'flex', gap:6, marginTop:6 }}>
              {form.colors.split(',').map((c,i) => (
                <div key={i} style={{ width:20, height:20, borderRadius:'50%', background:c.trim(), border:'1px solid var(--cream3)' }} />
              ))}
            </div>
          </div>

          <div className="input-group" style={{ marginBottom:12 }}>
            <label className="input-label">Badge</label>
            <select className="input-field" value={form.badge} onChange={set('badge')}>
              <option value="">None</option>
              <option>New</option>
              <option>Bestseller</option>
              <option>Sale</option>
            </select>
          </div>

          <div className="input-group" style={{ marginBottom:16 }}>
            <label className="input-label">Description *</label>
            <textarea className="input-field" rows={3}
              placeholder="Describe the product — material, fit, occasion…"
              value={form.desc} onChange={set('desc')} />
          </div>

          {err && (
            <div style={{ color:'var(--danger)', fontSize:13, marginBottom:12, background:'#FDEDEC', padding:'8px 12px', borderRadius:4 }}>
              {err}
            </div>
          )}

          <div style={{ display:'flex', gap:10 }}>
            <button className="btn btn-ghost" style={{ flex:1 }} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{ flex:1 }} onClick={submit} disabled={loading}>
              {loading ? 'Adding…' : '+ Add Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ADMIN PAGE ───────────────────────────
export default function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [tab,      setTab]      = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders,   setOrders]   = useState([]);
  const [addOpen,  setAddOpen]  = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    axios.get(`${API}/products`).then(r => setProducts(r.data)).catch(console.error);
    axios.get(`${API}/orders`).then(r => setOrders(r.data)).catch(console.error);
  }, [user]);

  const handleAddProduct = async (productData) => {
    const { data } = await axios.post(`${API}/products`, productData);
    setProducts(ps => [...ps, data]);
  };

  const removeProduct = async (id) => {
    if (!window.confirm('Remove this product? This cannot be undone.')) return;
    await axios.delete(`${API}/products/${id}`);
    setProducts(ps => ps.filter(p => p._id !== id));
  };

  const updateOrderStatus = async (id, orderStatus) => {
    await axios.put(`${API}/orders/${id}/status`, { orderStatus });
    setOrders(os => os.map(o => o._id === id ? { ...o, orderStatus } : o));
  };

  if (!user || user.role !== 'admin') return (
    <div style={{ padding:'100px 20px', textAlign:'center' }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
      <div style={{ fontFamily:'var(--ff-serif)', fontSize:24, marginBottom:10 }}>Admin Access Required</div>
      <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );

  const revenue = orders.filter(o => o.orderStatus !== 'cancelled').reduce((s,o) => s + o.totalPrice, 0);
  const navItems = [
    { key:'dashboard', icon:'dash',     label:'Dashboard' },
    { key:'products',  icon:'box',      label:'Products'  },
    { key:'orders',    icon:'orders',   label:'Orders'    },
    { key:'shipping',  icon:'truck',    label:'Shipping'  },
    { key:'settings',  icon:'settings', label:'Settings'  },
  ];

  return (
    <div className="admin-layout">

      <AddProductModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAddProduct} />

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-logo">
          LUXE<br/>
          <span style={{ fontSize:11, letterSpacing:1, opacity:.5, fontFamily:'var(--ff-sans)', fontWeight:400 }}>Admin Panel</span>
        </div>
        <div>
          {navItems.map(n => (
            <div key={n.key} className={`admin-nav-item ${tab===n.key?'active':''}`} onClick={() => setTab(n.key)}>
              <Icon name={n.icon} size={16} />{n.label}
            </div>
          ))}
          <div style={{ borderTop:'1px solid rgba(255,255,255,.08)', margin:'16px 0 8px' }} />
          <div className="admin-nav-item" onClick={() => navigate('/')}><Icon name="arrow" size={16} />View Store</div>
          <div className="admin-nav-item" onClick={logout}><Icon name="logout" size={16} />Logout</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="admin-main">
        <div className="admin-header">
          <div>
            <span style={{ fontWeight:600, textTransform:'capitalize' }}>{tab}</span>
            <span style={{ fontSize:13, color:'var(--grey)', marginLeft:8 }}>· Welcome, {user.name}</span>
          </div>
          <span style={{ fontSize:12, background:'#D5F5E3', color:'#1E8449', padding:'3px 10px', borderRadius:99, fontWeight:500 }}>● Admin</span>
        </div>

        <div className="admin-content">

          {/* DASHBOARD */}
          {tab === 'dashboard' && (
            <>
              <div className="grid-4" style={{ marginBottom:28 }}>
                {[
                  { label:'Total Revenue',   value:`$${revenue.toLocaleString()}`, color:'var(--accent)'   },
                  { label:'Total Orders',    value:orders.length,                  color:'var(--charcoal)' },
                  { label:'Products Listed', value:products.length,                color:'var(--charcoal)' },
                  { label:'Pending',         value:orders.filter(o=>o.orderStatus==='processing').length, color:'#B7950B' },
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <div className="stat-num" style={{ color:s.color }}>{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:'var(--white)', borderRadius:8, padding:24, border:'1px solid var(--cream3)' }}>
                <div style={{ fontWeight:600, marginBottom:16 }}>Recent Orders</div>
                {orders.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'40px 0', color:'var(--grey)' }}>No orders yet</div>
                ) : (
                  <table className="data-table">
                    <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>{orders.slice(0,5).map(o => (
                      <tr key={o._id}>
                        <td style={{ fontWeight:600, color:'var(--accent)', fontSize:12 }}>{o._id.slice(-8).toUpperCase()}</td>
                        <td>{o.user?.name || 'Customer'}</td>
                        <td style={{ color:'var(--grey)' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td style={{ fontWeight:600 }}>${o.totalPrice?.toFixed(2)}</td>
                        <td><span className={`status-badge ${o.orderStatus}`}>{o.orderStatus}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* PRODUCTS */}
          {tab === 'products' && (
            <>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:17 }}>All Products</div>
                  <div style={{ fontSize:13, color:'var(--grey)' }}>{products.length} total</div>
                </div>
                <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                  + Add Product
                </button>
              </div>
              <table className="data-table">
                <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Actions</th></tr></thead>
                <tbody>{products.map(p => (
                  <tr key={p._id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontSize:24 }}>{p.emoji}</span>
                        <span style={{ fontWeight:500 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={{ color:'var(--grey)' }}>{p.category}</td>
                    <td style={{ fontWeight:600 }}>${p.price}</td>
                    <td>
                      <span style={{ color: p.stock<=10?'var(--danger)':'inherit', fontWeight: p.stock<=10?600:400 }}>
                        {p.stock}
                      </span>
                    </td>
                    <td><Stars rating={p.rating} size={12} /></td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => removeProduct(p._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <>
              <div style={{ fontWeight:600, fontSize:17, marginBottom:20 }}>All Orders</div>
              <div className="grid-4" style={{ marginBottom:24 }}>
                {[
                  ['All Orders', orders.length, 'var(--charcoal)'],
                  ['Delivered',  orders.filter(o=>o.orderStatus==='delivered').length,  'var(--success)'],
                  ['Shipped',    orders.filter(o=>o.orderStatus==='shipped').length,    '#1A5276'],
                  ['Processing', orders.filter(o=>o.orderStatus==='processing').length, '#B7950B'],
                ].map(([l,v,c]) => (
                  <div key={l} className="stat-card">
                    <div className="stat-num" style={{ color:c }}>{v}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
              {orders.length === 0 ? (
                <div style={{ textAlign:'center', padding:'60px', color:'var(--grey)', background:'var(--white)', borderRadius:8, border:'1px solid var(--cream3)' }}>
                  No orders yet
                </div>
              ) : (
                <table className="data-table">
                  <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Update</th></tr></thead>
                  <tbody>{orders.map(o => (
                    <tr key={o._id}>
                      <td style={{ fontWeight:600, color:'var(--accent)', fontSize:12 }}>{o._id.slice(-8).toUpperCase()}</td>
                      <td>{o.user?.name || 'Customer'}</td>
                      <td style={{ color:'var(--grey)' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td>{o.items?.length}</td>
                      <td style={{ fontWeight:600 }}>${o.totalPrice?.toFixed(2)}</td>
                      <td><span className={`status-badge ${o.orderStatus}`}>{o.orderStatus}</span></td>
                      <td>
                        <select
                          style={{ fontSize:12, padding:'4px 8px', border:'1px solid var(--cream3)', borderRadius:4, background:'var(--white)', cursor:'pointer' }}
                          value={o.orderStatus}
                          onChange={e => updateOrderStatus(o._id, e.target.value)}>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </>
          )}

          {/* SHIPPING */}
          {tab === 'shipping' && (
            <>
              <div style={{ fontWeight:600, fontSize:17, marginBottom:20 }}>Shipping Management</div>
              <div className="grid-3" style={{ marginBottom:28 }}>
                {[
                  { label:'Pending Dispatch', count:orders.filter(o=>o.orderStatus==='processing').length, color:'#B7950B' },
                  { label:'In Transit',       count:orders.filter(o=>o.orderStatus==='shipped').length,    color:'#1A5276' },
                  { label:'Delivered',        count:orders.filter(o=>o.orderStatus==='delivered').length,  color:'var(--success)' },
                ].map(s => (
                  <div key={s.label} className="stat-card" style={{ borderLeft:`3px solid ${s.color}` }}>
                    <div className="stat-num" style={{ color:s.color }}>{s.count}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              {orders.length === 0 ? (
                <div style={{ textAlign:'center', padding:'60px', color:'var(--grey)', background:'var(--white)', borderRadius:8, border:'1px solid var(--cream3)' }}>
                  No shipments yet
                </div>
              ) : (
                <table className="data-table">
                  <thead><tr><th>Order ID</th><th>Customer</th><th>Destination</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>{orders.filter(o=>o.orderStatus!=='cancelled').map(o => (
                    <tr key={o._id}>
                      <td style={{ fontWeight:600, color:'var(--accent)', fontSize:12 }}>{o._id.slice(-8).toUpperCase()}</td>
                      <td>{o.user?.name || 'Customer'}</td>
                      <td style={{ color:'var(--grey)' }}>{o.shippingAddress?.city || '—'}</td>
                      <td style={{ color:'var(--grey)' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td><span className={`status-badge ${o.orderStatus}`}>{o.orderStatus}</span></td>
                      <td>
                        <button className="btn btn-accent btn-sm"
                          onClick={() => updateOrderStatus(o._id,
                            o.orderStatus==='processing' ? 'shipped' :
                            o.orderStatus==='shipped'    ? 'delivered' : 'delivered'
                          )}>
                          {o.orderStatus==='processing' ? 'Mark Shipped' :
                           o.orderStatus==='shipped'    ? 'Mark Delivered' : '✓ Delivered'}
                        </button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              )}
            </>
          )}

          {/* SETTINGS */}
          {tab === 'settings' && (
            <div style={{ display:'grid', gap:24 }}>
              {[
                { title:'Store Information', fields:["Store Name: LUXE Men's Fashion","Currency: USD ($)","Email: hello@luxe.com","Phone: +237 600 000 000"] },
                { title:'Payment Settings',  fields:['Stripe: Connected ✓','PayPal: Connected ✓','Test Mode: Enabled','Webhook: /api/payments/stripe/webhook'] },
                { title:'Shipping Rates',    fields:['Standard: Free on orders over $150','Express: $18 flat rate (2–3 days)','Overnight: $35 flat rate (next day)'] },
              ].map(s => (
                <div key={s.title} style={{ background:'var(--white)', borderRadius:8, padding:24, border:'1px solid var(--cream3)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                    <div style={{ fontWeight:600 }}>{s.title}</div>
                    <button className="btn btn-ghost btn-sm"><Icon name="edit" size={13} /> Edit</button>
                  </div>
                  {s.fields.map(f => (
                    <div key={f} style={{ fontSize:14, padding:'8px 0', borderBottom:'1px solid var(--cream2)', color:'var(--grey2)' }}>{f}</div>
                  ))}
                </div>
              ))}
              <div style={{ background:'#FDEDEC', borderRadius:8, padding:24, border:'1px solid #F5CCC6' }}>
                <div style={{ fontWeight:600, color:'var(--danger)', marginBottom:8 }}>Danger Zone</div>
                <div style={{ fontSize:13, color:'var(--grey)', marginBottom:14 }}>These actions are irreversible.</div>
                <div style={{ display:'flex', gap:10 }}>
                  <button className="btn btn-danger btn-sm">Clear All Orders</button>
                  <button className="btn btn-danger btn-sm">Reset Store Data</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}