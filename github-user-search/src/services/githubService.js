import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const searchUsers = async ({ username = '', location = '', minRepos = '' }) => {
  let query = '';

  if (username.trim())   query += username.trim();
  if (location.trim())   query += `+location:${location.trim()}`;
  if (minRepos.trim())   query += `+repos:>=${minRepos.trim()}`;

  if (!query) throw new Error('Enter at least one search field');

  try {
    const res = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: query, per_page: 12 }
    });

    // Get full profile data for better display
    const users = await Promise.all(
      res.data.items.map(async (item) => {
        const detail = await axios.get(item.url);
        return detail.data;
      })
    );

    return users;
  } catch (err) {
    console.error(err);
    throw new Error('No users found or API limit reached');
  }
};