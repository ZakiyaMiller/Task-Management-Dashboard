import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { INITIAL_TASKS } from '../utils/constants';

const initialState = {
  tasks: INITIAL_TASKS,
  filters: {
    priority: 'all',
    searchTerm: ''
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { status, task } = action.payload;
      const newTask = {
        ...task,
        id: uuidv4(),
        status,
        comments: 0,
        files: 0,
        assignees: task.assignees || [],
        dueDate: task.dueDate || null,
        subtasks: task.subtasks || [],
        tags: task.tags || [],
        effort: task.effort || null,
        activityLog: [
          {
            id: uuidv4(),
            type: 'created',
            timestamp: new Date().toISOString(),
            message: 'Task created'
          }
        ]
      };
      state.tasks[status].push(newTask);
    },
    
    moveTask: (state, action) => {
      const { sourceStatus, destinationStatus, sourceIndex, destinationIndex } = action.payload;
      
      // Remove from source
      const [movedTask] = state.tasks[sourceStatus].splice(sourceIndex, 1);
      
      // Update task status
      const oldStatus = movedTask.status;
      movedTask.status = destinationStatus;
      
      // Log activity
      if (!movedTask.activityLog) movedTask.activityLog = [];
      movedTask.activityLog.unshift({
        id: uuidv4(),
        type: 'status_changed',
        timestamp: new Date().toISOString(),
        message: `Status changed from ${oldStatus} to ${destinationStatus}`
      });
      
      // Add to destination
      state.tasks[destinationStatus].splice(destinationIndex, 0, movedTask);
    },
    
    deleteTask: (state, action) => {
      const { taskId, status } = action.payload;
      state.tasks[status] = state.tasks[status].filter(task => task.id !== taskId);
    },
    
    updateTask: (state, action) => {
      const { taskId, status, updates } = action.payload;
      const taskIndex = state.tasks[status].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = state.tasks[status][taskIndex];
        if (!task.activityLog) task.activityLog = [];
        
        // Log specific updates
        Object.keys(updates).forEach(key => {
          if (key !== 'activityLog') {
            let message = '';
            if (key === 'priority') {
              message = `Priority changed to ${updates[key]}`;
            } else if (key === 'dueDate') {
              message = `Due date updated`;
            } else if (key === 'assignees') {
              message = `Assignees updated`;
            } else {
              message = `${key} updated`;
            }
            task.activityLog.unshift({
              id: uuidv4(),
              type: 'updated',
              timestamp: new Date().toISOString(),
              message
            });
          }
        });
        
        state.tasks[status][taskIndex] = {
          ...task,
          ...updates
        };
      }
    },
    
    setFilter: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    
    reorderTasks: (state, action) => {
      const { status, sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.tasks[status].splice(sourceIndex, 1);
      state.tasks[status].splice(destinationIndex, 0, removed);
    },
    
    addSubtask: (state, action) => {
      const { taskId, status, text } = action.payload;
      const taskIndex = state.tasks[status].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = state.tasks[status][taskIndex];
        // Initialize subtasks array if it doesn't exist
        if (!task.subtasks) task.subtasks = [];
        if (!task.activityLog) task.activityLog = [];
        
        const newSubtask = {
          id: uuidv4(),
          text,
          completed: false
        };
        task.subtasks.push(newSubtask);
        
        // Log activity
        task.activityLog.unshift({
          id: uuidv4(),
          type: 'subtask_added',
          timestamp: new Date().toISOString(),
          message: `Subtask added: "${text}"`
        });
      }
    },
    
    toggleSubtask: (state, action) => {
      const { taskId, status, subtaskId } = action.payload;
      const taskIndex = state.tasks[status].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = state.tasks[status][taskIndex];
        if (!task.activityLog) task.activityLog = [];
        
        const subtaskIndex = task.subtasks.findIndex(
          subtask => subtask.id === subtaskId
        );
        if (subtaskIndex !== -1) {
          const subtask = task.subtasks[subtaskIndex];
          subtask.completed = !subtask.completed;
          
          // Log activity
          task.activityLog.unshift({
            id: uuidv4(),
            type: subtask.completed ? 'subtask_completed' : 'subtask_uncompleted',
            timestamp: new Date().toISOString(),
            message: `Subtask ${subtask.completed ? 'completed' : 'uncompleted'}: "${subtask.text}"`
          });
        }
      }
    },
    
    deleteSubtask: (state, action) => {
      const { taskId, status, subtaskId } = action.payload;
      const taskIndex = state.tasks[status].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = state.tasks[status][taskIndex];
        if (!task.activityLog) task.activityLog = [];
        
        const deletedSubtask = task.subtasks.find(st => st.id === subtaskId);
        task.subtasks = task.subtasks.filter(
          subtask => subtask.id !== subtaskId
        );
        
        // Log activity
        if (deletedSubtask) {
          task.activityLog.unshift({
            id: uuidv4(),
            type: 'subtask_deleted',
            timestamp: new Date().toISOString(),
            message: `Subtask deleted: "${deletedSubtask.text}"`
          });
        }
      }
    }
  }
});

export const {
  addTask,
  moveTask,
  deleteTask,
  updateTask,
  setFilter,
  reorderTasks,
  addSubtask,
  toggleSubtask,
  deleteSubtask
} = tasksSlice.actions;

export default tasksSlice.reducer;
