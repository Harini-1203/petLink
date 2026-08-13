import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineMagnifyingGlassPlus, HiOutlineXMark, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

export default function ImageGallery({ images = [], alt = 'Pet photo' }) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (images.length === 0) return null;

  const goTo = (i) => setActive((i + images.length) % images.length);

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl">
        <motion.img
          key={images[active]}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          src={images[active]}
          alt={`${alt} ${active + 1}`}
          className="aspect-[4/3] w-full cursor-zoom-in object-cover"
          onClick={() => setZoomOpen(true)}
        />
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label="Zoom image"
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-text shadow-soft backdrop-blur dark:bg-black/50 dark:text-text-dark"
        >
          <HiOutlineMagnifyingGlassPlus className="h-[18px] w-[18px]" />
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text shadow-soft backdrop-blur dark:bg-black/50 dark:text-text-dark"
            >
              <HiOutlineChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text shadow-soft backdrop-blur dark:bg-black/50 dark:text-text-dark"
            >
              <HiOutlineChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                i === active ? 'border-primary-500' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setZoomOpen(false)}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Close zoom"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={images[active]}
              alt={`${alt} zoomed`}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
