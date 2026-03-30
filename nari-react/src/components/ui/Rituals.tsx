import { useState } from 'react';
import { motion } from 'framer-motion';
import { serviceMenu } from '../../data/mockData';
import { useBooking } from '../../hooks/useBooking';

export const Rituals = () => {
  const [activeTab, setActiveTab] = useState('hair');
  const { open: openBooking } = useBooking();
  const activeCategory = serviceMenu.find(c => c.id === activeTab)!;

  return (
    <section id="services" className="py-24 md:py-32 bg-[#f5ebe0]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-warm-500 mb-4">
            What We Do
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-900">
            Services & Pricing
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-10 pb-1">
          {serviceMenu.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`shrink-0 px-5 py-2.5 text-[12px] font-sans tracking-wide transition-all duration-150 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-warm-900 text-white'
                  : 'bg-white text-warm-600 hover:text-warm-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Price grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10"
        >
          {activeCategory.sections.map(section => (
            <div key={section.name}>
              <h4 className="font-serif text-xl text-warm-900 mb-4 pb-2 border-b border-warm-300/40">
                {section.name}
              </h4>
              <div className="space-y-2.5">
                {section.items.map(item => (
                  <div key={item.name} className="flex justify-between items-baseline gap-4">
                    <span className="font-sans text-[13px] text-warm-600">{item.name}</span>
                    <span className="shrink-0 font-sans text-[13px] text-warm-800 font-medium">
                      AED {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Book CTA */}
        <div className="text-center mt-16">
          <button
            onClick={openBooking}
            className="bg-warm-900 text-white px-10 py-4 text-[11px] tracking-[0.2em] uppercase font-sans font-medium hover:bg-warm-800 transition-colors duration-200 cursor-pointer"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};
