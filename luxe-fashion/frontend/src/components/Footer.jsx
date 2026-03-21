import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="max-w">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">LUXE</div>
            <p className="footer-desc">
              Premium menswear for the modern gentleman. Crafted with care,
              delivered with style. Quality you can feel with every wear.
            </p>
          </div>
          {[
            { title: 'Shop', links: ['Suits','Shirts','T-Shirts','Trousers','Jeans','Loafers'] },
            { title: 'Help', links: ['FAQ','Shipping Policy','Returns','Size Guide','Track Order'] },
            { title: 'Company', links: ['About Us','Contact','Privacy Policy','Terms of Service'] },
          ].map(col => (
            <div key={col.title}>
              <div className="footer-heading">{col.title}</div>
              {col.links.map(l => (
                <span key={l} className="footer-link" onClick={() => navigate('/shop')}>
                  {l}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 LUXE Men's Fashion. All rights reserved.</span>
          <div style={{ display:'flex', gap:16 }}>
            <span> Stripe Secured</span>
            <span> PayPal</span>
            <span> Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}