import { Routes, Route } from 'react-router-dom';
import Navbar            from './components/Navbar';
import CartDrawer        from './components/CartDrawer';
import AuthModal         from './components/AuthModal';
import Toasts            from './components/Toasts';
import Footer            from './components/Footer';

// Pages
import HomePage          from './pages/HomePage';
import ShopPage          from './pages/ShopPage';
import ProductPage       from './pages/ProductPage';
import CheckoutPage      from './pages/CheckoutPage';
import AdminPage         from './pages/AdminPage';
import WishlistPage      from './pages/WishlistPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Footer Pages
import AboutPage          from './pages/AboutPage';
import ContactPage        from './pages/ContactPage';
import FAQPage            from './pages/FAQPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import ReturnsPage        from './pages/ReturnsPage';
import SizeGuidePage      from './pages/SizeGuidePage';
import TrackOrderPage     from './pages/TrackOrderPage';
import PrivacyPolicyPage  from './pages/PrivacyPolicyPage';
import TermsPage          from './pages/TermsPage';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          {/* Main */}
          <Route path="/"                        element={<HomePage />}          />
          <Route path="/shop"                    element={<ShopPage />}          />
          <Route path="/product/:id"             element={<ProductPage />}       />
          <Route path="/checkout"                element={<CheckoutPage />}      />
          <Route path="/admin"                   element={<AdminPage />}         />
          <Route path="/wishlist"                element={<WishlistPage />}      />
          <Route path="/reset-password/:token"   element={<ResetPasswordPage />} />

          {/* Footer pages */}
          <Route path="/about"                   element={<AboutPage />}          />
          <Route path="/contact"                 element={<ContactPage />}        />
          <Route path="/faq"                     element={<FAQPage />}            />
          <Route path="/shipping-policy"         element={<ShippingPolicyPage />} />
          <Route path="/returns"                 element={<ReturnsPage />}        />
          <Route path="/size-guide"              element={<SizeGuidePage />}      />
          <Route path="/track-order"             element={<TrackOrderPage />}     />
          <Route path="/privacy-policy"          element={<PrivacyPolicyPage />}  />
          <Route path="/terms"                   element={<TermsPage />}          />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <Toasts />
    </div>
  );
}