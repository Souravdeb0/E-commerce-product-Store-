import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, CreditCard, HelpCircle, LogOut, User, Bell, Shield, ChevronRight, Mail } from 'lucide-react';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const [activeTab, setActiveTab] = useState('settings');
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <div className="profile-section-content">
            <h2 style={{ marginBottom: '1.5rem' }}>Account Settings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="menu-item active" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Bell size={20} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Notifications</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Manage your alert preferences</div>
                  </div>
                </div>
                <ChevronRight size={18} />
              </div>
              <div className="menu-item active" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Shield size={20} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Security & Privacy</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Two-factor authentication and data usage</div>
                  </div>
                </div>
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        );
      case 'pay':
        return (
          <div className="profile-section-content">
            <h2 style={{ marginBottom: '1.5rem' }}>Payment Methods</h2>
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '2px dashed var(--border-color)' }}>
              <CreditCard size={40} style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>No payment methods saved yet.</p>
              <button className="btn-primary" onClick={() => navigate('/checkout')}>Add New Card</button>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="profile-section-content">
            <h2 style={{ marginBottom: '1.5rem' }}>Help & Customer Service</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Common Questions</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <li style={{ marginBottom: '0.5rem' }}>How do I track my order?</li>
                  <li style={{ marginBottom: '0.5rem' }}>What is your return policy?</li>
                  <li style={{ marginBottom: '0.5rem' }}>How do I contact support?</li>
                </ul>
              </div>
              <button className="btn-primary" style={{ background: 'var(--secondary-color)' }}>
                <Mail size={18} /> Contact Support
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <BackButton label="Back" fallbackTo="/" />
      <div className="page-header">
        <h1 className="page-title">My Account</h1>
        <p className="page-subtitle">Manage your profile and preferences</p>
      </div>

      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-user-info">
            <div className="profile-avatar">{getInitials(user?.name)}</div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{user?.name || 'User'}</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{user?.email || 'user@example.com'}</p>
          </div>

          <nav className="profile-menu">
            <div 
              className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`} 
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} /> Settings
            </div>
            <div 
              className={`menu-item ${activeTab === 'pay' ? 'active' : ''}`} 
              onClick={() => setActiveTab('pay')}
            >
              <CreditCard size={20} /> Pay
            </div>
            <div 
              className={`menu-item ${activeTab === 'help' ? 'active' : ''}`} 
              onClick={() => setActiveTab('help')}
            >
              <HelpCircle size={20} /> Help & Customer Service
            </div>
            <div className="menu-item logout" onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </div>
          </nav>
        </aside>

        <main className="profile-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Profile;
