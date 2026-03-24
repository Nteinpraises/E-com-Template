import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const navigate    = useNavigate();
  const { setFilterCat } = useApp();

  const shopLinks = [
    { label:'Suits',     cat:'Suits'    },
    { label:'Shirts',    cat:'Shirts'   },
    { label:'T-Shirts',  cat:'T-Shirts' },
    { label:'Trousers',  cat:'Trousers' },
    { label:'Jeans',     cat:'Jeans'    },
    { label:'Loafers',   cat:'Loafers'  },
  ];

  const helpLinks = [
    { label:'FAQ',             path:'/faq'             },
    { label:'Shipping Policy', path:'/shipping-policy' },
    { label:'Returns',         path:'/returns'         },
    { label:'Size Guide',      path:'/size-guide'      },
    { label:'Track Order',     path:'/track-order'     },
  ];

  const companyLinks = [
    { label:'About Us',          path:'/about'           },
    { label:'Contact Us',        path:'/contact'         },
    { label:'Privacy Policy',    path:'/privacy-policy'  },
    { label:'Terms of Service',  path:'/terms'           },
  ];

  return (
    <footer className="footer">
      <div className="max-w">
        <div className="footer-grid">

          {/* BRAND */}
          <div>
            <div className="footer-brand">LUXE</div>
            <p className="footer-desc">
              Premium menswear for the modern gentleman. Crafted with care,
              delivered with style. Quality you can feel with every wear.
            </p>
            <div style={{ marginTop:20, display:'flex', gap:12 }}>
              {['📘','📸','🐦','▶️'].map((icon,i) => (
                <div key={i} style={{
                  width:36, height:36, background:'rgba(255,255,255,.08)',
                  borderRadius:8, display:'flex', alignItems:'center',
                  justifyContent:'center', cursor:'pointer', fontSize:16,
                  transition:'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.15)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.08)'}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* SHOP */}
          <div>
            <div className="footer-heading">Shop</div>
            {shopLinks.map(l => (
              <span key={l.label} className="footer-link"
                    onClick={() => { setFilterCat(l.cat); navigate('/shop'); }}>
                {l.label}
              </span>
            ))}
          </div>

          {/* HELP */}
          <div>
            <div className="footer-heading">Help</div>
            {helpLinks.map(l => (
              <span key={l.label} className="footer-link"
                    onClick={() => navigate(l.path)}>
                {l.label}
              </span>
            ))}
          </div>

          {/* COMPANY */}
          <div>
            <div className="footer-heading">Company</div>
            {companyLinks.map(l => (
              <span key={l.label} className="footer-link"
                    onClick={() => navigate(l.path)}>
                {l.label}
              </span>
            ))}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <span>© 2026 LUXE Men's Fashion. All rights reserved.</span>
          <div style={{ display:'flex', gap:16 }}>
            <span>🔒 Stripe Secured</span>
            <span>💳 PayPal</span>
            <span>🚚 Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}