import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AppsIcon from '@mui/icons-material/Apps';
import './Sidebar.css';

const Sidebar = () => {
  const [activeProject, setActiveProject] = useState('Mobile App');
  
  const projects = [
    { name: 'Mobile App', color: '#5030E5', active: true },
    { name: 'Website Redesign', color: '#FFA500', active: false },
    { name: 'Design System', color: '#E0E0E0', active: false },
    { name: 'Wireframes', color: '#5030E5', active: false }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <AppsIcon className="logo-icon" sx={{ color: '#5030E5' }} />
          <span className="logo-text">Project M.</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item">
          <HomeIcon className="nav-icon" fontSize="small" />
          <span className="nav-text">Home</span>
        </div>
        <div className="nav-item">
          <MessageIcon className="nav-icon" fontSize="small" />
          <span className="nav-text">Messages</span>
        </div>
        <div className="nav-item">
          <TaskAltIcon className="nav-icon" fontSize="small" />
          <span className="nav-text">Tasks</span>
        </div>
        <div className="nav-item">
          <PeopleIcon className="nav-icon" fontSize="small" />
          <span className="nav-text">Members</span>
        </div>
        <div className="nav-item">
          <SettingsIcon className="nav-icon" fontSize="small" />
          <span className="nav-text">Settings</span>
        </div>
      </nav>

      <div className="sidebar-section">
        <div className="section-header">
          <span className="section-title">MY PROJECTS</span>
          <button className="add-btn"><AddIcon fontSize="small" /></button>
        </div>
        
        <div className="projects-list">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`project-item ${project.name === activeProject ? 'active' : ''}`}
              onClick={() => setActiveProject(project.name)}
            >
              <span 
                className="project-dot" 
                style={{ backgroundColor: project.color }}
              ></span>
              <span className="project-name">{project.name}</span>
              <span className="project-menu"><MoreHorizIcon fontSize="small" /></span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-thoughts">
        <div className="thoughts-icon"><LightbulbIcon sx={{ fontSize: 48 }} /></div>
        <h4>Thoughts Time</h4>
        <p>We don't have any notice for you, till then you can share your thoughts with your peers.</p>
        <button className="thoughts-btn">Write a message</button>
      </div>
    </div>
  );
};

export default Sidebar;
