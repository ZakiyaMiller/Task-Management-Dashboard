import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';
import { PROFILE_AVATAR } from '../../utils/constants';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
    }
  };

  return (
    <div className="header">
      <div className="header-center">
        <div className="search-bar">
          <SearchIcon className="search-icon" fontSize="small" />
          <input 
            type="text" 
            placeholder="Search for anything..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="header-icons-group">
          <button className="header-icon-btn">
            <CalendarTodayIcon sx={{ fontSize: 24 }} />
          </button>
          
          <button className="header-icon-btn">
            <QuestionAnswerOutlinedIcon sx={{ fontSize: 24 }} />
          </button>
          
          <button className="header-icon-btn">
            <NotificationsNoneIcon sx={{ fontSize: 24 }} />
          </button>
        </div>

        <div className="user-profile">
          <div className="user-info">
            <div className="user-name">{currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}</div>
            <div className="user-location">{currentUser?.email || 'user@example.com'}</div>
          </div>
          <img src={currentUser?.photoURL || PROFILE_AVATAR} alt="User" className="user-avatar" />
        </div>
        
        <button onClick={handleLogout} className="logout-btn" title="Logout">
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;
