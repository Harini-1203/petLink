import { motion } from 'framer-motion';
import { PiPawPrintFill } from 'react-icons/pi';

export default function ComingSoon({ title }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 py-24 text-center">
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-white/5"
      >
        <PiPawPrintFill className="h-8 w-8" />
      </motion.span>
      <h1 className="font-display text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
        This page is being built in the next pass — routing and layout are already wired up for it.
      </p>
    </div>
  );
}
