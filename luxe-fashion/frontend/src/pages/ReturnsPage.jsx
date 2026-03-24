import { useNavigate } from 'react-router-dom';

export default function ReturnsPage() {
  const navigate = useNavigate();
  const steps = [
    { num:'01', title:'Initiate Your Return',   desc:'Email hello@luxe.com with your order number and reason for return within 30 days of delivery.' },
    { num:'02', title:'Receive Return Label',    desc:'We will email you a prepaid return shipping label within 24 business hours.' },
    { num:'03', title:'Pack & Ship',             desc:'Pack the item securely in its original packaging with all tags attached, then drop it at any post office.' },
    { num:'04', title:'Refund Processed',        desc:'Once we receive and inspect your return, your refund will be processed within 5–7 business days.' },
  ];

  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:820 }}>

        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>Hassle-Free</div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300 }}>
            Returns & Exchanges
          </h1>
          <p style={{ color:'var(--grey)', marginTop:12, maxWidth:520, margin:'12px auto 0' }}>
            Not satisfied? We make returns simple. 30-day returns, free of charge.
          </p>
        </div>

        {/* POLICY HIGHLIGHTS */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:56 }}>
          {[
            { icon:'📅', title:'30-Day Window',   desc:'Return any item within 30 days of delivery.' },
            { icon:'🚚', title:'Free Returns',     desc:'We cover the return shipping cost for you.' },
            { icon:'💳', title:'Fast Refunds',     desc:'Refunds processed in 5–7 business days.' },
          ].map(h => (
            <div key={h.title} style={{ background:'var(--white)', border:'1px solid var(--cream3)', borderRadius:12, padding:'24px 20px', textAlign:'center' }}>
              <div style={{ fontSize:32, marginBottom:12 }}>{h.icon}</div>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:18, marginBottom:8 }}>{h.title}</div>
              <div style={{ fontSize:13.5, color:'var(--grey)', lineHeight:1.6 }}>{h.desc}</div>
            </div>
          ))}
        </div>

        {/* STEPS */}
        <div style={{ marginBottom:56 }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:28, marginBottom:28, textAlign:'center' }}>
            How to Return
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {steps.map((s,i) => (
              <div key={s.num} style={{ display:'flex', gap:24, position:'relative', paddingBottom: i<steps.length-1?32:0 }}>
                {i < steps.length-1 && (
                  <div style={{ position:'absolute', left:21, top:44, bottom:0, width:2, background:'var(--cream3)' }} />
                )}
                <div style={{
                  width:44, height:44, borderRadius:'50%', background:'var(--charcoal)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontWeight:700, fontSize:13, flexShrink:0,
                }}>
                  {s.num}
                </div>
                <div style={{ paddingTop:8 }}>
                  <div style={{ fontWeight:600, fontSize:16, marginBottom:6 }}>{s.title}</div>
                  <div style={{ fontSize:14, color:'var(--grey2)', lineHeight:1.7 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONDITIONS */}
        <div style={{ background:'var(--white)', border:'1px solid var(--cream3)', borderRadius:12, padding:32, marginBottom:36 }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:22, marginBottom:20 }}>Return Conditions</div>
          {[
            '✓  Item must be returned within 30 days of the delivery date',
            '✓  Items must be unworn, unwashed, and unaltered',
            '✓  All original tags must be attached',
            '✓  Items must be in their original packaging',
            '✗  Sale items marked as "Final Sale" cannot be returned',
            '✗  Underwear and swimwear cannot be returned for hygiene reasons',
          ].map((c,i) => (
            <div key={i} style={{
              padding:'10px 0', borderBottom: i<5 ? '1px solid var(--cream2)' : 'none',
              fontSize:14, color: c.startsWith('✗') ? 'var(--danger)' : 'var(--grey2)',
            }}>
              {c}
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center' }}>
          <div style={{ fontWeight:500, marginBottom:12 }}>Ready to return an item?</div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/contact')}>
            Contact Us to Start a Return
          </button>
        </div>

      </div>
    </div>
  );
}