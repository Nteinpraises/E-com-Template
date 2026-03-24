export default function PrivacyPolicyPage() {
  const sections = [
    { title:'1. Information We Collect', content:'We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you create an account or make a purchase. We also automatically collect certain information about your device and how you interact with our website, including IP address, browser type, and pages visited.' },
    { title:'2. How We Use Your Information', content:'We use the information we collect to process and fulfil your orders, send order confirmations and shipping updates, respond to your enquiries and provide customer support, send promotional communications (with your consent), improve our website and services, and comply with legal obligations.' },
    { title:'3. Sharing Your Information', content:'We do not sell, trade, or otherwise transfer your personal information to third parties except as necessary to fulfil your orders (e.g. shipping carriers), process payments (e.g. Stripe, PayPal), or as required by law. All third-party service providers are contractually required to keep your information confidential.' },
    { title:'4. Payment Security', content:'All payment transactions are processed through Stripe, a PCI DSS compliant payment processor. We never store your full credit card details on our servers. Your financial information is encrypted using SSL technology during transmission.' },
    { title:'5. Cookies', content:'We use cookies to enhance your browsing experience, remember your preferences, and analyse website traffic. You can control cookie settings through your browser. Disabling cookies may affect the functionality of our website.' },
    { title:'6. Your Rights', content:'You have the right to access, update, or delete your personal information at any time. You may also opt out of marketing emails by clicking "unsubscribe" in any email we send. To exercise these rights, contact us at hello@luxe.com.' },
    { title:'7. Data Retention', content:'We retain your personal information for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required by law. Order information is typically retained for 7 years for accounting and legal purposes.' },
    { title:'8. Changes to This Policy', content:'We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website with an updated date. Your continued use of our website after changes constitutes acceptance of the updated policy.' },
    { title:'9. Contact Us', content:'If you have any questions about this Privacy Policy or our privacy practices, please contact us at: hello@luxe.com or write to us at LUXE Men\'s Fashion, Douala, Cameroon.' },
  ];

  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:780 }}>
        <div style={{ marginBottom:48 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>Legal</div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300, marginBottom:12 }}>Privacy Policy</h1>
          <p style={{ color:'var(--grey)', fontSize:14 }}>Last updated: March 2026</p>
        </div>
        <p style={{ color:'var(--grey2)', lineHeight:1.9, marginBottom:36, fontSize:15 }}>
          At LUXE Men's Fashion, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
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