import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function BackButton({ label = 'Back', fallbackTo = '/' }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(fallbackTo);
  };

  return (
    <button type="button" className="back-button" onClick={handleGoBack} aria-label={label}>
      <span className="back-button-icon">
        <ArrowLeft size={18} />
      </span>
      <span>{label}</span>
    </button>
  );
}

export default BackButton;
