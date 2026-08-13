import api from './api';

/** Builds a multipart/form-data body from a pet payload + File[] images. */
function buildPetFormData(petData, images = []) {
  const formData = new FormData();
  Object.entries(petData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  images.forEach((file) => formData.append('images', file));
  return formData;
}

export const petService = {
  getAllPets: (params) => api.get('/pets', { params }).then((res) => res.data),

  getPetById: (id) => api.get(`/pets/${id}`).then((res) => res.data),

  getPetsByUser: (userId) => api.get(`/pets/user/${userId}`).then((res) => res.data),

  createPet: (petData, images) =>
    api
      .post('/pets', buildPetFormData(petData, images), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data),

  deletePet: (id) => api.delete(`/pets/${id}`).then((res) => res.data),
};
