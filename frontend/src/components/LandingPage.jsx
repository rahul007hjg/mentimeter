import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw', // Full width
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#111827',
        textAlign: 'center',
      }}>
        🚀 Quiz Master
      </h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1200px',
        gap: '40px',
      }}>
        {/* User Section */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>User</h2>
          <button onClick={() => navigate('/user/signup')} style={buttonFullWidth}>
            Sign Up
          </button>
          <button onClick={() => navigate('/user/signin')} style={buttonFullWidth}>
            Sign In
          </button>
        </div>

        {/* Admin Section */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>Admin</h2>
          <button onClick={() => navigate('/admin/signup')} style={buttonFullWidth}>
            Sign Up
          </button>
          <button onClick={() => navigate('/admin/signin')} style={buttonFullWidth}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '30px 30px',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  display: 'flex',
  
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '300px',
  boxSizing: 'border-box',
  
};

const sectionTitle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '20px',
  color: '#1f2937',
  textAlign: 'center',
};

const buttonFullWidth = {
  padding: '12px 20px',
  backgroundColor: '#f59e0b',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  width: '100%',
  marginTop: '10px',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
};
