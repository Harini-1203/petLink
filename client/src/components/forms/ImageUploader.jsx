import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCloudArrowUp, HiOutlineXMark } from 'react-icons/hi2';

const MAX_IMAGES = 6;

export default function ImageUploader({ files, onChange, error }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const addFiles = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
      const merged = [...files, ...incoming].slice(0, MAX_IMAGES);
      onChange(merged);
    },
    [files, onChange]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeAt = (index) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragActive
            ? 'border-primary-400 bg-primary-50 dark:bg-white/5'
            : error
              ? 'border-danger'
              : 'border-black/15 hover:border-primary-300 dark:border-white/15'
        }`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-white/5">
          <HiOutlineCloudArrowUp className="h-6 w-6" />
        </span>
        <p className="mt-3 text-sm font-semibold">Drag photos here or click to upload</p>
        <p className="mt-1 text-xs text-text-muted dark:text-text-muted-dark">
          PNG or JPG, up to {MAX_IMAGES} photos
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-danger">{error}</p>}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          <AnimatePresence>
            {files.map((file, i) => (
              <motion.div
                key={`${file.name}-${i}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <img src={URL.createObjectURL(file)} alt={`Upload preview ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAt(i);
                  }}
                  aria-label="Remove photo"
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <HiOutlineXMark className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
