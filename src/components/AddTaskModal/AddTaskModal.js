import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../redux/tasksSlice';
import { AVATARS, AVAILABLE_TAGS, EFFORT_OPTIONS } from '../../utils/constants';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, status, editTask, existingTask }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    assignees: [],
    dueDate: '',
    subtasks: [],
    tags: [],
    effort: ''
  });

  const [subtaskInput, setSubtaskInput] = useState('');

  useEffect(() => {
    if (existingTask && editTask) {
      setFormData({
        title: existingTask.title || '',
        description: existingTask.description || '',
        priority: existingTask.priority || 'Low',
        assignees: existingTask.assignees || [],
        dueDate: existingTask.dueDate || '',
        subtasks: existingTask.subtasks || [],
        tags: existingTask.tags || [],
        effort: existingTask.effort || ''
      });
      setSubtaskInput('');
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Low',
        assignees: [],
        dueDate: '',
        subtasks: [],
        tags: [],
        effort: ''
      });
      setSubtaskInput('');
    }
  }, [existingTask, editTask, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      if (editTask && existingTask) {
        dispatch(updateTask({
          taskId: existingTask.id,
          status: existingTask.status,
          updates: formData
        }));
      } else {
        dispatch(addTask({
          status,
          task: formData
        }));
      }
      setFormData({
        title: '',
        description: '',
        priority: 'Low',
        assignees: [],
        dueDate: '',
        subtasks: [],
        tags: [],
        effort: ''
      });
      setSubtaskInput('');
      onClose();
    }
  };

  const toggleAssignee = (avatar) => {
    setFormData(prev => ({
      ...prev,
      assignees: prev.assignees.includes(avatar)
        ? prev.assignees.filter(a => a !== avatar)
        : [...prev.assignees, avatar]
    }));
  };

  const addSubtask = () => {
    if (subtaskInput.trim()) {
      setFormData(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, { text: subtaskInput.trim(), completed: false }]
      }));
      setSubtaskInput('');
    }
  };

  const removeSubtask = (index) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== index)
    }));
  };

  const handleSubtaskKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubtask();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editTask ? 'Edit Task' : 'Add New Task'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Task Title*</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="High">High</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="date-input"
            />
          </div>

          <div className="form-group">
            <label>Assign to Team Members</label>
            <div className="assignees-grid">
              {AVATARS.map((avatar, index) => (
                <div
                  key={index}
                  className={`assignee-option ${formData.assignees.includes(avatar) ? 'selected' : ''}`}
                  onClick={() => toggleAssignee(avatar)}
                >
                  <img src={avatar} alt={`Team member ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Subtasks</label>
            <div className="subtasks-input-wrapper">
              <input
                type="text"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                onKeyPress={handleSubtaskKeyPress}
                placeholder="Add a subtask and press Enter"
                className="subtask-input"
              />
              <button type="button" onClick={addSubtask} className="add-subtask-btn">
                +
              </button>
            </div>
            {formData.subtasks.length > 0 && (
              <div className="subtasks-list">
                {formData.subtasks.map((subtask, index) => (
                  <div key={index} className="subtask-item">
                    <span>{subtask.text}</span>
                    <button
                      type="button"
                      onClick={() => removeSubtask(index)}
                      className="remove-subtask-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tags-grid">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag.name}
                  type="button"
                  className={`tag-option ${formData.tags.includes(tag.name) ? 'selected' : ''}`}
                  style={{
                    borderColor: formData.tags.includes(tag.name) ? tag.color : '#E0E0E0',
                    backgroundColor: formData.tags.includes(tag.name) ? `${tag.color}15` : 'transparent',
                    color: formData.tags.includes(tag.name) ? tag.color : '#787486'
                  }}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      tags: prev.tags.includes(tag.name)
                        ? prev.tags.filter(t => t !== tag.name)
                        : [...prev.tags, tag.name]
                    }));
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Effort Estimate</label>
            <select
              value={formData.effort}
              onChange={(e) => setFormData({ ...formData, effort: e.target.value })}
              className="effort-select"
            >
              <option value="">Select estimate...</option>
              {EFFORT_OPTIONS.map((effort) => (
                <option key={effort} value={effort}>{effort}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {editTask ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
