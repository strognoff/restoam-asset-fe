import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_ASSET_API || 'http://localhost:8080/restoam/assets';

function AssetList() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    description: '',
    currency: ''
  });

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
    axios
      .delete(`${API_BASE}/${id}`)
      .then(() => {
        alert('Asset deleted successfully!');
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

  return (
    <div>
      <div className="main_asset">
        <div className="jumbotron">
          <h1 className="display-4">Asset</h1>
          <p className="lead">This is a simple Asset list screen, please select your asset at the table below for more details.</p>
          <Link to="/add" className="btn btn-primary btn-lg" role="button">Add Asset</Link>
        </div>
      </div>
      <div className="container">
        <div className="row mb-3">
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
              className="form-control"
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

        {loading ? (
          <p>Loading assets...</p>
        ) : (
          <>
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
                      <Link to={`/edit/${asset.id}`} className="btn btn-warning mr-2">Edit</Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(asset.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => setPage(Math.max(page - 1, 0))}
                  disabled={page === 0}
                >
                  Prev
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setPage(Math.min(page + 1, totalPages - 1))}
                  disabled={page >= totalPages - 1}
                >
                  Next
                </button>
              </div>
              <div>
                Page {page + 1} of {totalPages || 1}
              </div>
              <div>
                <select
                  className="form-control"
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
