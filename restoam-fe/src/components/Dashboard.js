import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // Import required components
import axios from 'axios';
// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);


function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/restoam/assets', { params: { page: 0, size: 1000 } })
      .then(response => {
        setAssets(response.data.content || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching assets:', error);
        setLoading(false);
      });
  }, []);

  const calculateData = () => {
    const higherThan100 = assets.filter(asset => parseFloat(asset.valueAmount) > 100).length;
    const lowerOrEqual100 = assets.length - higherThan100;

    return {
      labels: ['> 100 (any currency)', '<= 100 (any currency)'],
      datasets: [
        {
          data: [higherThan100, lowerOrEqual100],
          backgroundColor: ['#FF6384', '#36A2EB'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    };
  };

  return (
    <div>
    <div className="main_dash">
            <div className="jumbotron">
            <h1 className="display-4">Dashboard</h1>
             <p className="lead">Overview of your assets.</p>
            <Link to="/assets" className="btn btn-primary mb-4">Go to Asset List</Link>
    </div>
    </div>
    <div className="container">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div style={{ width: '400px', height: '400px', margin: '0 auto' }}> {/* Adjust the size */}
            <Pie data={calculateData()} />
        </div>
      )}
    </div>
    </div>
  );
}

export default Dashboard;
