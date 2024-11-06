import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function TaskForm({ addTask }) {
  const [task, setTask] = useState({
    description: '',
    dueDate: '',
    status: 'Pending',
    type: 'Collect rent',
    subtype: '',
    propertyId: ''
  });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties');
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        alert("Failed to fetch properties. Please try again.");
      }
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.type === 'Maintenance' && !task.subtype) {
      alert("Please select a maintenance type.");
      return;
    }
    addTask(task);
    setTask({
      description: '',
      dueDate: '',
      status: 'Pending',
      type: 'Collect rent',
      subtype: '',
      propertyId: ''
    });
  };

  return (
    <div className="container">
      <h3 className="heading">Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <label>Select Property</label>
        <select name="propertyId" value={task.propertyId} onChange={handleChange} required>
          <option value="">Select Property</option>
          {properties.map((property) => (
            <option key={property._id} value={property._id}>
              {property.name} - {property.location}
            </option>
          ))}
        </select>

        <label>Task Description</label>
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          required
        />

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />

        <label>Task Type</label>
        <select name="type" value={task.type} onChange={handleChange} required>
          <option value="Collect rent">Collect Rent</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Legal issue">Follow-up on a Legal Issue</option>
        </select>

        {task.type === 'Maintenance' && (
          <div>
            <label>Maintenance Type</label>
            <select name="subtype" value={task.subtype} onChange={handleChange} required>
              <option value="">Select Maintenance Type</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Repairs">Repairs</option>
            </select>
          </div>
        )}

        <label>Task Status</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
