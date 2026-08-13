import { motion } from 'framer-motion';
import Avatar from '../common/Avatar';
import StarRating from '../common/StarRating';

export default function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 6) * 0.05 }}
      className="card-surface flex h-full flex-col p-5"
    >
      <div className="flex items-center gap-3">
        <Avatar name={review.author?.username ?? review.name} src={review.author?.avatar ?? review.avatar} size="sm" />
        <div className="flex-1">
          <p className="text-sm font-semibold">{review.author?.username ?? review.name ?? 'PetLink user'}</p>
          {review.createdAt && (
            <p className="text-xs text-text-muted dark:text-text-muted-dark">
              {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3">
        <StarRating value={review.rating ?? 0} readOnly size="h-4 w-4" />
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted dark:text-text-muted-dark">
        {review.comment ?? review.text}
      </p>
    </motion.div>
  );
}
