export default function ShippingPolicyPage() {
  const sections = [
    {
      title: 'Processing Time',
      content: 'All orders are processed within 1–2 business days (Monday–Friday, excluding public holidays). Orders placed on weekends or public holidays will be processed the next business day. You will receive an order confirmation email immediately after placing your order, and a shipping confirmation email with tracking details once your order ships.',
    },
    {
      title: 'Shipping Methods & Rates',
      content: null,
      table: [
        { method:'Standard Shipping',  time:'5–8 business days', cost:'Free on orders over $150 / $8.99 below' },
        { method:'Express Shipping',   time:'2–3 business days', cost:'$18.00 flat rate'                       },
        { method:'Overnight Delivery', time:'Next business day',  cost:'$35.00 flat rate (order by 12pm)'      },
      ],
    },
    {
      title: 'International Shipping',
      content: 'We ship to over 50 countries worldwide. International shipping rates and delivery times are calculated at checkout based on destination and package weight. Please note that international orders may be subject to import duties, customs fees, and local taxes, which are the responsibility of the recipient.',
    },
    {
      title: 'Order Tracking',
      content: 'Once your order is shipped, you will receive a confirmation email containing your tracking number and a link to track your package. You can also track your order on our Track Order page. Please allow 24 hours for tracking information to update after receiving your shipping confirmation.',
    },
    {
      title: 'Shipping Restrictions',
      content: 'Some products may have shipping restrictions to certain countries due to customs regulations. If we are unable to ship to your location, you will be notified during checkout. We are not responsible for delays caused by customs processing, natural disasters, or other circumstances beyond our control.',
    },
    {
      title: 'Damaged or Lost Packages',
      content: 'If your package arrives damaged or is lost in transit, please contact us immediately at hello@luxe.com with your order number and photos of any damage. We will work with the carrier to resolve the issue and ensure you receive your order or a full refund.',
    },
  ];

  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:780 }}>

        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>Legal</div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300, marginBottom:12 }}>
            Shipping Policy
          </h1>
          <p style={{ color:'var(--grey)', fontSize:14 }}>Last updated: March 2026</p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:36 }}>
          {sections.map((s,i) => (
            <div key={i}>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:22, marginBottom:12, color:'var(--charcoal)' }}>
                {s.title}
              </div>
              {s.content && (
                <p style={{ color:'var(--grey2)', lineHeight:1.9, fontSize:15 }}>{s.content}</p>
              )}
              {s.table && (
                <table style={{ width:'100%', borderCollapse:'collapse', marginTop:8 }}>
                  <thead>
                    <tr style={{ background:'var(--cream2)' }}>
                      {['Method','Estimated Time','Cost'].map(h => (
                        <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:12, fontWeight:600, color:'var(--grey2)', textTransform:'uppercase', letterSpacing:'.5px', border:'1px solid var(--cream3)' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.map((row,j) => (
                      <tr key={j} style={{ background: j%2===0 ? 'var(--white)' : 'var(--cream2)' }}>
                        <td style={{ padding:'12px 16px', fontSize:14, fontWeight:500, border:'1px solid var(--cream3)' }}>{row.method}</td>
                        <td style={{ padding:'12px 16px', fontSize:14, color:'var(--grey2)', border:'1px solid var(--cream3)' }}>{row.time}</td>
                        <td style={{ padding:'12px 16px', fontSize:14, color:'var(--grey2)', border:'1px solid var(--cream3)' }}>{row.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop:48, padding:24, background:'var(--cream2)', borderRadius:10, border:'1px solid var(--cream3)' }}>
          <div style={{ fontWeight:600, marginBottom:6 }}>Questions about your shipment?</div>
          <p style={{ fontSize:14, color:'var(--grey2)' }}>
            Contact our shipping team at{' '}
            <a href="mailto:hello@luxe.com" style={{ color:'var(--accent)' }}>hello@luxe.com</a>
            {' '}or visit our <a href="/contact" style={{ color:'var(--accent)' }}>Contact page</a>.
          </p>
        </div>

      </div>
    </div>
  );
}