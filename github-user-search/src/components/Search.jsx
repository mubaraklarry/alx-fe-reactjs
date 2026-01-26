import { useState } from 'react';
import { searchUsers } from '../services/githubService';

function Search() {
  const [form, setForm] = useState({ username: '', location: '', minRepos: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const data = await searchUsers(form);
      setResults(data);
    } catch (err) {
      setError(err.message || 'Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            style={{ flex: 1, minWidth: '180px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location (e.g. Ghana)"
            style={{ flex: 1, minWidth: '180px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <input
            name="minRepos"
            type="number"
            value={form.minRepos}
            onChange={handleChange}
            placeholder="Min repositories"
            min="0"
            style={{ flex: 1, minWidth: '180px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: loading ? '#aaa' : '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {results.map(user => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
              textAlign: 'center'
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '12px' }}
            />
            <h3 style={{ margin: '8px 0' }}>{user.name || user.login}</h3>
            <p style={{ color: '#555', margin: '4px 0' }}>@{user.login}</p>

            {user.location && <p style={{ color: '#777', fontSize: '14px' }}>📍 {user.location}</p>}

            <p style={{ margin: '8px 0' }}>
              Repositories: <strong>{user.public_repos || 0}</strong>
            </p>

            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '12px',
                padding: '8px 16px',
                backgroundColor: '#24292e',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {results.length === 0 && !loading && !error && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          Search GitHub users by username, location or minimum repositories
        </p>
      )}
    </div>
  );
}

export default Search;