import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import './ActivityLog.css';

const ActivityLog = ({ activities }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!activities || activities.length === 0) {
    return null;
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'created':
        return <AddCircleOutlineIcon fontSize="small" className="activity-icon icon-created" />;
      case 'status_changed':
        return <SwapHorizIcon fontSize="small" className="activity-icon icon-status" />;
      case 'subtask_added':
        return <AddCircleOutlineIcon fontSize="small" className="activity-icon icon-added" />;
      case 'subtask_completed':
        return <CheckCircleOutlineIcon fontSize="small" className="activity-icon icon-completed" />;
      case 'subtask_uncompleted':
        return <CheckCircleOutlineIcon fontSize="small" className="activity-icon icon-uncompleted" />;
      case 'subtask_deleted':
        return <DeleteOutlineIcon fontSize="small" className="activity-icon icon-deleted" />;
      case 'updated':
      case 'priority':
        return <EditIcon fontSize="small" className="activity-icon icon-updated" />;
      default:
        return <HistoryIcon fontSize="small" className="activity-icon icon-default" />;
    }
  };

  const displayedActivities = isExpanded ? activities : activities.slice(0, 3);

  return (
    <div className="activity-log-container">
      <button 
        className="activity-log-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <HistoryIcon fontSize="small" />
        <span>Activity Log ({activities.length})</span>
        <span className={`toggle-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="activity-log-content">
          <div className="activity-timeline">
            {displayedActivities.map((activity, index) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon-wrapper">
                  {getActivityIcon(activity.type)}
                  {index !== displayedActivities.length - 1 && (
                    <div className="activity-line"></div>
                  )}
                </div>
                <div className="activity-details">
                  <p className="activity-message">{activity.message}</p>
                  <span className="activity-time">
                    {formatDistanceToNow(parseISO(activity.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
