import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSubtask, toggleSubtask, deleteSubtask } from '../../redux/tasksSlice';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './SubtasksList.css';

const SubtasksList = ({ task, taskStatus }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const handleToggle = (subtaskId) => {
    dispatch(toggleSubtask({
      taskId: task.id,
      status: taskStatus,
      subtaskId
    }));
  };

  const handleDelete = (subtaskId) => {
    dispatch(deleteSubtask({
      taskId: task.id,
      status: taskStatus,
      subtaskId
    }));
  };

  const handleAdd = () => {
    if (newSubtaskText.trim()) {
      dispatch(addSubtask({
        taskId: task.id,
        status: taskStatus,
        text: newSubtaskText.trim()
      }));
      setNewSubtaskText('');
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewSubtaskText('');
    }
  };

  const completedCount = task.subtasks?.filter(st => st.completed).length || 0;
  const totalCount = task.subtasks?.length || 0;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="subtasks-container">
      {totalCount > 0 && (
        <>
          <div className="subtasks-header">
            <span className="subtasks-title">Subtasks</span>
            <span className="subtasks-count">{completedCount}/{totalCount}</span>
          </div>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="subtasks-list">
            {task.subtasks.map((subtask) => (
              <div key={subtask.id} className="subtask-item-card">
                <div
                  className="subtask-checkbox"
                  onClick={() => handleToggle(subtask.id)}
                >
                  {subtask.completed ? (
                    <CheckBoxIcon className="checkbox-icon checked" />
                  ) : (
                    <CheckBoxOutlineBlankIcon className="checkbox-icon" />
                  )}
                </div>
                <span className={`subtask-text ${subtask.completed ? 'completed' : ''}`}>
                  {subtask.text}
                </span>
                <button
                  className="subtask-delete"
                  onClick={() => handleDelete(subtask.id)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {isAdding ? (
        <div className="subtask-add-input">
          <input
            type="text"
            value={newSubtaskText}
            onChange={(e) => setNewSubtaskText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter subtask..."
            autoFocus
          />
          <button onClick={handleAdd} className="confirm-btn">✓</button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewSubtaskText('');
            }}
            className="cancel-btn-subtask"
          >
            ✕
          </button>
        </div>
      ) : (
        <button className="add-subtask-button" onClick={() => setIsAdding(true)}>
          <AddIcon fontSize="small" />
          <span>Add Subtask</span>
        </button>
      )}
    </div>
  );
};

export default SubtasksList;
