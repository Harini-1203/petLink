import { forwardRef } from 'react';

const FormField = forwardRef(function FormField(
  { label, error, hint, id, className = '', rightElement, ...inputProps },
  ref
) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text dark:text-text-dark">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted/70 dark:bg-white/[0.03] dark:text-text-dark ${
            error
              ? 'border-danger focus:border-danger'
              : 'border-black/10 focus:border-primary-400 dark:border-white/10 dark:focus:border-primary-500'
          } ${rightElement ? 'pr-11' : ''}`}
          {...inputProps}
        />
        {rightElement && <div className="absolute inset-y-0 right-2 flex items-center">{rightElement}</div>}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-text-muted dark:text-text-muted-dark">{hint}</p>
      )}
    </div>
  );
});

export default FormField;
