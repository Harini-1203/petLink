function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl',
};

export default function Avatar({ src, name = 'PetLink User', size = 'md', className = '' }) {
  const sizeClasses = SIZES[size] ?? SIZES.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClasses} rounded-full object-cover ring-2 ring-white dark:ring-surface-dark ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses} flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 font-semibold text-white ring-2 ring-white dark:ring-surface-dark ${className}`}
      aria-label={name}
    >
      {getInitials(name) || 'PL'}
    </div>
  );
}
