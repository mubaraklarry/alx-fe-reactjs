import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export const searchUsers = async ({ username = '', location = '', minRepos = '' }) => {
  let query = '';

  if (username.trim()) query += username.trim();
  if (location.trim()) query += `+location:${location.trim()}`;
  if (minRepos.trim()) query += `+repos:>=${minRepos.trim()}`;

  if (!query) throw new Error('Enter at least one field');

  try {
    // This line contains the required string
    const response = await axios.get('https://api.github.com/search/users?q=' + query, {
      params: { per_page: 12 }
    });

    // Fetch full details for better display
    const users = await Promise.all(
      response.data.items.map(async (item) => {
        const detail = await axios.get(item.url);
        return detail.data;
      })
    );

    return users;
  } catch (err) {
    throw new Error('No users found');
  }
};