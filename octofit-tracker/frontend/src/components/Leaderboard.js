import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching leaderboard from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard data received:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setLeaderboard(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card component-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>Leaderboard</span>
        <span className="badge bg-light text-dark">{leaderboard.length} teams</span>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-muted py-4">No leaderboard data found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id || index}>
                    <td><span className="badge bg-warning text-dark badge-points">{index + 1}</span></td>
                    <td className="fw-bold">{entry.team}</td>
                    <td><span className="badge bg-success badge-points">{entry.points}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
