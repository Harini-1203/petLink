import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlinePencilSquare, HiStar } from 'react-icons/hi2';
import { reviewService } from '../services/reviewService';
import { useAuth } from '../hooks/useAuth';
import ReviewCard from '../components/pets/ReviewCard';
import StarRating from '../components/common/StarRating';
import Modal from '../components/common/Modal';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import Loader from '../components/common/Loader';

function ReviewSkeleton() {
  return (
    <div className="card-surface space-y-3 p-5">
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="skeleton h-4 w-24 rounded-md" />
      </div>
      <div className="skeleton h-3 w-full rounded-md" />
      <div className="skeleton h-3 w-2/3 rounded-md" />
    </div>
  );
}

export default function Reviews() {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reviewService.getAllReviews();
      setReviews(data.reviews ?? data ?? []);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const onSubmit = async (values) => {
    if (rating === 0) {
      toast.error('Please select a star rating.');
      return;
    }
    try {
      const newReview = await reviewService.addReview({ ...values, rating });
      setReviews((prev) => [newReview.review ?? newReview, ...prev]);
      toast.success('Thanks for your review!');
      reset();
      setRating(0);
      setModalOpen(false);
    } catch (err) {
      const message = err?.response?.data?.message ?? 'Could not submit your review right now.';
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-bold">Reviews</h1>
          <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
            What the PetLink community is saying.
          </p>
          {reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <HiStar className="h-5 w-5 text-warning" />
              <span className="font-display text-lg font-bold">{averageRating}</span>
              <span className="text-sm text-text-muted dark:text-text-muted-dark">
                from {reviews.length} review{reviews.length === 1 ? '' : 's'}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            if (!isAuthenticated) {
              toast.error('Log in to leave a review.');
              return;
            }
            setModalOpen(true);
          }}
          className="ripple flex items-center gap-2 rounded-full bg-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5"
        >
          <HiOutlinePencilSquare className="h-4 w-4" />
          Write a review
        </button>
      </div>

      <div className="mt-10">
        {error ? (
          <ErrorState body="We couldn't load reviews right now." onRetry={load} />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <EmptyState
            icon={HiOutlinePencilSquare}
            title="No reviews yet"
            body="Be the first to share your PetLink experience."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <ReviewCard key={review._id ?? review.id ?? i} review={review} index={i} />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Write a review">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium">Your rating</p>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div>
            <label htmlFor="comment" className="mb-1.5 block text-sm font-medium">
              Your review
            </label>
            <textarea
              id="comment"
              rows={4}
              placeholder="Share details of your own experience with PetLink…"
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none dark:bg-white/[0.03] ${
                errors.comment ? 'border-danger' : 'border-black/10 focus:border-primary-400 dark:border-white/10'
              }`}
              {...register('comment', {
                required: 'Write a few words about your experience.',
                minLength: { value: 10, message: 'Use at least 10 characters.' },
              })}
            />
            {errors.comment && <p className="mt-1.5 text-xs font-medium text-danger">{errors.comment.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="ripple flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 py-3 text-sm font-semibold text-white shadow-glow-primary disabled:opacity-60"
          >
            {isSubmitting && <Loader size={16} />}
            Submit review
          </button>
        </form>
      </Modal>
    </div>
  );
}
