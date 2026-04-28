import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { state, dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const cartItemCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛍️</span>
          <span className="brand-text">LumiStore</span>
        </Link>
        
        <div className="navbar-actions">
          <button className="icon-button">
            <Search size={20} />
          </button>
          
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
