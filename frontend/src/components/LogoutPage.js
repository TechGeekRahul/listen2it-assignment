// src/components/LogoutPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

 
  const handleLogout = () => {
    
    sessionStorage.removeItem("userToken"); 

    
    navigate('/'); 
  };

  return (
    <div className="logout-page" style={{ textAlign: 'center', padding: '50px' }}>

      <button 
        onClick={handleLogout} 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4ade80', 
          border: 'none',
          color: 'white',
          borderRadius: '5px'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutPage;