import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChatBubbleLeftRight,
  HiOutlineHomeModern,
  HiOutlineShieldCheck,
  HiOutlineChevronDown,
  HiArrowRight,
  HiOutlineCamera,
  HiOutlineHeart,
  HiOutlineMapPin,
} from 'react-icons/hi2';

import { PiPawPrintFill } from 'react-icons/pi';
import PetCard from '../components/pets/PetCard';
import { FEATURED_PETS, TESTIMONIALS, STATS } from '../utils/sampleData';

const HOW_IT_WORKS = [
  {
    icon: HiOutlineMagnifyingGlass,
    title: 'Browse verified listings',
    body: 'Filter by species, location, and price to find pets from owners near you.',
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: 'Message the owner',
    body: 'Ask questions directly and arrange a meet-up on your own terms.',
  },
  {
    icon: HiOutlineHomeModern,
    title: 'Bring them home',
    body: 'Complete the adoption or sale, then leave a review to help the next person.',
  },
];

const FAQS = [
  {
    q: 'Is it free to list a pet on PetLink?',
    a: 'Yes. Creating an account and posting a listing for adoption or sale is completely free — there are no hidden fees for owners.',
  },
  {
    q: 'How do you verify pet owners?',
    a: 'Every account is tied to a verified email, and listings that receive reports are reviewed by our team before being removed or restored.',
  },
  {
    q: 'Can I sell a pet, not just list it for adoption?',
    a: 'Yes. When creating a listing you choose between "Adoption" and "For sale" — sale listings let you set a price buyers see up front.',
  },
  {
    q: 'What happens after I contact an owner?',
    a: "That's between you and the owner. PetLink connects you, but meet-ups, home checks, and final arrangements happen off-platform for everyone's safety.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="card-surface overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-sm font-semibold text-text dark:text-text-dark">{item.q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <HiOutlineChevronDown className="h-4 w-4 flex-shrink-0 text-text-muted dark:text-text-muted-dark" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-sm leading-relaxed text-text-muted dark:text-text-muted-dark">{item.a}</p>
      </motion.div>
    </div>
  );
}

/* Signature hero visual: a stack of pet-profile cards, echoing the
   swipe-to-browse motion that is PetLink's core interaction. */
function HeroCardStack() {
  const cards = [
    { rotate: -8, y: 24, x: -18, z: 1, name: 'Milo', breed: 'Golden Retriever', img: FEATURED_PETS[0].image },
    { rotate: 4, y: 10, x: 14, z: 2, name: 'Rocky', breed: 'French Bulldog', img: FEATURED_PETS[2].image },
    { rotate: -2, y: 0, x: 0, z: 3, name: 'Nala', breed: 'Domestic Shorthair', img: FEATURED_PETS[1].image },
  ];

  return (
    <div className="relative mx-auto h-[380px] w-[280px] sm:h-[420px] sm:w-[320px]">
      {cards.map((card, i) => (
        <motion.div
          key={card.name}
          initial={{ opacity: 0, y: card.y + 40, rotate: card.rotate, x: card.x }}
          animate={{ opacity: 1, y: card.y, rotate: card.rotate, x: card.x }}
          transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.25, 1, 0.5, 1] }}
          whileHover={i === cards.length - 1 ? { rotate: 0, scale: 1.02 } : {}}
          style={{ zIndex: card.z }}
          className="card-surface absolute inset-x-0 top-0 overflow-hidden border border-black/5 dark:border-white/5"
        >
          <img src={card.img} alt={card.name} className="h-52 w-full object-cover sm:h-60" />
          <div className="p-4">
            <p className="font-display text-sm font-bold text-text dark:text-text-dark">{card.name}</p>
            <p className="text-xs text-text-muted dark:text-text-muted-dark">{card.breed}</p>
          </div>
        </motion.div>
      ))}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 12 }}
        className="absolute -right-4 -top-4 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft-lg dark:bg-surface-dark"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-400 text-white">
          <PiPawPrintFill className="h-4 w-4" />
        </span>
      </motion.span>
    </div>
  );
}

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary-200/50 via-secondary-100/40 to-accent-100/30 blur-3xl dark:from-primary-900/30 dark:via-secondary-900/20 dark:to-transparent"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-10 lg:px-8">
          <div>
            

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Find your next
              <br />
              <span className="text-gradient">best friend</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-md text-base leading-relaxed text-text-muted dark:text-text-muted-dark"
            >
              PetLink connects owners and adopters directly — browse real listings, message
              the person on the other end, and bring a pet home with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/browse"
                className="ripple inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-transform hover:-translate-y-0.5"
              >
                Browse pets
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3.5 text-sm font-semibold text-text transition-colors hover:bg-primary-50 dark:border-white/10 dark:text-text-dark dark:hover:bg-white/5"
              >
                List a pet
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-9 flex items-center gap-2 text-xs text-text-muted dark:text-text-muted-dark"
            >
              <HiOutlineShieldCheck className="h-4 w-4 text-success" />
              Verified accounts · Direct messaging · No listing fees
            </motion.div>
          </div>

          <HeroCardStack />
        </div>
      </section>
      {/* ---------------- Stray Animal Mission ---------------- */}
<section className="relative overflow-hidden py-20 sm:py-24">
  {/* Decorative background */}
  <div
    aria-hidden
    className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-secondary-200/30 blur-3xl dark:bg-secondary-900/20"
  />
  <div
    aria-hidden
    className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-primary-200/30 blur-3xl dark:bg-primary-900/20"
  />

  <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
        <HiOutlineHeart className="h-6 w-6" />
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
        More than adoption
      </p>

      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        Found a stray? <span className="text-gradient">Help them find a home.</span>
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-muted dark:text-text-muted-dark sm:text-base">
        Not every pet waiting for a home has an owner to post for them.
        If you find a stray animal, PetLink makes it simple to share their
        story and connect them with someone ready to adopt.
      </p>
    </motion.div>

    {/* Main mission card */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-black/5 bg-surface shadow-soft-lg dark:border-white/5 dark:bg-surface-dark"
    >
      <div className="grid lg:grid-cols-2">
        {/* Left - emotional message */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-secondary-500 p-8 text-white sm:p-10 lg:p-12">
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"
          />

          <div
            aria-hidden
            className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-white/10"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
              <HiOutlineHeart className="h-4 w-4" />
              Give them a second chance
            </span>

            <h3 className="mt-6 font-display text-2xl font-bold leading-tight sm:text-3xl">
              One post could change a life.
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-white/85">
              You don't need to be their owner to help. Spot a stray,
              injured, abandoned, or homeless pet? Add their details to
              PetLink and let potential adopters discover them.
            </p>

            <Link
              to="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-600 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Help a stray find a home
              <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right - simple flow */}
        <div className="p-8 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
            How it works
          </p>

          <div className="mt-7 space-y-7">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-300">
                <HiOutlineCamera className="h-5 w-5" />
              </div>

              <div>
                <h4 className="font-display text-sm font-bold">
                  1. Spot a stray
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-text-muted dark:text-text-muted-dark">
                  Take a photo and add basic details like species, location,
                  and condition.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-300">
                <HiOutlineMapPin className="h-5 w-5" />
              </div>

              <div>
                <h4 className="font-display text-sm font-bold">
                  2. Share their story
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-text-muted dark:text-text-muted-dark">
                  Your listing helps people nearby discover a pet that needs
                  a loving home.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-900/20 dark:text-accent-300">
                <HiOutlineHeart className="h-5 w-5" />
              </div>

              <div>
                <h4 className="font-display text-sm font-bold">
                  3. Let the right person find them
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-text-muted dark:text-text-muted-dark">
                  Interested adopters can view the listing and reach out to
                  help give the pet a permanent home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Bottom statement */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="mt-8 text-center font-display text-sm font-semibold text-text-muted dark:text-text-muted-dark"
    >
      Because every pet deserves the chance to be someone's{' '}
      <span className="text-primary-600 dark:text-primary-300">
        best friend.
      </span>
    </motion.p>
  </div>
</section>


      {/* ---------------- Stats ----------------
      <section className="border-y border-black/5 bg-surface py-10 dark:border-white/5 dark:bg-surface-dark">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:grid-cols-4 lg:px-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-display text-2xl font-extrabold text-text dark:text-text-dark sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-text-muted dark:text-text-muted-dark sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* ---------------- Featured pets ----------------
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
              Featured
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold">Pets looking for a home</h2>
          </div>
          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:gap-2.5 dark:text-primary-300"
          >
            View all pets <HiArrowRight className="h-4 w-4 transition-all" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PETS.map((pet, i) => (
            <PetCard key={pet.id} pet={pet} index={i} />
          ))}
        </div>
      </section> */}

      {/* ---------------- How it works ---------------- */}
      <section id="how-it-works" className="bg-gradient-to-b from-primary-50/60 to-transparent py-20 dark:from-white/[0.03]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
              How it works
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold">Three steps, start to home</h2>
          </div>

          <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent sm:block dark:via-primary-800"
            />
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface shadow-soft dark:bg-surface-dark">
                  <step.icon className="h-7 w-7 text-primary-500" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-base font-bold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-text-muted dark:text-text-muted-dark">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      {/* <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">
            Testimonials
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold">Loved by pet people</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-surface flex h-full flex-col p-6"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-text dark:text-text-dark">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section> */}

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300">FAQ</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Questions, answered</h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-secondary-500 px-8 py-16 text-center sm:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 60%, white 0, transparent 35%)',
            }}
          />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to meet your new best friend?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-white/85">
            Join thousands of owners and adopters already using PetLink.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="ripple rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary-600 transition-transform hover:-translate-y-0.5"
            >
              Create free account
            </Link>
            <Link
              to="/browse"
              className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse pets
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
