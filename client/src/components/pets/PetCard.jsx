import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiHeart, HiOutlineMapPin } from 'react-icons/hi2';
import { usePets } from '../../hooks/usePets';

export default function PetCard({ pet, index = 0 }) {
  const { favorites, toggleFavorite } = usePets();
  const id = pet._id ?? pet.id;
  const isFavorite = favorites.includes(id);
  const isAdoption = pet.status === 'For Adoption';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -6 }}
      className="card-surface group overflow-hidden"
    >
      <Link to={`/pets/${id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={pet.images[0]}
            alt={pet.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
              isAdoption ? 'bg-success/90 text-white' : 'bg-accent-500/90 text-white'
            }`}
          >
            
            {isAdoption ? 'Adoption' : 'For sale'}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(id);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-secondary-500 shadow-soft backdrop-blur transition-transform hover:scale-110 dark:bg-black/50"
          >
            {isFavorite ? <HiHeart className="h-[18px] w-[18px]" /> : <HiOutlineHeart className="h-[18px] w-[18px]" />}
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-bold text-text dark:text-text-dark">{pet.name}</h3>
            {!isAdoption && pet.price != null && (
              <span className="whitespace-nowrap font-display text-sm font-bold text-primary-600 dark:text-primary-300">
                ₹{pet.price}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-text-muted dark:text-text-muted-dark">
            {pet.breed} 
          </p>
          <p className="mt-2 flex items-center gap-1 text-xs text-text-muted dark:text-text-muted-dark">
            <HiOutlineMapPin className="h-3.5 w-3.5" />
            {pet.location}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
