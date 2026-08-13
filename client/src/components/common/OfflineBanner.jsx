import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineSignalSlash } from 'react-icons/hi2';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden bg-warning text-center text-sm font-medium text-white"
        >
          <div className="flex items-center justify-center gap-2 px-4 py-2">
            <HiOutlineSignalSlash className="h-4 w-4" />
            You're offline — some features may not work until you reconnect.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
