import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative h-14 w-14">
        <motion.span
          className="absolute inset-0 rounded-full border-[3px] border-primary-200 dark:border-primary-800"
        />
        <motion.span
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        />
      </div>
      <p className="text-sm font-medium text-text-muted dark:text-text-muted-dark">
        Fetching the good stuff…
      </p>
    </div>
  );
}
