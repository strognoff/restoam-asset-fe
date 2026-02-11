import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AssetList from './components/AssetList.jsx';
import AddAsset from './components/AddAsset.jsx';
import EditAsset from './components/EditAsset.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">RestoAM Assets</Link>
            <div className="navbar-nav">
              <Link className="nav-link" to="/">Assets</Link>
              <Link className="nav-link" to="/add">Add Asset</Link>
              <a
                className="nav-link"
                href={import.meta.env.VITE_LOCATION_APP_URL || 'http://localhost:5174'}
                target="_blank"
                rel="noreferrer"
              >
                Locations
              </a>
              <a
                className="nav-link"
                href={import.meta.env.VITE_WORKORDER_APP_URL || 'http://localhost:5175'}
                target="_blank"
                rel="noreferrer"
              >
                Workorders
              </a>
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <Routes>
            <Route path="/" element={<AssetList />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/add" element={<AddAsset />} />
            <Route path="/edit/:id" element={<EditAsset />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
