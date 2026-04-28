import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

function Checkout() {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total > 100 ? 0 : 15;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment successful! Thank you for your order.');
    dispatch({ type: 'CLEAR_CART' });
    navigate('/');
  };

  if (state.cartItems.length === 0) {
    return (
      <div className="empty-state">
        <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
        <p style={{ marginBottom: '2rem' }}>Add some items to your cart before checking out.</p>
        <Link to="/" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <BackButton label="Back to Shopping" fallbackTo="/" />
      
      <div className="page-header" style={{ textAlign: 'left' }}>
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">Complete your order by providing your shipping and payment details.</p>
      </div>

      <div className="checkout-grid">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit}>
            <section className="checkout-section">
              <h2><Truck size={20} /> Shipping Information</h2>
              <div className="auth-form" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="fullName" placeholder="John Doe" required onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Shipping Address</label>
                  <input name="address" placeholder="123 Street Name" required onChange={handleInputChange} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>City</label>
                    <input name="city" placeholder="New York" required onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input name="zip" placeholder="10001" required onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2><CreditCard size={20} /> Payment Details</h2>
              <div className="auth-form" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Card Number</label>
                  <input name="cardNumber" placeholder="0000 0000 0000 0000" required onChange={handleInputChange} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input name="expiry" placeholder="MM/YY" required onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input name="cvc" placeholder="123" required onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </section>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}>
              <ShieldCheck size={20} /> Pay ${grandTotal.toFixed(2)}
            </button>
          </form>
        </div>

        <aside className="order-summary-container">
          <div className="order-summary-card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Order Summary</h2>
            <div className="summary-items" style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
              {state.cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Qty: {item.quantity} × ${item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '1.5rem', textAlign: 'center' }}>
              Secure checkout powered by Stripe
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
