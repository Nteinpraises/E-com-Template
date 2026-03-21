import { Routes, Route } from 'react-router-dom';
import Navbar       from './components/Navbar';
import CartDrawer   from './components/CartDrawer';
import AuthModal    from './components/AuthModal';
import Toasts       from './components/Toasts';
import Footer       from './components/Footer';
import HomePage     from './pages/HomePage';
import ShopPage     from './pages/ShopPage';
import ProductPage  from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage    from './pages/AdminPage';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"            element={<HomePage />}    />
          <Route path="/shop"        element={<ShopPage />}    />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout"    element={<CheckoutPage />}/>
          <Route path="/admin"       element={<AdminPage />}   />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <AuthModal />
      <Toasts />
    </div>
  );
}