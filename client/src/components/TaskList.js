import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [properties, setProperties] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties');
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchTasks();
    fetchProperties();
  }, []);

  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);
  const handlePropertyFilterChange = (e) => setPropertyFilter(e.target.value);

  const today = new Date();

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter ? task.status === statusFilter : true;
    const propertyMatch = propertyFilter ? task.propertyId === propertyFilter : true;
    return statusMatch && propertyMatch;
  });

  const isTaskOverdue = (task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'Completed';
  };

  return (
    <div className="container">
      <h1 className="heading">Task List</h1>
      
      <div className="filter-container">
        <label>
          Filter by Status:
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label>
          Filter by Property:
          <select value={propertyFilter} onChange={handlePropertyFilterChange}>
            <option value="">All</option>
            {properties.map((property) => (
              <option key={property._id} value={property._id}>
                {property.name} - {property.location}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li
              key={task._id}
              className={`task-item ${isTaskOverdue(task) ? 'overdue' : ''}`}
            >
              <span>
                {task.description} - {task.status} ({task.type})
                {isTaskOverdue(task) && <strong> (Overdue)</strong>}
              </span>
            </li>
          ))
        ) : (
          <li className="no-tasks">No tasks found.</li>
        )}
      </ul>
    </div>
  );
}

export default TaskList;
