import { motion } from 'framer-motion';
import { PiPawPrintFill } from 'react-icons/pi';

export default function EmptyState({
  icon: Icon = PiPawPrintFill,
  title = 'Nothing here yet',
  body,
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-sm flex-col items-center py-16 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-white/5">
        <Icon className="h-8 w-8" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
      {body && <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">{body}</p>}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
