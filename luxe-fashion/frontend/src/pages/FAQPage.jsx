import { useState } from 'react';

const FAQS = [
  {
    category: 'Orders & Shipping',
    items: [
      { q:'How long does delivery take?', a:'Standard shipping takes 5–8 business days. Express shipping is 2–3 business days. Overnight delivery is available for next-business-day arrival.' },
      { q:'Do you ship internationally?', a:'Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination and are calculated at checkout.' },
      { q:'How do I track my order?', a:'Once your order ships, you will receive a tracking number by email. You can also use our Track Order page to check your delivery status.' },
      { q:'Is there free shipping?', a:'Yes — standard shipping is free on all orders over $150. Orders below $150 attract a flat standard shipping fee.' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      { q:'What is your return policy?', a:'We offer a 30-day hassle-free return policy. Items must be unworn, unwashed, and in their original packaging with all tags attached.' },
      { q:'How do I start a return?', a:'Contact our team at hello@luxe.com with your order number and reason for return. We will send you a prepaid return label within 24 hours.' },
      { q:'Can I exchange for a different size?', a:'Absolutely. Exchanges are free of charge. Simply start a return and place a new order for the correct size, or contact us and we will handle the exchange directly.' },
      { q:'When will I receive my refund?', a:'Refunds are processed within 5–7 business days of receiving your return. The amount will be credited to your original payment method.' },
    ],
  },
  {
    category: 'Products & Sizing',
    items: [
      { q:'How do I find my correct size?', a:'Visit our Size Guide page for detailed measurements for all product categories. When in doubt between two sizes, we recommend sizing up for suits and jackets.' },
      { q:'Are your products true to size?', a:'Generally yes. Our suits and trousers follow standard international sizing. We include size notes on each product page where sizing may vary.' },
      { q:'What materials are used?', a:'We use premium materials including wool blends, Egyptian cotton, Pima cotton, full-grain leather, and breathable linen. Material details are listed on each product page.' },
      { q:'How should I care for my garments?', a:'Care instructions are printed on the label inside each garment. Most suits should be dry-cleaned. Shirts and t-shirts can be machine washed on a gentle cycle.' },
    ],
  },
  {
    category: 'Account & Payments',
    items: [
      { q:'What payment methods do you accept?', a:'We accept all major credit and debit cards (Visa, Mastercard, Amex) via Stripe, and PayPal.' },
      { q:'Is my payment information secure?', a:'Yes. All payments are processed by Stripe, which is PCI DSS compliant. We never store your card details on our servers.' },
      { q:'Do I need an account to order?', a:'You can browse without an account, but you need to create a free account to place an order. This allows us to manage your orders and wishlist.' },
      { q:'How do I reset my password?', a:'Click "Sign In" and then "Forgot your password?". Enter your email address and we will send you a reset link within a few minutes.' },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:'1px solid var(--cream3)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width:'100%', padding:'18px 0', background:'none', border:'none',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          cursor:'pointer', textAlign:'left', gap:16,
        }}
      >
        <span style={{ fontWeight:500, fontSize:15, color:'var(--charcoal)' }}>{q}</span>
        <span style={{
          fontSize:20, color:'var(--accent)', flexShrink:0,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition:'transform .2s', display:'inline-block',
        }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom:18, fontSize:14, color:'var(--grey2)', lineHeight:1.8 }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activecat, setActiveCat] = useState(0);
  return (
    <div style={{ padding:'60px 0 80px' }}>
      <div className="max-w" style={{ maxWidth:820 }}>

        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ fontSize:12, letterSpacing:4, textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>Support</div>
          <h1 style={{ fontFamily:'var(--ff-serif)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:300 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color:'var(--grey)', marginTop:12 }}>
            Can't find your answer?{' '}
            <span style={{ color:'var(--accent)', cursor:'pointer', textDecoration:'underline' }}
                  onClick={() => window.location.href='/contact'}>
              Contact us
            </span>
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:36 }}>
          {FAQS.map((cat,i) => (
            <button key={cat.category}
              onClick={() => setActiveCat(i)}
              style={{
                padding:'8px 18px', borderRadius:99, border:'1.5px solid',
                borderColor: activecat===i ? 'var(--charcoal)' : 'var(--cream3)',
                background: activecat===i ? 'var(--charcoal)' : 'var(--white)',
                color: activecat===i ? '#fff' : 'var(--grey2)',
                fontSize:13, cursor:'pointer', transition:'all .2s',
              }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ ITEMS */}
        <div style={{ background:'var(--white)', borderRadius:12, padding:'8px 28px', border:'1px solid var(--cream3)' }}>
          {FAQS[activecat].items.map((item,i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

      </div>
    </div>
  );
}