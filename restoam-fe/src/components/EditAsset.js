import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditAsset() {
  const { id } = useParams(); // Get the asset ID from the URL
  const navigate = useNavigate(); // For navigation after editing
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    valueAmount: '0',
    valueCurrency: 'GBP',
    createdDate: ''
  });

  useEffect(() => {
    // Fetch the asset details to populate the form
    axios.get(`http://localhost:8080/restoam/assets/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching asset details:', error);
        alert('Failed to fetch asset details.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/restoam/assets/${id}`, { ...formData, id })
      .then(() => {
        alert('Asset updated successfully!');
        navigate('/'); // Redirect to the asset list
      })
      .catch(error => {
        console.error('Error updating asset:', error);
        alert('Failed to update asset.');
      });
  };

  return (
    <div className="container">
      <h1 className="display-4">Edit Asset</h1>
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
        <div className="form-group">
          <label htmlFor="createdDate">Created Date</label>
          <input
            type="text"
            className="form-control"
            id="createdDate"
            name="createdDate"
            value={formData.createdDate ? new Date(formData.createdDate).toLocaleString() : ''}
            readOnly
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
        <button type="button" className="btn btn-secondary ml-2" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}

export default EditAsset;
