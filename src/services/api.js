import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Projects API
export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`)
};

// Donations API
export const donationsApi = {
  create: (data) => api.post('/donations', data),
  getStats: () => api.get('/donations/stats')
};

// Contact form API
export const contactApi = {
  sendMessage: (data) => api.post('/contact', data)
};

// Testimonials API
export const testimonialsApi = {
  getAll: () => api.get('/testimonials'),
  getById: (id) => api.get(`/testimonials/${id}`)
};

export const homeApi = {
  getHero: () => api.get('/hero'),
  getSdgGoals: () => api.get('/sdgGoals'),
  getApproach: () => api.get('/approach'),
  getProcess: () => api.get('/process'),
  getFeaturedProjects: () => api.get('/featuredProjects')
};

export const aboutApi = {
  getAboutContent: () => api.get('/about')
};

export const practicesApi = {
  getAll: () => api.get('/practices'),
  getVideos: () => api.get('/practiceVideos'),
  getByCategory: (category) => api.get(`/practices?category=${category}`),
  getById: (id) => api.get(`/practices/${id}`),
  create: (data) => api.post('/practices', data),
  update: (id, data) => api.put(`/practices/${id}`, data),
  delete: (id) => api.delete(`/practices/${id}`)
};

export default {
  projectsApi,
  donationsApi,
  contactApi,
  testimonialsApi
};