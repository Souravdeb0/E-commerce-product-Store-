import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to detail page if button is inside a link
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title" title={product.title}>
            {product.title}
          </h3>
        </Link>
        <div className="product-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          <button 
            className="btn-icon add-cart-btn" 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
