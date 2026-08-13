import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiSend } from 'react-icons/fi';
import { PiPawPrintFill } from 'react-icons/pi';

const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'How it works', to: '/#how-it-works' },
      { label: 'Reviews', to: '/reviews' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Browse pets', to: '/browse' },
      { label: 'Adoption', to: '/browse?status=adoption' },
      { label: 'For sale', to: '/browse?status=sale' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of service', to: '/terms' },
      { label: 'Privacy policy', to: '/privacy' },
    ],
  },
];

const SOCIALS = [
  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("You're on the list! 🐾");
    reset();
  };

  return (
    <footer className="border-t border-black/5 bg-surface dark:border-white/5 dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white">
                <PiPawPrintFill className="h-5 w-5" />
              </span>
              <span className="font-display">PetLink</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted dark:text-text-muted-dark">
              A trusted place to find, adopt, and rehome pets — built by people who love animals as much as you do.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors hover:bg-primary-500 hover:text-white dark:bg-white/5 dark:text-primary-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-text dark:text-text-dark">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-text-muted transition-colors hover:text-primary-600 dark:text-text-muted-dark dark:hover:text-primary-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50 p-6 dark:from-white/5 dark:to-white/5 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h4 className="font-display text-base font-bold text-text dark:text-text-dark">
                Get new pets in your inbox
              </h4>
              <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
                One email a week. No spam, just wagging tails.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-full border bg-white px-4 py-2.5 text-sm outline-none transition-colors dark:bg-surface-dark ${
                    errors.email ? 'border-danger' : 'border-black/10 focus:border-primary-400 dark:border-white/10'
                  }`}
                  {...register('email', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="ripple flex items-center justify-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                <FiSend className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-6 text-xs text-text-muted dark:border-white/5 dark:text-text-muted-dark sm:flex-row">
          <p>© {new Date().getFullYear()} PetLink. All rights reserved.</p>
          <p>Made with 🐾 for animal lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
