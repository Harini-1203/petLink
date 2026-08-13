import api from './api';

export const reviewService = {
  getAllReviews: () => api.get('/reviews').then((res) => res.data),

  addReview: (payload) => api.post('/reviews', payload).then((res) => res.data),
};
