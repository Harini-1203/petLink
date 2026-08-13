import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineCheckCircle } from 'react-icons/hi2';
import AuthShell from '../components/forms/AuthShell';
import FormField from '../components/forms/FormField';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const password = watch('password');

  const onSubmit = async (formValues) => {
    try {
      await registerUser(formValues);
      setSuccess(true);
      toast.success('Account created!');
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      const message = err?.response?.data?.message ?? 'Could not create your account. Try again.';
      toast.error(message);
    }
  };

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Join PetLink to list pets or start browsing."
      footer={
        !success && (
          <>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 dark:text-primary-300">
              Log in
            </Link>
          </>
        )
      }
    >
      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
          className="flex flex-col items-center py-6 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 14 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success"
          >
            <HiOutlineCheckCircle className="h-9 w-9" />
          </motion.span>
          <p className="mt-4 font-display text-lg font-bold">You're in!</p>
          <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
            Taking you to the login page…
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <FormField
            id="username"
            label="Username"
            type="text"
            placeholder="janedoe"
            error={errors.username?.message}
            {...register('username', {
              required: 'Username is required.',
              minLength: { value: 3, message: 'Use at least 3 characters.' },
            })}
          />

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
            placeholder="At least 8 characters"
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
            {...register('password', {
              required: 'Password is required.',
              minLength: { value: 8, message: 'Use at least 8 characters.' },
            })}
          />

          <FormField
            id="confirmPassword"
            label="Confirm password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password.',
              validate: (value) => value === password || "Passwords don't match.",
            })}
          />

          <label className="flex items-start gap-2 text-xs text-text-muted dark:text-text-muted-dark">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-black/20 text-primary-500 focus:ring-primary-400"
              {...register('terms', { required: true })}
            />
            <span>
              I agree to the{' '}
              <Link to="/terms" className="font-semibold text-primary-600 dark:text-primary-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-semibold text-primary-600 dark:text-primary-300">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.terms && <p className="-mt-3 text-xs font-medium text-danger">You must accept the terms to continue.</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="ripple w-full rounded-xl bg-primary-500 py-3 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
