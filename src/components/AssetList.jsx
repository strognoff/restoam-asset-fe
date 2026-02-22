import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EmptyState from './EmptyState';
import { usePersistedFilters } from '../hooks/usePersistedFilters';

const API_BASE = import.meta.env.VITE_ASSET_API || 'http://localhost:8080/restoam/assets';

const initialFilters = {
  name: '',
  location: '',
  description: '',
  currency: ''
};

function AssetList() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  
  const { filters, setFilters, clearFilters, hasActiveFilters } = usePersistedFilters('asset-filters', initialFilters);

  const fetchAssets = () => {
    setLoading(true);
    axios
      .get(API_BASE, {
        params: {
          page,
          size,
          sortBy: 'createdDate',
          sortDir: 'desc',
          name: filters.name || undefined,
          location: filters.location || undefined,
          description: filters.description || undefined,
          currency: filters.currency || undefined
        }
      })
      .then((response) => {
        setAssets(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAssets();
  }, [page, size, filters]);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this asset?')) return;

    axios
      .delete(`${API_BASE}/${id}`)
      .then(() => {
        fetchAssets();
      })
      .catch((error) => {
        console.error('Error deleting asset:', error);
        alert('Failed to delete asset.');
      });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPage(0);
  };

  const handleClearFilters = () => {
    clearFilters();
    setPage(0);
  };

  return (
    <div>
      <div className="form-section mb-4">
        <h1 className="section-title">Assets</h1>
        <p className="text-muted">Manage your assets and keep inventory details up to date.</p>
        <div className="card-header-actions">
          <Link to="/add" className="btn btn-primary">Add Asset</Link>
        </div>
      </div>

      <div className="form-section">
        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Filter by asset"
              value={filters.name}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Filter by location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Filter by description"
              value={filters.description}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              name="currency"
              value={filters.currency}
              onChange={handleFilterChange}
            >
              <option value="">All currencies</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="BRL">BRL</option>
            </select>
          </div>
        </div>

        {hasActiveFilters() && (
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge bg-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="me-1">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              Filters active
            </span>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        )}

        {loading ? (
          <p>Loading assets...</p>
        ) : assets.length === 0 ? (
          <EmptyState 
            hasFilters={hasActiveFilters()}
            onClearFilters={handleClearFilters}
            entityName="Asset"
            createPath="/add"
          />
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Created</th>
                    <th>Value</th>
                    <th>Currency</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.name}</td>
                      <td>{asset.description}</td>
                      <td>{asset.location}</td>
                      <td>{asset.createdDate ? new Date(asset.createdDate).toLocaleString() : '-'}</td>
                      <td>{asset.valueAmount}</td>
                      <td>{asset.valueCurrency}</td>
                      <td>
                        <Link to={`/edit/${asset.id}`} className="btn btn-sm btn-warning me-2">
                          Edit
                        </Link>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(asset.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => setPage(Math.max(page - 1, 0))}
                  disabled={page === 0}
                >
                  Prev
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
                  disabled={page >= totalPages - 1 || totalPages === 0}
                >
                  Next
                </button>
              </div>
              <div>
                Page {page + 1} of {totalPages || 1}
              </div>
              <div>
                <select
                  className="form-select"
                  value={size}
                  onChange={(e) => {
                    setSize(Number(e.target.value));
                    setPage(0);
                  }}
                >
                  {[5, 10, 20, 50].map((s) => (
                    <option key={s} value={s}>
                      {s} / page
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AssetList;
