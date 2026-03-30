import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteContent } from '../../data/mockData';
import { useBooking } from '../../hooks/useBooking';

export const Header = () => {
  const { open: openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,box-shadow,backdrop-filter] duration-200 ${
        scrolled
          ? 'bg-[#faf5ef]/90 backdrop-blur-md shadow-[0_1px_30px_rgba(44,24,16,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home">
          <img
            src={scrolled ? '/images/logo-transparent.png' : '/images/logo-white.png'}
            alt="Nary Beauty Center"
            className="h-9 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {siteContent.nav.map(item => (
            <a
              key={item.label}
              href={item.href}
              className={`font-sans text-[13px] tracking-wide transition-colors duration-200 ${
                scrolled
                  ? 'text-warm-600 hover:text-warm-900'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={openBooking}
            className={`font-sans px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer ${
              scrolled
                ? 'bg-warm-900 text-white hover:bg-warm-800'
                : 'border border-white/30 text-white hover:bg-white/10'
            }`}
          >
            Book Now
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`block md:hidden transition-colors ${
            scrolled ? 'text-warm-900' : 'text-white'
          }`}
        >
          <span className="material-symbols-outlined">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-[#faf5ef] border-t border-warm-200"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {siteContent.nav.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-sm text-warm-800"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openBooking(); }}
                className="mt-2 block w-full text-center bg-warm-900 text-white px-5 py-3 text-[11px] tracking-[0.15em] uppercase cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
