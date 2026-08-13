import api from './api';

export const authService = {
  register: (payload) => api.post('/users/register', payload).then((res) => res.data),

  login: (payload) => api.post('/users/login', payload).then((res) => res.data),

  getCurrentUser: () => api.get('/users/current').then((res) => res.data),

  updateProfile: (payload) => api.put('/users/update', payload).then((res) => res.data),
};
