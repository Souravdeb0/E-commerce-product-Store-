import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { state, dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartItemCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛍️</span>
          <span className="brand-text">LumiStore</span>
        </Link>
        
        <div className="navbar-actions">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input"
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className="icon-button close-search">
                X
              </button>
            </form>
          ) : (
            <button className="icon-button" onClick={() => setIsSearchOpen(true)}>
              <Search size={20} />
            </button>
          )}
          
          <Link to={user ? "/profile" : "/login"} className="icon-button">
            <User size={20} />
          </Link>

          <button 
            className="icon-button cart-button"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
