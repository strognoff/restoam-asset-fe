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
    <div className="form-section">
      <h1 className="section-title">Add Asset</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Asset</label>
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
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
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
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
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
        <div className="mb-3">
          <label htmlFor="valueAmount" className="form-label">Value Amount</label>
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
        <div className="mb-3">
          <label htmlFor="valueCurrency" className="form-label">Currency</label>
          <select
            className="form-select"
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
        <Link to="/" className="btn btn-secondary ms-2">Back to List</Link>
      </form>
    </div>
  );
}

export default AddAsset;
