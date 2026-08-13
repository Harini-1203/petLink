import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PiPawPrintFill } from 'react-icons/pi';

export default function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-400 p-10 lg:block"
        style={{ minHeight: 560 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 15%, white 0, transparent 35%), radial-gradient(circle at 85% 75%, white 0, transparent 40%)',
          }}
        />
        <div className="relative flex h-full flex-col justify-between text-white">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <PiPawPrintFill className="h-5 w-5" />
            </span>
            PetLink
          </Link>
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight">
              Every good match starts with a real conversation.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              Thousands of owners and adopters use PetLink to find pets they can trust — no
              middlemen, just direct messages and verified accounts.
            </p>
          </div>
          <div className="flex -space-x-3">
            {[47, 12, 33, 8].map((n) => (
              <img
                key={n}
                src={`https://i.pravatar.cc/80?img=${n}`}
                alt=""
                className="h-10 w-10 rounded-full border-2 border-white/60 object-cover"
              />
            ))}
            <span className="ml-4 flex items-center text-xs text-white/80">Joined by 8,100+ pet people</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mx-auto w-full max-w-md"
      >
        <div className="card-surface p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">{subtitle}</p>}
          <div className="mt-7">{children}</div>
        </div>
        {footer && <div className="mt-6 text-center text-sm text-text-muted dark:text-text-muted-dark">{footer}</div>}
      </motion.div>
    </div>
  );
}
