import React, { useContext } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function CartDrawer() {
  const { state, dispatch } = useContext(CartContext);
  const { cartItems, isCartOpen } = state;
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    dispatch({ type: 'TOGGLE_CART' });
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="cart-backdrop"
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
        />
      )}

      {/* Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button 
            className="close-button"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} className="empty-icon" />
              <p>Your cart is empty.</p>
              <button 
                className="btn-primary"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h4 className="item-title">{item.title}</h4>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => dispatch({ 
                            type: 'UPDATE_QUANTITY', 
                            payload: { id: item.id, quantity: item.quantity - 1 } 
                          })}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => dispatch({ 
                            type: 'UPDATE_QUANTITY', 
                            payload: { id: item.id, quantity: item.quantity + 1 } 
                          })}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        className="remove-button"
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <p className="tax-note">Shipping and taxes calculated at checkout.</p>
            <button 
              className="btn-primary checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
