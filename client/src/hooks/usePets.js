import { useContext } from 'react';
import { PetContext } from '../contexts/PetContext';

export function usePets() {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error('usePets must be used within a PetProvider');
  return ctx;
}
