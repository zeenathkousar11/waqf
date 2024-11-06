import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task and refresh the task list
  const addTask = async (newTask) => {
    try {
      await axios.post('http://localhost:5000/tasks', newTask);
      fetchTasks(); // Refresh the list after adding a new task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default TaskManager;
