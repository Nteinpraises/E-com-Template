import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout, cartCount, setCartOpen, setAuthOpen, search, setSearch, setFilterCat, wishlist } = useApp();

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (location.pathname !== '/shop') navigate('/shop');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <div className="nav-logo" onClick={() => navigate('/')}>LUXE</div>

        {/* SEARCH */}
        <div className="search-bar" style={{ margin: '0 24px' }}>
          <Icon name="search" size={15} color="var(--stone)" />
          <input
            placeholder="Search suits, shirts, jeans…"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* NAV LINKS */}
        <div className="nav-links">
          <button className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>
            Home
          </button>
          <button className={`nav-link ${isActive('/shop') ? 'active' : ''}`} onClick={() => navigate('/shop')}>
            Shop
          </button>
          {user?.role === 'admin' && (
            <button
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
              onClick={() => navigate('/admin')}
              style={{ color: 'var(--accent)' }}
            >
              Admin
            </button>
          )}
        </div>

        {/* ACTIONS */}
        <div className="nav-actions">
          {user ? (
            <>
              <span style={{ fontSize: 13, color: 'var(--grey2)', marginRight: 4 }}>
                {user.name.split(' ')[0]}
              </span>
              <button className="icon-btn" onClick={logout} title="Logout">
                <Icon name="logout" size={17} />
              </button>
            </>
          ) : (
            <button className="icon-btn" onClick={() => setAuthOpen(true)} title="Login">
              <Icon name="user" size={17} />
            </button>
          )}
          {/* WISHLIST ICON — only show when logged in */}
          {user && (
            <button
              className="icon-btn"
              onClick={() => navigate('/wishlist')}
              title="My Wishlist"
              style={{ position:'relative' }}
            >
              <span style={{ fontSize:17 }}>♡</span>
              {wishlist.length > 0 && (
                <span className="badge">{wishlist.length}</span>
              )}
            </button>
          )}

          <button className="icon-btn cart-badge" onClick={() => setCartOpen(true)}>
            <Icon name="cart" size={17} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>

      </div>
    </nav>
  );
}