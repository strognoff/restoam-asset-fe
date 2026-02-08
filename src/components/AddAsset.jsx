import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_ASSET_API || 'http://localhost:8080/restoam/assets';

function AddAsset() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    valueAmount: '0',
    valueCurrency: 'GBP'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'valueAmount' && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_BASE, formData)
      .then(() => {
        alert('Asset added successfully!');
        setFormData({ name: '', description: '', location: '', valueAmount: '0', valueCurrency: 'GBP' });
      })
      .catch((error) => {
        console.error('Error adding asset:', error);
        alert('Failed to add asset.');
      });
  };

  return (
    <div className="container">
      <h1 className="display-4">Add Asset</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Asset</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valueAmount">Value Amount</label>
          <input
            type="number"
            className="form-control"
            id="valueAmount"
            name="valueAmount"
            value={formData.valueAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valueCurrency">Currency</label>
          <select
            className="form-control"
            id="valueCurrency"
            name="valueCurrency"
            value={formData.valueCurrency}
            onChange={handleChange}
            required
          >
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="BRL">BRL</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/assets" className="btn btn-secondary ml-2">Back to List</Link>
      </form>
    </div>
  );
}

export default AddAsset;
