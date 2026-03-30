import { motion } from 'framer-motion';
import { useBooking } from '../../hooks/useBooking';

export const Membership = () => {
  const { open: openBooking } = useBooking();
  return (
    <section id="visit" className="py-24 md:py-32 bg-warm-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/40 mb-6">
            Visit Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
            Come see us
          </h2>
          <p className="font-sans text-base text-white/60 leading-relaxed mb-4">
            We'd love to have you. Book an appointment or just walk in — you're always welcome.
          </p>
          <p className="font-sans text-sm text-white/40 mb-10">
            Open Daily · 10 am — 9 pm
          </p>
          <button
            onClick={openBooking}
            className="bg-white text-warm-900 px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-medium hover:bg-warm-100 transition-colors duration-200 cursor-pointer"
          >
            Book an Appointment
          </button>
        </motion.div>
      </div>
    </section>
  );
};
