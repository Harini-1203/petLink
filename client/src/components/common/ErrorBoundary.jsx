import { Component } from 'react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production this is where you'd forward to an error-tracking service.
    console.error('PetLink render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-5 text-center dark:bg-bg-dark">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger">
            <HiOutlineExclamationTriangle className="h-8 w-8" />
          </span>
          <h1 className="font-display text-xl font-bold">Something went wrong</h1>
          <p className="max-w-sm text-sm text-text-muted dark:text-text-muted-dark">
            An unexpected error occurred. Try reloading the page — if it keeps happening, let us know.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-glow-primary"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
