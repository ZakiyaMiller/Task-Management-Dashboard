import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import TuneIcon from '@mui/icons-material/Tune';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { AVATARS } from '../../utils/constants';
import './ProjectHeader.css';

const ProjectHeader = ({ onFilterChange }) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const userAvatars = [
    AVATARS[0],
    AVATARS[1],
    AVATARS[2],
    AVATARS[3]
  ];

  return (
    <div className="project-header">
      <div className="project-header-row-1">
        <div className="project-title-section">
          <h1 className="project-title">Mobile App</h1>
          <button className="project-icon-btn">
            <EditIcon fontSize="small" />
          </button>
          <button className="project-icon-btn">
            <LinkIcon fontSize="small" />
          </button>
        </div>

        <div className="project-actions-right">
          <button className="invite-btn">
            <AddIcon fontSize="small" />
            <span>Invite</span>
          </button>

          <div className="avatar-group">
            {userAvatars.map((avatar, index) => (
              <img 
                key={index}
                src={avatar} 
                alt={`Team Member ${index + 1}`} 
                className="project-avatar"
              />
            ))}
            <div className="avatar-more">+1</div>
          </div>
        </div>
      </div>

      <div className="project-header-row-2">
        <div className="project-controls-left">
          <button className="project-btn" onClick={() => setShowFilterMenu(!showFilterMenu)}>
            <TuneIcon fontSize="small" />
            <span>Filter</span>
            <KeyboardArrowDownIcon fontSize="small" />
          </button>
          
          <button className="project-btn">
            <CalendarTodayIcon fontSize="small" />
            <span>Today</span>
            <KeyboardArrowDownIcon fontSize="small" />
          </button>
        </div>

        <div className="project-controls-right">
          <button className="share-btn">
            <FileUploadIcon fontSize="small" />
            <span>Share</span>
          </button>

          <button className="view-btn view-btn-active">
            <ViewAgendaIcon fontSize="small" />
          </button>

          <button className="view-btn">
            <ViewColumnIcon fontSize="small" />
          </button>
        </div>
      </div>

      {showFilterMenu && (
        <div className="project-filter-menu">
          <h4>Filter by Priority</h4>
          <button onClick={() => { onFilterChange('all'); setShowFilterMenu(false); }}>All</button>
          <button onClick={() => { onFilterChange('Low'); setShowFilterMenu(false); }}>Low</button>
          <button onClick={() => { onFilterChange('High'); setShowFilterMenu(false); }}>High</button>
          <button onClick={() => { onFilterChange('Completed'); setShowFilterMenu(false); }}>Completed</button>
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
