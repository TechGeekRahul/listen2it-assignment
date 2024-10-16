import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 

const ProfileIcon = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    sessionStorage.removeItem("userToken"); 
    
    navigate('/logout'); 
  };

  return (
    <div className="profile-icon" onClick={handleLogout} style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}>
      <FontAwesomeIcon icon={faUserCircle} size="2x" />
    </div>
  );
};

export default ProfileIcon;