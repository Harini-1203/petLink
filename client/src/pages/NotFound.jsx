import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHome } from 'react-icons/hi2';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gradient font-display text-7xl font-extrabold"
      >
        404
      </motion.h1>
      <h2 className="mt-4 font-display text-xl font-bold">Looks like this pet wandered off</h2>
      <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="ripple mt-8 inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5"
      >
        <HiOutlineHome className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
