import { HiCheck } from 'react-icons/hi2';

export default function StepProgress({ steps, currentStep }) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isDone
                    ? 'bg-primary-500 text-white'
                    : isActive
                      ? 'bg-primary-500 text-white ring-4 ring-primary-100 dark:ring-primary-900'
                      : 'bg-primary-50 text-text-muted dark:bg-white/5 dark:text-text-muted-dark'
                }`}
              >
                {isDone ? <HiCheck className="h-4 w-4" /> : stepNum}
              </div>
              <span
                className={`mt-1.5 hidden text-xs font-medium sm:block ${
                  isActive ? 'text-text dark:text-text-dark' : 'text-text-muted dark:text-text-muted-dark'
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum !== steps.length && (
              <div className={`mx-2 h-0.5 flex-1 rounded ${isDone ? 'bg-primary-500' : 'bg-primary-50 dark:bg-white/5'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
