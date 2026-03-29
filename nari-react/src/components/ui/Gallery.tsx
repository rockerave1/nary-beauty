import { motion } from 'framer-motion';
import { ParallaxScrollSecond } from './parallax-scroll';

const galleryImages = [
  '/images/salon-full.jpg',
  '/images/pedicure-hd.jpg',
  '/images/drink-cookies.jpg',
  '/images/nails-station.jpg',
  '/images/wall-detail.jpg',
  '/images/team.jpg',
  '/images/exterior-sunset.jpg',
  '/images/salon-render.jpg',
  '/images/plants-detail.jpg',
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-warm-500 mb-4">
            Our Space
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-900">
            Inside Nary
          </h2>
        </motion.div>

        <ParallaxScrollSecond images={galleryImages} />
      </div>
    </section>
  );
};
