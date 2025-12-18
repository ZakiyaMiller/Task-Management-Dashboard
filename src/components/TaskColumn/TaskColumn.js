import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '../TaskCard/TaskCard';
import './TaskColumn.css';

const TaskColumn = ({ column, tasks, onAddTask, onEditTask }) => {
  return (
    <div className="task-column">
      <div className="column-header">
        <div className="column-title-section">
          <div 
            className="column-indicator" 
            style={{ backgroundColor: column.color }}
          ></div>
          <h2 className="column-title">{column.title}</h2>
          <span className="column-count">{tasks.length}</span>
        </div>
        <button className="add-task-btn" onClick={() => onAddTask(column.id)}>
          <AddIcon fontSize="small" />
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`tasks-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <TaskCard
                    task={task}
                    provided={provided}
                    snapshot={snapshot}
                    taskStatus={column.id}
                    onEditTask={onEditTask}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
