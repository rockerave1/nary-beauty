import { motion } from 'framer-motion';
import { useBooking } from '../../hooks/useBooking';

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const Hero = () => {
  const { open: openBooking } = useBooking();

  return (
    <section id="home" className="relative h-screen min-h-[650px] overflow-hidden bg-[#0f0a08]">
      {/* Background imagery */}
      <motion.div
        className="absolute inset-0"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/hero-desktop-bg.jpg" />
          <img
            src="/images/hero-mobile-bg.png"
            alt=""
            aria-hidden
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(15,10,8,0.95) 0%, rgba(15,10,8,0.5) 40%, rgba(15,10,8,0.15) 65%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: 'linear-gradient(to right, rgba(15,10,8,0.6) 0%, rgba(15,10,8,0.2) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Content — unified layout for all viewports */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-28 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div
            className="max-w-lg text-center md:text-left mx-auto md:mx-0"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Decorative ornament */}
            <motion.div className="flex items-center justify-center md:justify-start gap-3 mb-8" variants={fadeUp}>
              <div className="w-10 h-px bg-white/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-white/40" />
              <div className="w-10 h-px bg-white/30" />
            </motion.div>

            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-5"
              variants={fadeUp}
            >
              Where beauty<br />
              <em className="italic text-white/70">feels like home</em>
            </motion.h1>

            <motion.p
              className="font-sans text-[13px] md:text-[15px] text-white/50 leading-relaxed mb-8 max-w-sm mx-auto md:mx-0"
              variants={fadeUp}
            >
              Expert hair styling, nail artistry, and head-to-toe pampering — all in one calm, modern space.
            </motion.p>

            <motion.div className="flex flex-row items-center gap-3 md:gap-4" variants={fadeUp}>
              <button
                onClick={openBooking}
                className="bg-white/95 backdrop-blur-sm text-warm-900 px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-sans font-medium hover:bg-white cursor-pointer flex-1 md:flex-none transition-colors"
              >
                Book Now
              </button>
              <a
                href="#services"
                className="border border-white/25 backdrop-blur-sm text-white/80 px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-sans hover:border-white/50 hover:text-white flex-1 md:flex-none text-center transition-colors"
              >
                Our Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom info bar — desktop */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 hidden md:block"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4, ease: EASE_OUT }}
      >
        <div className="max-w-5xl mx-auto px-6 pb-8 flex items-end justify-between">
          <div className="flex items-center gap-8">
            <div>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Hours</p>
              <p className="font-sans text-[13px] text-white/60">10 am — 9 pm Daily</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Location</p>
              <p className="font-sans text-[13px] text-white/60">Al Yasmeen, Ajman</p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
