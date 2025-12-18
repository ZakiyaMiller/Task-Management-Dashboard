import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CommentIcon from '@mui/icons-material/Comment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { isToday, isPast, parseISO, format, differenceInDays } from 'date-fns';
import { AVAILABLE_TAGS } from '../../utils/constants';
import { deleteTask } from '../../redux/tasksSlice';
import SubtasksList from '../SubtasksList/SubtasksList';
import ActivityLog from '../ActivityLog/ActivityLog';
import './TaskCard.css';

const TaskCard = ({ task, provided, snapshot, taskStatus, onEditTask }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleEditClick = () => {
    onEditTask(task);
    setShowMenu(false);
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask({ taskId: task.id, status: taskStatus }));
    }
    setShowMenu(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return { bg: '#DFA874', text: '#ffffff' };
      case 'High':
        return { bg: '#D58D49', text: '#ffffff' };
      case 'Completed':
        return { bg: '#83C29D', text: '#ffffff' };
      default:
        return { bg: '#DFA874', text: '#ffffff' };
    }
  };

  const getTagColor = (tagName) => {
    const tag = AVAILABLE_TAGS.find(t => t.name === tagName);
    return tag ? tag.color : '#787486';
  };

  const getDueDateInfo = () => {
    if (!task.dueDate) return null;

    const dueDate = parseISO(task.dueDate);
    const today = new Date();
    const daysDiff = differenceInDays(dueDate, today);

    if (isPast(dueDate) && !isToday(dueDate)) {
      return {
        label: `${Math.abs(daysDiff)} day${Math.abs(daysDiff) > 1 ? 's' : ''} overdue`,
        className: 'due-overdue'
      };
    } else if (isToday(dueDate)) {
      return {
        label: 'Due today',
        className: 'due-today'
      };
    } else if (daysDiff === 1) {
      return {
        label: 'Due tomorrow',
        className: 'due-tomorrow'
      };
    } else if (daysDiff <= 7) {
      return {
        label: `Due in ${daysDiff} days`,
        className: 'due-soon'
      };
    } else {
      return {
        label: format(dueDate, 'MMM dd'),
        className: 'due-later'
      };
    }
  };

  const dueDateInfo = getDueDateInfo();

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      className={`task-card ${snapshot?.isDragging ? 'dragging' : ''}`}
    >
      <div className="task-header">
        <span 
          className="priority-badge" 
          style={{ 
            backgroundColor: getPriorityColor(task.priority).bg,
            color: getPriorityColor(task.priority).text
          }}
        >
          {task.priority}
        </span>
        <div className="task-menu-container" ref={menuRef}>
          <button 
            className="task-menu" 
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreHorizIcon fontSize="small" />
          </button>
          {showMenu && (
            <div className="task-menu-dropdown">
              <button 
                className="menu-item" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick();
                }}
              >
                <EditOutlinedIcon fontSize="small" />
                <span>Edit Task</span>
              </button>
              <button 
                className="menu-item delete-item" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask();
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
                <span>Delete Task</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>

      {(task.tags?.length > 0 || task.effort) && (
        <div className="task-metadata">
          {task.tags?.length > 0 && (
            <div className="task-tags">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="task-tag"
                  style={{
                    backgroundColor: `${getTagColor(tag)}15`,
                    color: getTagColor(tag),
                    borderColor: `${getTagColor(tag)}40`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {task.effort && (
            <div className="task-effort">
              <AccessTimeIcon fontSize="small" />
              <span>{task.effort}</span>
            </div>
          )}
        </div>
      )}

      {dueDateInfo && (
        <div className={`due-date-badge ${dueDateInfo.className}`}>
          <CalendarTodayIcon fontSize="small" className="due-date-icon" />
          <span>{dueDateInfo.label}</span>
        </div>
      )}

      <SubtasksList task={task} taskStatus={taskStatus} />

      <div className="task-footer">
        <div className="task-meta">
          <div className="avatar-stack">
            {task.assignees.slice(0, 3).map((avatar, index) => (
              <img 
                key={index}
                src={avatar} 
                alt={`Assignee ${index + 1}`} 
                className="task-avatar"
                style={{ zIndex: 3 - index }}
              />
            ))}
          </div>

          <div className="task-stats">
            <div className="stat-item">
              <CommentIcon className="stat-icon" fontSize="small" />
              <span className="stat-count">{task.comments} comments</span>
            </div>
            <div className="stat-item">
              <AttachFileIcon className="stat-icon" fontSize="small" />
              <span className="stat-count">{task.files} files</span>
            </div>
          </div>
        </div>
      </div>

      <ActivityLog activities={task.activityLog || []} />
    </div>
  );
};

export default TaskCard;
