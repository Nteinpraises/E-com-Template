import { useState } from 'react';

export default function SizeGuidePage() {
  const [unit,    setUnit]    = useState('cm');
  const [activeTab, setActiveTab] = useState('suits');

  const guides = {
    suits: {
      label: 'Suits & Blazers',
      headers: ['Size','Chest','Waist','Hips','Shoulder'],
      rows: [
        ['36','88–92','76–80','92–96','42'],
        ['38','93–97','81–85','97–101','43'],
        ['40','98–102','86–90','102–106','44'],
        ['42','103–107','91–95','107–111','45'],
        ['44','108–112','96–100','112–116','46'],
        ['46','113–117','101–105','117–121','47'],
        ['48','118–122','106–110','122–126','48'],
      ],
    },
    shirts: {
      label: 'Shirts & T-Shirts',
      headers: ['Size','Chest','Neck','Sleeve','Length'],
      rows: [
        ['XS','82–86','36–37','60','68'],
        ['S', '87–92','37–38','61','70'],
        ['M', '93–98','39–40','62','72'],
        ['L', '99–104','41–42','63','74'],
        ['XL','105–110','43–44','64','76'],
        ['XXL','111–116','45–46','65','78'],
        ['XXXL','117–122','47–48','66','80'],
      ],
    },
    trousers: {
      label: 'Trousers & Jeans',
      headers: ['Waist (in)','Waist (cm)','Hip','Inseam','Rise'],
      rows: [
        ['28','71','88','76','25'],
        ['30','76','92','78','26'],
        ['32','81','96','80','26'],
        ['34','86','100','80','27'],
        ['36','91','104','81','27'],
        ['38','96','108','81','28'],
      ],
    },
    loafers: {
      label: 'Shoes & Loafers',
      headers: ['EU','UK','US','Foot Length (cm)'],
      rows: [
        ['40','6.5','7.5','25.5'],
        ['41','7',  '8',  '26.0'],
        ['42','8',  '9',  '26.7'],
        ['43','9',  '10', '27.3'],
        ['44','9.5','10.5','28.0'],
        ['45','10.5','11.5','28.6'],
        ['46','11', '12', '29.3'],
      ],
    },
  };

  const current = guides[activeTab];

  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:900 }}>

        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>Fit Guide</div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300 }}>Size Guide</h1>
          <p style={{ color:'var(--grey)', marginTop:12 }}>
            All measurements are in <strong>{unit === 'cm' ? 'centimetres' : 'inches'}</strong> unless otherwise stated.
          </p>
        </div>

        {/* HOW TO MEASURE */}
        <div style={{ background:'var(--cream2)', borderRadius:12, padding:28, marginBottom:36, border:'1px solid var(--cream3)' }}>
          <div style={{ fontFamily:'var(--ff-serif)', fontSize:20, marginBottom:16 }}>How to Measure Yourself</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
            {[
              { label:'Chest',    tip:'Measure around the fullest part of your chest, keeping the tape horizontal.' },
              { label:'Waist',    tip:'Measure around your natural waistline, just above the hip bone.' },
              { label:'Hips',     tip:'Measure around the fullest part of your hips and seat.' },
              { label:'Shoulder', tip:'Measure across the back from shoulder seam to shoulder seam.' },
            ].map(m => (
              <div key={m.label} style={{ display:'flex', gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)', marginTop:7, flexShrink:0 }} />
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>{m.label}</div>
                  <div style={{ fontSize:13, color:'var(--grey)', lineHeight:1.6 }}>{m.tip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap' }}>
          {Object.entries(guides).map(([key,val]) => (
            <button key={key} onClick={() => setActiveTab(key)}
              style={{
                padding:'8px 18px', borderRadius:99, border:'1.5px solid',
                borderColor: activeTab===key ? 'var(--charcoal)' : 'var(--cream3)',
                background:  activeTab===key ? 'var(--charcoal)' : 'var(--white)',
                color:       activeTab===key ? '#fff' : 'var(--grey2)',
                fontSize:13, cursor:'pointer', transition:'all .2s',
              }}
            >
              {val.label}
            </button>
          ))}
        </div>

        {/* SIZE TABLE */}
        <div style={{ background:'var(--white)', borderRadius:12, overflow:'hidden', border:'1px solid var(--cream3)' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'var(--charcoal)' }}>
                {current.headers.map(h => (
                  <th key={h} style={{ padding:'14px 16px', textAlign:'left', fontSize:12, fontWeight:600, color:'rgba(255,255,255,.7)', textTransform:'uppercase', letterSpacing:'.5px' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {current.rows.map((row,i) => (
                <tr key={i} style={{ background: i%2===0 ? 'var(--white)' : 'var(--cream2)' }}>
                  {row.map((cell,j) => (
                    <td key={j} style={{ padding:'13px 16px', fontSize:14, fontWeight: j===0 ? 600 : 400, color: j===0 ? 'var(--charcoal)' : 'var(--grey2)', borderBottom:'1px solid var(--cream2)' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop:20, fontSize:13, color:'var(--grey)', textAlign:'center' }}>
          Can't find your size or between sizes?{' '}
          <a href="/contact" style={{ color:'var(--accent)' }}>Contact our styling team</a> for personalised advice.
        </div>

      </div>
    </div>
  );
}