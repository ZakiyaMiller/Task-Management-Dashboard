import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isToday, isPast, parseISO, differenceInDays } from 'date-fns';
import './NotificationBanner.css';

const NotificationBanner = () => {
  const tasks = useSelector(state => state.tasks.tasks);

  const notifications = useMemo(() => {
    const alerts = [];
    const allTasks = [...tasks.todo, ...tasks.inProgress];
    const today = new Date();

    allTasks.forEach(task => {
      if (!task.dueDate) return;

      const dueDate = parseISO(task.dueDate);
      
      if (isPast(dueDate) && !isToday(dueDate)) {
        const daysOverdue = Math.abs(differenceInDays(today, dueDate));
        alerts.push({
          id: task.id,
          type: 'overdue',
          message: `"${task.title}" is ${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue!`,
          priority: 3
        });
      } else if (isToday(dueDate)) {
        alerts.push({
          id: task.id,
          type: 'today',
          message: `"${task.title}" is due today!`,
          priority: 2
        });
      } else if (differenceInDays(dueDate, today) === 1) {
        alerts.push({
          id: task.id,
          type: 'tomorrow',
          message: `"${task.title}" is due tomorrow`,
          priority: 1
        });
      }
    });

    return alerts.sort((a, b) => b.priority - a.priority);
  }, [tasks]);

  if (notifications.length === 0) return null;

  return (
    <div className="notification-banner">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification-item notification-${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'overdue' ? '⚠️' : notification.type === 'today' ? '📅' : '🔔'}
          </span>
          <span className="notification-message">{notification.message}</span>
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;
