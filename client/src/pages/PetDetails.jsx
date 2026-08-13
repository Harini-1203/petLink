import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineTrash,
  HiOutlineCalendarDays,
  HiOutlineTag,
} from 'react-icons/hi2';
import { usePets } from '../hooks/usePets';
import { useAuth } from '../hooks/useAuth';
import ImageGallery from '../components/pets/ImageGallery';
import Avatar from '../components/common/Avatar';
import PageLoader from '../components/common/PageLoader';
import ErrorState from '../components/common/ErrorState';
import Modal from '../components/common/Modal';
import PetCard from '../components/pets/PetCard';
import Loader from '../components/common/Loader';

function normalizeImages(pet) {
  if (Array.isArray(pet?.images) && pet.images.length) return pet.images;
  if (pet?.image) return [pet.image];
  return ['https://placedog.net/700/525?id=40'];
}

export default function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPetById, fetchPetsByUser, deletePet } = usePets();
  const { user, isAuthenticated } = useAuth();

  const [pet, setPet] = useState(null);
  const [relatedPets, setRelatedPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPetById(id);
      const petData = data.pet ?? data;
      setPet(petData);

      const ownerId = petData?.owner?._id ?? petData?.ownerId ?? petData?.userId;
      if (ownerId) {
        try {
          const relatedData = await fetchPetsByUser(ownerId);
          const list = (relatedData.pets ?? relatedData ?? []).filter(
            (p) => (p._id ?? p.id) !== (petData._id ?? petData.id)
          );
          setRelatedPets(list.slice(0, 4));
        } catch {
          setRelatedPets([]);
        }
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <PageLoader />;
  if (error || !pet) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <ErrorState body="This listing may have been removed or the link is incorrect." onRetry={load} />
      </div>
    );
  }

  const isOwner = isAuthenticated && (user?._id ?? user?.id) === (pet.owner?._id ?? pet.ownerId ?? pet.userId);
  const isAdoption = pet.status === 'adoption';

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePet(pet._id ?? pet.id);
      navigate('/profile');
    } catch {
      toast.error('Could not delete this listing. Try again.');
    } finally {
      setIsDeleting(false);
      setDeleteOpen(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <ImageGallery images={normalizeImages(pet)} alt={pet.name} />
        </div>

        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  isAdoption ? 'bg-success/10 text-success' : 'bg-accent-500/10 text-accent-600'
                }`}
              >
                {isAdoption ? 'Available for adoption' : 'For sale'}
              </span>
              <h1 className="mt-3 font-display text-3xl font-extrabold">{pet.name}</h1>
              <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
                {pet.breed} · {pet.age}
              </p>
            </div>
            {!isAdoption && pet.price != null && (
              <p className="font-display text-2xl font-extrabold text-primary-600 dark:text-primary-300">
                ${pet.price}
              </p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <InfoPill icon={HiOutlineMapPin} label="Location" value={pet.location} />
            <InfoPill icon={HiOutlineTag} label="Type" value={pet.type} />
            <InfoPill icon={HiOutlineCalendarDays} label="Age" value={pet.age} />
            <InfoPill icon={HiOutlineTag} label="Breed" value={pet.breed} />
          </div>

          {pet.description && (
            <div className="mt-6">
              <h2 className="font-display text-sm font-bold">About {pet.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted dark:text-text-muted-dark">
                {pet.description}
              </p>
            </div>
          )}

          <div className="mt-8 card-surface flex items-center gap-3 p-4">
            <Avatar name={pet.owner?.username ?? 'Pet owner'} src={pet.owner?.avatar} />
            <div className="flex-1">
              <p className="text-sm font-semibold">{pet.owner?.username ?? 'PetLink member'}</p>
              <p className="text-xs text-text-muted dark:text-text-muted-dark">Listing owner</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="ripple flex-1 rounded-full bg-primary-500 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5"
            >
              Contact owner
            </button>
            {isOwner && (
              <button
                type="button"
                onClick={() => setDeleteOpen(true)}
                className="flex items-center justify-center gap-2 rounded-full border border-danger/30 px-5 py-3.5 text-sm font-semibold text-danger hover:bg-danger/5"
              >
                <HiOutlineTrash className="h-4 w-4" />
                Delete listing
              </button>
            )}
          </div>
        </div>
      </div>

      {relatedPets.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-bold">More from this owner</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedPets.map((p, i) => (
              <PetCard key={p._id ?? p.id} pet={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <Modal isOpen={contactOpen} onClose={() => setContactOpen(false)} title="Contact owner">
        <p className="text-sm text-text-muted dark:text-text-muted-dark">
          Reach out to {pet.owner?.username ?? 'the owner'} directly to ask questions or arrange a meet-up.
        </p>
        <div className="card-surface mt-4 flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-white/5">
            <HiOutlinePhone className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs text-text-muted dark:text-text-muted-dark">Phone</p>
            <p className="text-sm font-semibold">{pet.ownerphn ?? 'Not provided'}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setContactOpen(false)}
          className="mt-5 w-full rounded-full bg-primary-500 py-3 text-sm font-semibold text-white"
        >
          Done
        </button>
      </Modal>

      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete this listing?">
        <p className="text-sm text-text-muted dark:text-text-muted-dark">
          This can't be undone. {pet.name}'s listing will be permanently removed from PetLink.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setDeleteOpen(false)}
            className="flex-1 rounded-full border border-black/10 py-3 text-sm font-semibold dark:border-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-danger py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isDeleting && <Loader size={16} />}
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

function InfoPill({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-2xl bg-primary-50/60 p-3 dark:bg-white/5">
      <div className="flex items-center gap-1.5 text-xs text-text-muted dark:text-text-muted-dark">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
