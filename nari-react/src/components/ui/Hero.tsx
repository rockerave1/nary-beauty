import { motion } from 'framer-motion';
import { useBooking } from '../../hooks/useBooking';

/* Emil: keep stagger short (30-80ms), UI animations under 500ms,
   use custom ease-out curve for instant-feeling entrance */
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
    <section id="home" className="relative h-screen min-h-[650px] overflow-hidden bg-[#f0e6da]">
      {/* Background photo */}
      <motion.div
        className="absolute inset-0"
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <img
          src="/images/salon-render-bright.png"
          alt=""
          className="w-full h-full object-cover object-right md:object-center"
        />
        {/* Softer warm gradient overlays — lets the bright interior breathe */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, rgba(58,40,26,0.78) 0%, rgba(58,40,26,0.5) 30%, rgba(58,40,26,0.1) 60%, transparent 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(58,40,26,0.4) 0%, transparent 35%)',
          }}
        />
      </motion.div>

      {/* Content — left-aligned */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <motion.div
            className="max-w-lg"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Decorative ornament */}
            <motion.div className="flex items-center gap-3 mb-10" variants={fadeUp}>
              <div className="w-10 h-px bg-white/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-white/40" />
              <div className="w-10 h-px bg-white/30" />
            </motion.div>

            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6"
              variants={fadeUp}
            >
              Where beauty<br />
              <em className="italic text-white/70">feels like home</em>
            </motion.h1>

            <motion.p
              className="font-sans text-[13px] md:text-[15px] text-white/50 leading-relaxed mb-10 max-w-sm"
              variants={fadeUp}
            >
              Expert hair styling, nail artistry, and head-to-toe pampering — all in one calm, modern space.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-start gap-4" variants={fadeUp}>
              <button
                onClick={openBooking}
                className="bg-white text-warm-900 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-medium hover:bg-warm-100 cursor-pointer"
              >
                Book an Appointment
              </button>
              <a
                href="#services"
                className="border border-white/20 text-white/70 px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans hover:border-white/40 hover:text-white"
              >
                Our Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom info bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4, ease: EASE_OUT }}
      >
        <div className="max-w-5xl mx-auto px-6 pb-8 flex items-end justify-between">
          <div className="hidden md:flex items-center gap-8">
            <div>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Hours</p>
              <p className="font-sans text-[13px] text-white/60">10 am — 9 pm Daily</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Location</p>
              <p className="font-sans text-[13px] text-white/60">Ajman, UAE</p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2 mx-auto md:ml-auto md:mr-0">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
            <motion.div
              className="w-px h-6 bg-white/20 origin-top"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
