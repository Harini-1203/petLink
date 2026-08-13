import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi2';
import FormField from '../components/forms/FormField';
import StepProgress from '../components/forms/StepProgress';
import ImageUploader from '../components/forms/ImageUploader';
import Loader from '../components/common/Loader';
import { usePets } from '../hooks/usePets';
import { PET_TYPES } from '../utils/constants';

const STEPS = ['Basics', 'Details', 'Contact', 'Photos'];
const STEP_FIELDS = [
  ['name', 'type', 'breed', 'age'],
  ['status', 'price', 'description'],
  ['location', 'ownerphn'],
  [],
];

export default function CreateListing() {
  const navigate = useNavigate();
  const { createPet } = usePets();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { status: 'adoption' },
  });

  const status = watch('status');

  const goNext = async () => {
    const valid = await trigger(STEP_FIELDS[step - 1]);
    if (!valid) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (values) => {
    if (images.length === 0) {
      setImageError('Add at least one photo of your pet.');
      return;
    }
    setImageError('');
    setIsSubmitting(true);
    try {
      const payload = { ...values };
      if (payload.status !== 'sale') delete payload.price;
      await createPet(payload, images);
      navigate('/profile');
    } catch (err) {
      const message = err?.response?.data?.message ?? 'Could not publish this listing. Try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 lg:px-8">
      <h1 className="font-display text-3xl font-bold">List a pet</h1>
      <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
        A few quick steps to get {`your pet's`} listing live.
      </p>

      <div className="card-surface mt-8 p-6 sm:p-8">
        <StepProgress steps={STEPS} currentStep={step} />

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {step === 1 && (
                <div className="space-y-5">
                  <FormField
                    id="name"
                    label="Pet's name"
                    placeholder="Milo"
                    error={errors.name?.message}
                    {...register('name', { required: 'Give your pet a name.' })}
                  />
                  <div>
                    <label htmlFor="type" className="mb-1.5 block text-sm font-medium">
                      Pet type
                    </label>
                    <select
                      id="type"
                      className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none dark:bg-white/[0.03] ${
                        errors.type ? 'border-danger' : 'border-black/10 focus:border-primary-400 dark:border-white/10'
                      }`}
                      {...register('type', { required: 'Select a pet type.' })}
                    >
                      <option value="">Select type</option>
                      {PET_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.type && <p className="mt-1.5 text-xs font-medium text-danger">{errors.type.message}</p>}
                  </div>
                  <FormField
                    id="breed"
                    label="Breed"
                    placeholder="Golden Retriever"
                    error={errors.breed?.message}
                    {...register('breed', { required: 'Breed is required.' })}
                  />
                  <FormField
                    id="age"
                    label="Age"
                    placeholder="2 years"
                    error={errors.age?.message}
                    {...register('age', { required: 'Age is required.' })}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-sm font-medium">Listing type</p>
                    <div className="flex gap-3">
                      {[
                        { value: 'adoption', label: 'Adoption' },
                        { value: 'sale', label: 'For sale' },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border py-3 text-sm font-semibold transition-colors ${
                            status === opt.value
                              ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-white/5 dark:text-primary-300'
                              : 'border-black/10 text-text-muted dark:border-white/10 dark:text-text-muted-dark'
                          }`}
                        >
                          <input type="radio" value={opt.value} className="sr-only" {...register('status')} />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {status === 'sale' && (
                    <FormField
                      id="price"
                      label="Price (Rs)"
                      type="number"
                      min="0"
                      placeholder="Enter price"
                      error={errors.price?.message}
                      {...register('price', {
                        required: status === 'sale' ? 'Set a price for this listing.' : false,
                        min: { value: 0, message: 'Price must be positive.' },
                      })}
                    />
                  )}

                  <div>
                    <label htmlFor="description" className="mb-1.5 block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={5}
                      placeholder="Tell adopters about temperament, health, and habits…"
                      className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none dark:bg-white/[0.03] ${
                        errors.description ? 'border-danger' : 'border-black/10 focus:border-primary-400 dark:border-white/10'
                      }`}
                      {...register('description', {
                        required: 'Add a short description.',
                        minLength: { value: 20, message: 'Write at least 20 characters.' },
                      })}
                    />
                    {errors.description && (
                      <p className="mt-1.5 text-xs font-medium text-danger">{errors.description.message}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <FormField
                    id="location"
                    label="Location"
                    placeholder="City, State, Pincode"
                    error={errors.location?.message}
                    {...register('location', { required: 'Location is required.' })}
                  />
                  <FormField
                    id="ownerphn"
                    label="Contact phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    hint="Shown only to people who tap 'Contact owner'."
                    error={errors.ownerphn?.message}
                    {...register('ownerphn', { required: 'A contact number helps adopters reach you.' })}
                  />
                </div>
              )}

              {step === 4 && (
                <div>
                  <p className="mb-3 text-sm font-medium">Photos</p>
                  <ImageUploader files={images} onChange={setImages} error={imageError} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-semibold dark:border-white/10"
              >
                <HiOutlineArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}
            {step < STEPS.length ? (
              <button
                type="button"
                onClick={goNext}
                className="ripple ml-auto flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5"
              >
                Continue
                <HiOutlineArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ripple ml-auto flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {isSubmitting && <Loader size={16} />}
                Publish listing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
