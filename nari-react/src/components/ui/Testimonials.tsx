import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Testimonial {
  name: string;
  service: string;
  text: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Fatima A.',
    service: 'Hair Color & Blowdry',
    text: 'I finally found my go-to salon. The color came out exactly how I described it — warm, dimensional, and so natural.',
    stars: 5,
  },
  {
    name: 'Sarah M.',
    service: 'Gel Manicure',
    text: 'Two weeks in and not a single chip. The nail artists here actually listen to what you want.',
    stars: 5,
  },
  {
    name: 'Aisha K.',
    service: 'Eyelash Extensions',
    text: 'Most natural lash set I\'ve ever had. I keep getting asked if they\'re real — that says everything.',
    stars: 5,
  },
  {
    name: 'Priya R.',
    service: 'Full Body Wax',
    text: 'Quick, clean, and way less painful than my old place. The team is so professional and gentle.',
    stars: 5,
  },
  {
    name: 'Layla H.',
    service: 'Protein Treatment',
    text: 'My hair was completely fried from bleaching. After one session here it feels like silk again. Genuinely impressed.',
    stars: 5,
  },
  {
    name: 'Maria T.',
    service: 'Blowdry & Hairstyle',
    text: 'Got ready for my sister\'s wedding here. The updo lasted the entire night — through dancing and Dubai heat.',
    stars: 5,
  },
  {
    name: 'Noura S.',
    service: 'Eyebrow Lamination',
    text: 'Perfect shape every single time. I won\'t trust my brows with anyone else now.',
    stars: 5,
  },
  {
    name: 'Jessica L.',
    service: 'Classic Manicure & Pedicure',
    text: 'The space itself is so calming. It doesn\'t feel rushed like most salons — you actually get to relax.',
    stars: 4,
  },
  {
    name: 'Reem B.',
    service: 'Highlights',
    text: 'They really take their time with highlights. No brassy tones, just beautiful dimension. Worth every dirham.',
    stars: 5,
  },
  {
    name: 'Dana F.',
    service: 'Full Makeup',
    text: 'Soft glam done right. I looked like myself but elevated — exactly what I asked for.',
    stars: 5,
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5);

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        className={`w-3.5 h-3.5 ${i < count ? 'text-warm-700' : 'text-warm-200'}`}
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div className="flex-shrink-0 w-[320px] md:w-[380px] bg-white border border-warm-100 p-6 md:p-8 group">
    <StarRating count={t.stars} />
    <p className="font-serif text-lg md:text-xl text-warm-800 leading-relaxed mt-4 mb-6">
      "{t.text}"
    </p>
    <div>
      <p className="font-sans text-sm font-medium text-warm-900">{t.name}</p>
      <p className="font-sans text-[11px] text-warm-400 tracking-wide mt-0.5">{t.service}</p>
    </div>
  </div>
);

const MarqueeRow = ({
  items,
  direction = 'left',
  duration = 40,
}: {
  items: Testimonial[];
  direction?: 'left' | 'right';
  duration?: number;
}) => {
  const doubled = [...items, ...items];
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4 md:gap-6"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${direction}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#faf5ef] overflow-hidden"
    >
      {/* Heading with parallax */}
      <div className="max-w-5xl mx-auto px-6 mb-14 md:mb-16">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center"
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-warm-500 mb-4">
            What They Say
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-900">
            Our Clients
          </h2>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-4 md:gap-6">
        <MarqueeRow items={row1} direction="left" duration={22} />
        <MarqueeRow items={row2} direction="right" duration={25} />
      </div>
    </section>
  );
};
