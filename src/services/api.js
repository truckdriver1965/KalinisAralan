// API service for handling all fetch requests
const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

// Generic fetch function with error handling
async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Projects API
export const projectsApi = {
  getAll: () => fetchData('/projects'),
  getById: (id) => fetchData(`/projects/${id}`),
  create: (data) => fetchData('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchData(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchData(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Donations API
export const donationsApi = {
  create: (data) => fetchData('/donations', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getStats: () => fetchData('/donations/stats'),
};

// Contact form API
export const contactApi = {
  sendMessage: (data) => fetchData('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default {
  projectsApi,
  donationsApi,
  contactApi,
};