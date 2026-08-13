import PetCard from './PetCard';
import PetCardSkeleton from './PetCardSkeleton';
import EmptyState from '../common/EmptyState';
import ErrorState from '../common/ErrorState';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export default function PetGrid({ pets, isLoading, error, onRetry, emptyAction }) {
  if (error) {
    return <ErrorState body="We couldn't reach the server to load pets right now." onRetry={onRetry} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PetCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!pets || pets.length === 0) {
    return (
      <EmptyState
        icon={HiOutlineMagnifyingGlass}
        title="No pets match your search"
        body="Try widening your filters or searching a different breed or location."
        action={emptyAction}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet, i) => (
        <PetCard key={pet._id ?? pet.id} pet={pet} index={i} />
      ))}
    </div>
  );
}
