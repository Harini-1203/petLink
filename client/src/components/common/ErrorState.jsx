import { motion } from 'framer-motion';
import { HiOutlineExclamationTriangle, HiOutlineArrowPath } from 'react-icons/hi2';

export default function ErrorState({
  title = "Couldn't load this",
  body = 'Something went wrong while talking to the server.',
  onRetry,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-sm flex-col items-center py-16 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger">
        <HiOutlineExclamationTriangle className="h-8 w-8" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">{body}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <HiOutlineArrowPath className="h-4 w-4" />
          Try again
        </button>
      )}
    </motion.div>
  );
}
