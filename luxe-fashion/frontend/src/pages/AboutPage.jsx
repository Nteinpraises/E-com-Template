import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:860 }}>

        {/* HERO */}
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>
            Our Story
          </div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:300, lineHeight:1.1, marginBottom:20 }}>
            Dressed for Every<br/><em style={{ fontStyle:'italic', color:'var(--accent)' }}>Chapter of Your Story</em>
          </h1>
          <p style={{ fontSize:16, color:'var(--grey2)', lineHeight:1.8, maxWidth:580, margin:'0 auto' }}>
            LUXE was founded on a simple belief — every man deserves to look
            and feel exceptional, whatever the occasion.
          </p>
        </div>

        {/* STORY */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center', marginBottom:72 }}>
          <div>
            <div style={{ fontFamily:'var(--ff-serif)', fontSize:28, marginBottom:16 }}>Who We Are</div>
            <p style={{ color:'var(--grey2)', lineHeight:1.9, marginBottom:16 }}>
              LUXE is a premium men's fashion brand dedicated to crafting
              timeless, high-quality clothing that blends classic elegance
              with modern sensibility.
            </p>
            <p style={{ color:'var(--grey2)', lineHeight:1.9 }}>
              From boardroom suits to weekend essentials, every piece in our
              collection is thoughtfully designed and rigorously tested to
              ensure it meets the standards of the modern gentleman.
            </p>
          </div>
          <div style={{
            background:'linear-gradient(135deg,var(--cream2),var(--cream3))',
            borderRadius:12, height:300,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:80,
          }}>
            🕴️
          </div>
        </div>

        {/* VALUES */}
        <div style={{ marginBottom:72 }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:32, textAlign:'center', marginBottom:40 }}>
            Our Values
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {[
              { icon:'✦', title:'Quality First',     desc:'Every garment is made from premium materials sourced from the finest mills.' },
              { icon:'♻',  title:'Sustainability',    desc:'We are committed to responsible sourcing and reducing our environmental footprint.' },
              { icon:'🤝', title:'Customer Promise',  desc:'Your satisfaction is our priority. We stand behind every product we sell.' },
            ].map(v => (
              <div key={v.title} style={{
                background:'var(--white)', border:'1px solid var(--cream3)',
                borderRadius:12, padding:'28px 24px', textAlign:'center',
              }}>
                <div style={{ fontSize:28, marginBottom:14 }}>{v.icon}</div>
                <div style={{ fontFamily:'var(--ff-serif)', fontSize:20, marginBottom:10 }}>{v.title}</div>
                <div style={{ fontSize:13.5, color:'var(--grey)', lineHeight:1.7 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div style={{
          background:'var(--charcoal)', borderRadius:12, padding:'40px',
          display:'grid', gridTemplateColumns:'repeat(4,1fr)',
          gap:24, textAlign:'center', marginBottom:72,
        }}>
          {[
            { n:'500+', l:'Products'       },
            { n:'10K+', l:'Happy Customers'},
            { n:'50+',  l:'Countries'      },
            { n:'5★',   l:'Average Rating' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:'2rem', color:'var(--stone)', fontWeight:600 }}>{s.n}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:28, marginBottom:16 }}>
            Ready to Elevate Your Wardrobe?
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
            Shop the Collection
          </button>
        </div>

      </div>
    </div>
  );
}