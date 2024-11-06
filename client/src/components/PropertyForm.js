import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function PropertyForm() {
  const [property, setProperty] = useState({ name: '', location: '', type: 'mosque' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/properties', property);
      console.log('Property added:', response.data);
      setProperty({ name: '', location: '', type: 'mosque' });
      setError('');
    } catch (err) {
      console.error('Error adding property:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  return (
    <div className="container">
      <h3 className="heading">Add New Property</h3>
      <form onSubmit={handleSubmit}>
        <label>Property Name</label>
        <input
          name="name"
          placeholder="Property Name"
          value={property.name}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          name="location"
          placeholder="Location"
          value={property.location}
          onChange={handleChange}
          required
        />

        <label>Property Type</label>
        <select name="type" value={property.type} onChange={handleChange}>
          <option value="mosque">Mosque</option>
          <option value="school">School</option>
          <option value="land">Land</option>
        </select>

        <button type="submit">Add Property</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default PropertyForm;
