import { useState } from 'react';
import { HiStar, HiOutlineStar } from 'react-icons/hi2';

export default function StarRating({ value = 0, onChange, readOnly = false, size = 'h-5 w-5' }) {
  const [hoverValue, setHoverValue] = useState(0);
  const display = hoverValue || value;

  return (
    <div className="flex items-center gap-0.5" onMouseLeave={() => setHoverValue(0)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= display;
        const Icon = filled ? HiStar : HiOutlineStar;
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHoverValue(star)}
            onClick={() => !readOnly && onChange?.(star)}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} text-warning`}
          >
            <Icon className={size} />
          </button>
        );
      })}
    </div>
  );
}
