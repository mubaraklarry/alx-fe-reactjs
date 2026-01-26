import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          style={{
            padding: '10px',
            width: '300px',
            marginRight: '10px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              border: '3px solid #ddd'
            }}
          />
          <h2>{user.name || user.login}</h2>
          <p>@{user.login}</p>
          {user.bio && <p>{user.bio}</p>}
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#24292e',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;