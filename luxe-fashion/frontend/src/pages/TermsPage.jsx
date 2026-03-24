export default function TermsPage() {
  const sections = [
    { title:'1. Acceptance of Terms', content:'By accessing and using the LUXE Men\'s Fashion website, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website.' },
    { title:'2. Products & Pricing', content:'We reserve the right to modify product descriptions, prices, and availability at any time without prior notice. All prices are displayed in US Dollars (USD) and are exclusive of applicable taxes. We make every effort to display accurate product information, but we do not warrant that descriptions or prices are error-free.' },
    { title:'3. Orders & Payment', content:'By placing an order, you confirm that you are legally authorised to use the payment method provided. We reserve the right to refuse or cancel any order for any reason, including inaccuracies in product or pricing information, or suspected fraudulent activity. Payment is processed at the time of order placement.' },
    { title:'4. Shipping & Delivery', content:'We will make every effort to deliver your order within the estimated timeframe. However, we are not liable for delays caused by shipping carriers, customs processing, or other circumstances beyond our control. Risk of loss and title to items pass to you upon delivery.' },
    { title:'5. Returns & Refunds', content:'Our return policy allows returns within 30 days of delivery for unworn, undamaged items with original tags attached. Refunds will be credited to your original payment method within 5–7 business days of receiving the returned item. Final sale items are non-returnable.' },
    { title:'6. Intellectual Property', content:'All content on this website, including text, images, logos, and designs, is the exclusive property of LUXE Men\'s Fashion and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use any content without our express written permission.' },
    { title:'7. Limitation of Liability', content:'To the maximum extent permitted by law, LUXE Men\'s Fashion shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the order giving rise to the claim.' },
    { title:'8. Governing Law', content:'These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.' },
    { title:'9. Changes to Terms', content:'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of changes constitutes your acceptance of such changes.' },
    { title:'10. Contact', content:'For questions about these Terms of Service, please contact us at hello@luxe.com.' },
  ];

  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:780 }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>Legal</div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300, marginBottom:12 }}>Terms of Service</h1>
          <p style={{ color:'var(--grey)', fontSize:14 }}>Last updated: March 2026</p>
        </div>
        <p style={{ color:'var(--grey2)', lineHeight:1.9, marginBottom:36, fontSize:15 }}>
          Please read these Terms of Service carefully before using the LUXE Men's Fashion website. These terms govern your use of our website and purchase of our products.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
          {sections.map((s,i) => (
            <div key={i} style={{ borderTop:'1px solid var(--cream3)', paddingTop:28 }}>
              <div style={{ fontFamily:'var(--ff-serif)', fontSize:20, marginBottom:12 }}>{s.title}</div>
              <p style={{ color:'var(--grey2)', lineHeight:1.9, fontSize:15 }}>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}