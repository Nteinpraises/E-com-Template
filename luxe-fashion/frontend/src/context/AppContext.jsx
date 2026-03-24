import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
const AppContext = createContext();

export function AppProvider({ children }) {

  // ── AUTH STATE ────────────────────────────────
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('luxe_user')); }
    catch { return null; }
  });

  // ── CART STATE ────────────────────────────────
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('luxe_cart')) || []; }
    catch { return []; }
  });

  // ── UI STATE ──────────────────────────────────
  const [cartOpen,    setCartOpen]    = useState(false);
  const [authOpen,    setAuthOpen]    = useState(false);
  const [toasts,      setToasts]      = useState([]);
  const [filterCat,   setFilterCat]   = useState('All');
  const [search,      setSearch]      = useState('');

  // ── PERSIST CART ──────────────────────────────
  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
  }, [cart]);

  // ── PERSIST USER ──────────────────────────────
  useEffect(() => {
    if (user) localStorage.setItem('luxe_user', JSON.stringify(user));
    else      localStorage.removeItem('luxe_user');
  }, [user]);

  // ── AXIOS AUTH HEADER ─────────────────────────
  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // ── TOAST ─────────────────────────────────────
  const toast = useCallback((msg, type = '') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  // ── AUTH FUNCTIONS ────────────────────────────
  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password });
    setUser(data);
    setAuthOpen(false);
    toast(`Welcome back, ${data.name.split(' ')[0]}! 👋`, 'success');
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API}/auth/register`, { name, email, password });
    setUser(data);
    setAuthOpen(false);
    toast(`Welcome to LUXE, ${data.name.split(' ')[0]}! 🎉`, 'success');
    return data;
  };

  const logout = () => {
    setUser(null);
    toast('Logged out');
  };

  const forgotPassword = async (email) => {
    await axios.post(`${API}/auth/forgot-password`, { email });
  };

  // ── WISHLIST FUNCTIONS ────────────────────
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user?.token) {
      axios.get(`${API}/users/wishlist`)
        .then(r => setWishlist(r.data || []))
        .catch(() => setWishlist([]));
    } else {
      setWishlist([]);
    }
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user) { toast('Please sign in to save items', 'error'); return; }
    try {
      await axios.post(`${API}/users/wishlist/${product._id}`);
      setWishlist(w => [...w, product]);
      toast('Saved to wishlist ♥', 'success');
    } catch (e) {
      toast(e.response?.data?.message || 'Could not save item', 'error');
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${API}/users/wishlist/${productId}`);
      setWishlist(w => w.filter(p => {
        if (!p) return false;
        const id = p._id || p;
        return String(id) !== String(productId);
      }));
      toast('Removed from wishlist');
    } catch (e) {
      toast('Could not remove item', 'error');
    }
  };

  const isWishlisted = (productId) => {
    if (!wishlist || !Array.isArray(wishlist) || !productId) return false;
    return wishlist.some(p => {
      if (!p) return false;
      const id = p._id || p;
      return String(id) === String(productId);
    });
  };

  // ── CART FUNCTIONS ────────────────────────────
  const addToCart = useCallback((product, size, color, qty = 1) => {
    if (!size) { toast('Please select a size', 'error'); return; }
    setCart(c => {
      const key = `${product._id}-${size}-${color}`;
      const existing = c.find(i => i.key === key);
      if (existing) {
        return c.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...c, { key, product, size, color, qty }];
    });
    toast('Added to cart ✓', 'success');
    setCartOpen(true);
  }, [toast]);

 const removeFromCart = useCallback((key) => {
    setCart(c => c.filter(i => i.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return;
    setCart(c => c.map(i => i.key === key ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const value = {
    // auth
    user, login, register, logout, forgotPassword,
    // cart
    cart, addToCart, removeFromCart, updateQty, clearCart,
    cartTotal, cartCount,
    // wishlist
    wishlist, addToWishlist, removeFromWishlist, isWishlisted,
    // ui
    cartOpen, setCartOpen,
    authOpen, setAuthOpen,
    toasts, toast,
    // filters
    filterCat, setFilterCat,
    search, setSearch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);