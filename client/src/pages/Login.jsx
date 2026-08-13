import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import AuthShell from '../components/forms/AuthShell';
import FormField from '../components/forms/FormField';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (formValues) => {
    try {
      await login(formValues);
      toast.success('Welcome back!');
      const redirectTo = location.state?.from?.pathname ?? '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message ?? 'Invalid email or password.';
      toast.error(message);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to PetLink"
      subtitle="Pick up right where you left off."
      footer={
        <>
          New here?{' '}
          <Link to="/register" className="font-semibold text-primary-600 dark:text-primary-300">
            Create an account
          </Link>
        </>
      }
    >
      {forgotOpen ? (
        <ForgotPasswordForm onBack={() => setForgotOpen(false)} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
            })}
          />

          <FormField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="text-text-muted hover:text-text dark:hover:text-text-dark"
              >
                {showPassword ? <HiOutlineEyeSlash className="h-[18px] w-[18px]" /> : <HiOutlineEye className="h-[18px] w-[18px]" />}
              </button>
            }
            {...register('password', { required: 'Password is required.' })}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-text-muted dark:text-text-muted-dark">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-black/20 text-primary-500 focus:ring-primary-400"
                {...register('rememberMe')}
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="text-sm font-semibold text-primary-600 dark:text-primary-300"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="ripple w-full rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      )}
    </AuthShell>
  );
}

function ForgotPasswordForm({ onBack }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
  };

  if (sent) {
    return (
      <div className="py-4 text-center">
        <p className="font-display text-base font-bold">Check your inbox</p>
        <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
          If an account exists for that email, we've sent a link to reset your password.
        </p>
        <button type="button" onClick={onBack} className="mt-6 text-sm font-semibold text-primary-600 dark:text-primary-300">
          Back to log in
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <p className="text-sm text-text-muted dark:text-text-muted-dark">
        Enter the email on your account and we'll send you a reset link.
      </p>
      <FormField
        id="reset-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required.',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
        })}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white shadow-glow-primary disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send reset link'}
      </button>
      <button type="button" onClick={onBack} className="w-full text-center text-sm font-semibold text-text-muted dark:text-text-muted-dark">
        Back to log in
      </button>
    </form>
  );
}
