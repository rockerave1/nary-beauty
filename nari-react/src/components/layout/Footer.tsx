import { siteContent } from '../../data/mockData';

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1806!2d55.5705751!3d25.37659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f77dfb5df6c7%3A0xc1d99eb12dc090a4!2sNary%20beauty%20center!5e0!3m2!1sen!2sae!4v1';

export const Footer = () => {
  const { footer } = siteContent;

  return (
    <footer className="bg-[#f5ebe0]">
      {/* Two-column: info left, map right — map matches left content height */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.45fr] items-stretch">
        {/* Left — Info */}
        <div className="px-8 md:px-16 lg:pl-[max(2rem,calc((100vw-64rem)/2+2rem))] lg:pr-16 py-20">
          <h2 className="font-serif text-4xl md:text-5xl text-warm-900 leading-tight mb-14">
            Where <em className="not-italic font-serif italic">beauty</em> finds you
          </h2>

          {/* Location */}
          <div className="flex items-start gap-4 mb-8">
            <span className="material-symbols-outlined text-warm-400 text-[20px] mt-0.5 shrink-0">location_on</span>
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-1.5">Location</p>
              <p className="font-sans text-[15px] text-warm-800 leading-relaxed">
                Nary Beauty Center<br />
                Al Yasmeen, Ajman, UAE
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4 mb-8">
            <span className="material-symbols-outlined text-warm-400 text-[20px] mt-0.5 shrink-0">schedule</span>
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-1.5">Hours</p>
              <p className="font-sans text-[15px] text-warm-800">
                Everyday<br />
                10:00 AM – 9:00 PM
              </p>
            </div>
          </div>

          {/* Connect */}
          <div className="flex items-start gap-4 mb-12">
            <span className="material-symbols-outlined text-warm-400 text-[20px] mt-0.5 shrink-0">call</span>
            <div>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-1.5">Connect</p>
              <div className="flex flex-col gap-1">
                {footer.social.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-sans text-[15px] text-warm-800 hover:text-warm-900 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Follow CTA */}
          <a
            href="https://www.instagram.com/nary_beautycenter/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-warm-300 px-6 py-3 font-sans text-[11px] tracking-[0.15em] uppercase text-warm-600 hover:border-warm-600 hover:text-warm-900 transition-colors duration-200"
          >
            Follow us on Instagram
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

        {/* Right — Map: stretches to match left column height */}
        <div className="h-[240px] lg:h-auto lg:py-20 lg:pr-8">
          <iframe
            src={MAPS_EMBED_URL}
            className="w-full h-full border-0 lg:rounded-md"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nary Beauty Center location"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-warm-200">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[11px] text-warm-400 tracking-wide">
            &copy; {new Date().getFullYear()} Nary Beauty Center
          </p>
          <div className="flex gap-6">
            {footer.nav.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[11px] tracking-[0.1em] uppercase text-warm-400 hover:text-warm-700 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
