import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePets } from '../hooks/usePets';
import Avatar from '../components/common/Avatar';
import Modal from '../components/common/Modal';
import FormField from '../components/forms/FormField';
import PetCardSkeleton from '../components/pets/PetCardSkeleton';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import Loader from '../components/common/Loader';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { fetchPetsByUser, deletePet } = usePets();
  const [myPets, setMyPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const userId = user?._id ?? user?.id;

  const load = async () => {
    console.log(user); // Debugging line
    if (!userId) {
      setMyPets([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPetsByUser(userId);
      setMyPets(data.pets ?? data ?? []);
    } catch (err) {
      setError(err);
      setMyPets([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const stats = useMemo(() => {
    const total = myPets.length;
    const adoption = myPets.filter((p) => p.status === 'adoption').length;
    const sale = myPets.filter((p) => p.status === 'sale').length;
    return { total, adoption, sale };
  }, [myPets]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deletePet(deleteTarget._id ?? deleteTarget.id);
      setMyPets((prev) => prev.filter((p) => (p._id ?? p.id) !== (deleteTarget._id ?? deleteTarget.id)));
    } catch {
      toast.error('Could not delete this listing.');
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <div className="card-surface flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4">
          <Avatar name={user?.username} src={user?.avatar} size="xl" />
          <div>
            <h1 className="font-display text-2xl font-bold">{user?.username ?? 'Your profile'}</h1>
            <p className="text-sm text-text-muted dark:text-text-muted-dark">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-2 self-start rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-primary-50 dark:border-white/10 dark:hover:bg-white/5 sm:self-auto"
        >
          <HiOutlinePencil className="h-4 w-4" />
          Edit profile
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <StatCard label="Total listings" value={stats.total} />
        <StatCard label="Adoption" value={stats.adoption} />
        <StatCard label="For sale" value={stats.sale} />
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">My pets</h2>
        <Link
          to="/add-pet"
          className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-300"
        >
          <HiOutlinePlus className="h-4 w-4" />
          Add pet
        </Link>
      </div>

      <div className="mt-6">
        {error ? (
          <ErrorState body="We couldn't load your listings." onRetry={load} />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PetCardSkeleton key={i} />
            ))}
          </div>
        ) : myPets.length === 0 ? (
          <EmptyState
            title="No listings yet"
            body="Post your first pet for adoption or sale — it only takes a minute."
            action={
              <Link
                to="/add-pet"
                className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white"
              >
                <HiOutlinePlus className="h-4 w-4" />
                Add a pet
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myPets.map((pet) => (
              <div key={pet._id ?? pet.id} className="card-surface overflow-hidden">
                <Link to={`/pets/${pet._id ?? pet.id}`}>
                  <img
                    src={pet.image ?? pet.images?.[0]}
                    alt={pet.name}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Link>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-display text-sm font-bold">{pet.name}</p>
                    <p className="text-xs text-text-muted dark:text-text-muted-dark">{pet.breed}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(pet)}
                    aria-label={`Delete ${pet.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-danger hover:bg-danger/10"
                  >
                    <HiOutlineTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EditProfileModal isOpen={editOpen} onClose={() => setEditOpen(false)} user={user} updateProfile={updateProfile} />

      <Modal isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Delete this listing?">
        <p className="text-sm text-text-muted dark:text-text-muted-dark">
          {deleteTarget?.name}'s listing will be permanently removed.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setDeleteTarget(null)}
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

function StatCard({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-surface p-5 text-center"
    >
      <p className="font-display text-2xl font-extrabold text-primary-600 dark:text-primary-300">{value}</p>
      <p className="mt-1 text-xs text-text-muted dark:text-text-muted-dark">{label}</p>
    </motion.div>
  );
}

function EditProfileModal({ isOpen, onClose, user, updateProfile }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    values: { username: user?.username ?? '', email: user?.email ?? '' },
  });

  const onSubmit = async (values) => {
    try {
      await updateProfile(values);
      toast.success('Profile updated.');
      onClose();
    } catch (err) {
      const message = err?.response?.data?.message ?? 'Could not update your profile.';
      toast.error(message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit profile">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField
          id="edit-username"
          label="Username"
          error={errors.username?.message}
          {...register('username', { required: 'Username is required.' })}
        />
        <FormField
          id="edit-email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required.',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
          })}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 py-3 text-sm font-semibold text-white shadow-glow-primary disabled:opacity-60"
        >
          {isSubmitting && <Loader size={16} />}
          Save changes
        </button>
      </form>
    </Modal>
  );
}
