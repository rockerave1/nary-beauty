import { motion } from 'framer-motion';
import { siteContent } from '../../data/mockData';

export const Intro = () => {
  const { intro } = siteContent;

  return (
    <section id="about" className="py-24 md:py-32 bg-[#faf5ef]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-warm-500 mb-6">
              About Nary
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-900 mb-8 leading-tight">
              {intro.heading}
            </h2>
            <p className="font-sans text-base leading-relaxed text-warm-600 mb-8">
              {intro.text}
            </p>
            <a
              href="#services"
              className="inline-block font-sans text-[12px] tracking-[0.15em] uppercase text-warm-700 border-b border-warm-300 pb-1 hover:border-warm-700 transition-colors duration-200"
            >
              See Our Services
            </a>
          </motion.div>

          {/* Photo — editorial card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-[280px] md:w-[300px]">
              {/* Offset decorative frame — tonal layering for depth */}
              <div
                className="absolute -right-4 -bottom-4 w-full h-full pointer-events-none"
                style={{
                  border: '1px solid rgba(111,78,44,0.12)',
                  background: 'rgba(111,78,44,0.03)',
                }}
              />

              {/* Main image — clip-path reveal */}
              <motion.div
                className="relative overflow-hidden bg-[#f4f3f1]"
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              >
                <img
                  src={intro.image}
                  alt="Nary salon interior"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:[@media(hover:hover)]:scale-[1.02]"
                />
              </motion.div>

              {/* Bottom accent strip — editorial metadata feel */}
              <div
                className="relative flex items-center justify-between px-4 py-3"
                style={{ background: '#f4f3f1' }}
              >
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-warm-500">
                  Est. 2024
                </span>
                <span
                  className="block w-8 h-px"
                  style={{ background: 'rgba(111,78,44,0.2)' }}
                />
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-warm-500">
                  Nary
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
