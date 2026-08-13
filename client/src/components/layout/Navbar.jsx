import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineMoon, HiOutlineSun, HiOutlineBars3, HiOutlineXMark, HiChevronDown } from 'react-icons/hi2';
import { PiPawPrintFill } from 'react-icons/pi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Avatar from '../common/Avatar';

const PUBLIC_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/browse', label: 'Browse' },
  { to: '/reviews', label: 'Reviews' },
];

const navLinkClasses = ({ isActive }) =>
  `relative px-1 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'text-primary-600 dark:text-primary-300'
      : 'text-text-muted hover:text-text dark:text-text-muted-dark dark:hover:text-text-dark'
  }`;

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-soft'
          : 'bg-bg/0 dark:bg-bg-dark/0'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 text-white shadow-glow-primary">
            <PiPawPrintFill className="h-5 w-5" />
          </span>
          <span className="font-display text-text dark:text-text-dark">PetLink</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {PUBLIC_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClasses}>
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/add-pet" className={navLinkClasses}>
              Add Pet
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-text-muted-dark dark:hover:bg-white/5"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>

          {isAuthenticated ? (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-primary-50 dark:hover:bg-white/5"
              >
                <Avatar src={user?.avatar} name={user?.username} size="sm" />
                <HiChevronDown className={`h-4 w-4 text-text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="card-surface absolute right-0 mt-2 w-52 overflow-hidden p-1.5"
                  >
                    <NavLink
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-text hover:bg-primary-50 dark:text-text-dark dark:hover:bg-white/5"
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/add-pet"
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-text hover:bg-primary-50 dark:text-text-dark dark:hover:bg-white/5"
                    >
                      Add a Pet
                    </NavLink>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-danger hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <NavLink
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-text hover:bg-primary-50 dark:text-text-dark dark:hover:bg-white/5"
              >
                Log in
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5"
              >
                Sign up
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted md:hidden dark:text-text-muted-dark"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineBars3 className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden glass md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-5">
              {PUBLIC_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-text hover:bg-primary-50 dark:text-text-dark dark:hover:bg-white/5"
                >
                  {link.label}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <>
                  <NavLink to="/add-pet" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-text hover:bg-primary-50 dark:text-text-dark dark:hover:bg-white/5">
                    Add Pet
                  </NavLink>
                  <NavLink to="/profile" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-text hover:bg-primary-50 dark:text-text-dark dark:hover:bg-white/5">
                    Profile
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="rounded-xl px-3 py-2.5 text-left text-sm font-medium text-danger hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="mt-2 flex gap-2">
                  <NavLink
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-full border border-primary-200 py-2.5 text-center text-sm font-semibold text-primary-600 dark:border-primary-800"
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-full bg-primary-500 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Sign up
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
