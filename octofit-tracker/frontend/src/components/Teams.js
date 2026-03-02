import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching teams from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams data received:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card component-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>Teams</span>
        <span className="badge bg-light text-dark">{teams.length} teams</span>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center text-muted py-4">No teams found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={team.id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{team.name}</td>
                    <td>
                      {Array.isArray(team.members)
                        ? team.members.map((member, i) => (
                            <span key={i} className="badge bg-secondary me-1">{member}</span>
                          ))
                        : team.members}
                    </td>
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

export default Teams;
