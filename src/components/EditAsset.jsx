import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CopyIdField from './CopyIdField';

const API_BASE = import.meta.env.VITE_ASSET_API || 'http://localhost:8080/restoam/assets';
const LOCATION_APP_URL = import.meta.env.VITE_LOCATION_APP_URL || 'http://localhost:5174';

function EditAsset() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    valueAmount: '0',
    valueCurrency: 'GBP',
    createdDate: ''
  });

  useEffect(() => {
    axios
      .get(`${API_BASE}/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
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
    axios
      .put(`${API_BASE}/${id}`, { ...formData, id })
      .then(() => {
        alert('Asset updated successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating asset:', error);
        alert('Failed to update asset.');
      });
  };

  return (
    <div className="form-section">
      <h1 className="section-title">Edit Asset</h1>
      <form onSubmit={handleSubmit}>
        <CopyIdField id={id} label="Asset ID" />
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
          <label htmlFor="location" className="form-label">
            Location
            {formData.location && (
              <a
                href={`${LOCATION_APP_URL}?name=${encodeURIComponent(formData.location)}`}
                target="_blank"
                rel="noreferrer"
                className="ms-2 text-primary"
                title="Open Location"
                style={{ fontSize: '0.875rem' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                  <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                </svg>
                Open
              </a>
            )}
          </label>
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
        <div className="mb-3">
          <label htmlFor="createdDate" className="form-label">Created Date</label>
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
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditAsset;
