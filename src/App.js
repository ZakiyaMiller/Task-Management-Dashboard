import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { moveTask, reorderTasks, setFilter } from './redux/tasksSlice';
import { useAuth } from './contexts/AuthContext';
import { COLUMNS } from './utils/constants';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import ProjectHeader from './components/ProjectHeader/ProjectHeader';
import TaskColumn from './components/TaskColumn/TaskColumn';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import NotificationBanner from './components/NotificationBanner/NotificationBanner';
import Login from './components/Login/Login';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { tasks, filters } = useSelector((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { currentUser, loading } = useAuth();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // If reordering within the same column
    if (source.droppableId === destination.droppableId) {
      dispatch(reorderTasks({
        status: source.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }));
    } else {
      // Moving to a different column
      dispatch(moveTask({
        taskId: draggableId,
        sourceStatus: source.droppableId,
        destinationStatus: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }));
    }
  };

  const handleAddTask = (status) => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleFilterChange = (priority) => {
    dispatch(setFilter({ priority }));
  };

  const getFilteredTasks = (status) => {
    let filteredTasks = tasks[status] || [];
    
    if (filters.priority && filters.priority !== 'all') {
      filteredTasks = filteredTasks.filter(
        task => task.priority === filters.priority
      );
    }
    
    return filteredTasks;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard">
          <ProjectHeader onFilterChange={handleFilterChange} />
          <NotificationBanner />
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="columns-container">
              {COLUMNS.map((column) => (
                <TaskColumn
                  key={column.id}
                  column={column}
                  tasks={getFilteredTasks(column.id)}
                  onAddTask={handleAddTask}
                  onEditTask={handleEditTask}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={selectedStatus}
      />

      <AddTaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setTaskToEdit(null);
        }}
        status={taskToEdit?.status}
        editTask={true}
        existingTask={taskToEdit}
      />
    </div>
  );
}

export default App;
