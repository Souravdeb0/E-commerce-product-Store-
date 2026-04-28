import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Loader2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import BackButton from '../components/BackButton';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-state">
        <Loader2 className="spinner" size={48} />
        <p>Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state">
        <h2>Product not found.</h2>
        <Link to="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <BackButton label="Back to Store" fallbackTo="/" />

      <div className="product-detail-container">
        <div className="product-detail-image-wrapper">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        
        <div className="product-detail-info">
          <span className="product-category tag">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.round(product.rating.rate) ? "currentColor" : "none"} 
                  className={i < Math.round(product.rating.rate) ? "star-filled" : "star-empty"}
                />
              ))}
            </div>
            <span className="rating-count">({product.rating.count} reviews)</span>
          </div>

          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <div className="product-description-container">
            <h3>Description</h3>
            <p className="product-description">{product.description}</p>
          </div>

          <div className="product-actions">
            <button 
              className="btn-primary add-to-cart-large"
              onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            >
              <ShoppingBag size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
