import { createContext, useCallback, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { petService } from '../services/petService';
import { LoadingContext } from './LoadingContext';

export const PetContext = createContext(null);

const DEFAULT_FILTERS = {
  search: '',
  status: 'all', // all | adoption | sale
  type: 'all',
  location: '',
  minPrice: '',
  maxPrice: '',
};

export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('petlink_favorites')) ?? [];
    } catch {
      return [];
    }
  });
  const { withLoading } = useContext(LoadingContext);

  const fetchPets = useCallback(
    async (params) => {
      return withLoading(async () => {
        const data = await petService.getAllPets(params);
        const list = data.pets ?? data;
        setPets(list);
        return list;
      });
    },
    [withLoading]
  );

  const fetchPetById = useCallback((id) => petService.getPetById(id), []);

  const fetchPetsByUser = useCallback((userId) => petService.getPetsByUser(userId), []);

  const createPet = useCallback(async (petData, images) => {
    const data = await petService.createPet(petData, images);
    toast.success('Your pet listing is live!');
    return data;
  }, []);

  const deletePet = useCallback(async (id) => {
    await petService.deletePet(id);
    setPets((prev) => prev.filter((p) => (p._id ?? p.id) !== id));
    toast.success('Listing deleted.');
  }, []);

  const toggleFavorite = useCallback((petId) => {
    setFavorites((prev) => {
      const next = prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId];
      localStorage.setItem('petlink_favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateFilters = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const value = {
    pets,
    filters,
    favorites,
    fetchPets,
    fetchPetById,
    fetchPetsByUser,
    createPet,
    deletePet,
    toggleFavorite,
    updateFilters,
    resetFilters,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}
