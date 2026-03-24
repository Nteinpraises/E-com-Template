import { useState } from 'react';

export default function ContactPage() {
  const [form,    setForm]    = useState({ name:'', email:'', subject:'', message:'' });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 1200);
  };

  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:960 }}>

        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>Get in Touch</div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:300 }}>We'd Love to Hear From You</h1>
          <p style={{ color:'var(--grey)', marginTop:12, fontSize:15 }}>Our team typically responds within 24 hours.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:48 }}>

          {/* CONTACT INFO */}
          <div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:22, marginBottom:24 }}>Contact Details</div>
            {[
              { icon:'📧', label:'Email',    value:'hello@luxe.com'         },
              { icon:'📞', label:'Phone',    value:'+237 6XX XXX XXX'       },
              { icon:'📍', label:'Address',  value:'Douala, Cameroon'       },
              { icon:'🕐', label:'Hours',    value:'Mon–Fri, 9am – 6pm WAT' },
            ].map(c => (
              <div key={c.label} style={{ display:'flex', gap:16, marginBottom:24 }}>
                <div style={{
                  width:44, height:44, background:'var(--cream2)',
                  borderRadius:10, display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:18, flexShrink:0,
                }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize:12, color:'var(--grey)', textTransform:'uppercase', letterSpacing:1, marginBottom:2 }}>{c.label}</div>
                  <div style={{ fontWeight:500 }}>{c.value}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop:8 }}>
              <div style={{ fontSize:13, color:'var(--grey)', marginBottom:12 }}>Follow Us</div>
              <div style={{ display:'flex', gap:10 }}>
                {['Facebook','Instagram','Twitter','YouTube'].map(s => (
                  <div key={s} style={{
                    padding:'6px 12px', border:'1.5px solid var(--cream3)',
                    borderRadius:6, fontSize:12, cursor:'pointer',
                    color:'var(--grey2)', transition:'all .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--cream3)'; e.currentTarget.style.color='var(--grey2)'; }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FORM */}
          <div style={{ background:'var(--white)', borderRadius:12, padding:32, border:'1px solid var(--cream3)' }}>
            {!sent ? (
              <>
                <div style={{ fontFamily:'var(--ff-serif)', fontSize:22, marginBottom:24 }}>Send a Message</div>
                <div className="grid-2" style={{ gap:14 }}>
                  <div className="input-group" style={{ marginBottom:14 }}>
                    <label className="input-label">Your Name *</label>
                    <input className="input-field" placeholder="John Doe" value={form.name} onChange={set('name')} />
                  </div>
                  <div className="input-group" style={{ marginBottom:14 }}>
                    <label className="input-label">Email Address *</label>
                    <input className="input-field" type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
                  </div>
                </div>
                <div className="input-group" style={{ marginBottom:14 }}>
                  <label className="input-label">Subject</label>
                  <select className="input-field" value={form.subject} onChange={set('subject')}>
                    <option value="">Select a topic</option>
                    <option>Order Enquiry</option>
                    <option>Return / Exchange</option>
                    <option>Product Question</option>
                    <option>Shipping Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="input-group" style={{ marginBottom:20 }}>
                  <label className="input-label">Message *</label>
                  <textarea className="input-field" rows={5} placeholder="How can we help you?" value={form.message} onChange={set('message')} />
                </div>
                <button className="btn btn-primary btn-full btn-lg" onClick={submit} disabled={loading}>
                  {loading ? 'Sending…' : 'Send Message →'}
                </button>
              </>
            ) : (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
                <div style={{ fontFamily:'var(--ff-serif)', fontSize:24, marginBottom:10 }}>Message Sent!</div>
                <p style={{ color:'var(--grey)', lineHeight:1.7 }}>
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button className="btn btn-outline" style={{ marginTop:20 }} onClick={() => setSent(false)}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}