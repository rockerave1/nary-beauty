import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBooking } from '../../hooks/useBooking';
import { serviceMenu } from '../../data/mockData';

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM',
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/** Convert "2:30 PM" → minutes since midnight (870) */
function slotToMinutes(slot: string): number {
  const [timePart, meridiem] = slot.split(' ');
  let [h, m] = timePart.split(':').map(Number);
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

/** Is this slot already in the past right now? */
function isSlotInPast(slot: string): boolean {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return slotToMinutes(slot) <= nowMinutes;
}

export const BookingModal = () => {
  const { isOpen, close } = useBooking();
  const [step, setStep] = useState<'form' | 'confirm' | 'error'>('form');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });

  const update = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  /** When the date changes to today, clear time if it's now past */
  const updateDate = (value: string) => {
    setForm(prev => {
      const next = { ...prev, date: value };
      if (value === today && prev.time && isSlotInPast(prev.time)) {
        next.time = '';
      }
      return next;
    });
  };

  const canSubmit = form.name && form.phone && form.service && form.date && form.time;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Booking failed');

      setStep('confirm');
    } catch {
      setStep('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setStep('form');
      setSubmitting(false);
      setForm({ name: '', phone: '', service: '', date: '', time: '', notes: '' });
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-warm-950/60 backdrop-blur-sm" />

          {/* Modal — Emil: modals keep transform-origin center, enter with ease-out, exit faster */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative bg-warm-50 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-warm-400 hover:text-warm-700 transition-colors z-10"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="p-6 sm:p-8 md:p-10">
              {step === 'form' ? (
                <>
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-warm-500 mb-2">
                    Book With Us
                  </p>
                  <h2 className="font-serif text-3xl text-warm-900 mb-8">
                    Make an appointment
                  </h2>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label className="block font-sans text-[11px] tracking-wide text-warm-500 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        className="w-full bg-white border border-warm-200 px-4 py-3 font-sans text-sm text-warm-900 placeholder:text-warm-300 focus:outline-none focus:border-warm-700 transition-colors"
                        placeholder="Full name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-sans text-[11px] tracking-wide text-warm-500 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => update('phone', e.target.value)}
                        className="w-full bg-white border border-warm-200 px-4 py-3 font-sans text-sm text-warm-900 placeholder:text-warm-300 focus:outline-none focus:border-warm-700 transition-colors"
                        placeholder="+971 ..."
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block font-sans text-[11px] tracking-wide text-warm-500 mb-1.5">
                        Service
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={form.service}
                          onChange={e => update('service', e.target.value)}
                          className="w-full bg-white border border-warm-200 px-4 py-3 pr-10 font-sans text-sm text-warm-900 focus:outline-none focus:border-warm-700 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Select a service</option>
                          {serviceMenu.map(cat => (
                            <optgroup key={cat.id} label={cat.label}>
                              {cat.sections.map(section => (
                                <option
                                  key={`${cat.id}-${section.name}`}
                                  value={`${cat.label} — ${section.name}`}
                                >
                                  {section.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-warm-300 text-[18px] pointer-events-none select-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block font-sans text-[11px] tracking-wide text-warm-500 mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          min={today}
                          value={form.date}
                          onChange={e => updateDate(e.target.value)}
                          className="w-full bg-white border border-warm-200 px-4 py-3 pr-10 font-sans text-sm text-warm-900 focus:outline-none focus:border-warm-700 transition-colors"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-warm-300 text-[18px] pointer-events-none select-none">
                          calendar_month
                        </span>
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block font-sans text-[11px] tracking-wide text-warm-500 mb-1.5">
                        Preferred Time
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map(t => {
                          const isPast = (!form.date || form.date === today) && isSlotInPast(t);
                          return (
                            <button
                              key={t}
                              type="button"
                              disabled={isPast}
                              onClick={() => !isPast && update('time', t)}
                              className={`py-2 text-[11px] font-sans border transition-all duration-150 ${isPast
                                  ? 'bg-warm-100 text-warm-300 border-warm-100 cursor-not-allowed line-through'
                                  : form.time === t
                                    ? 'bg-warm-900 text-white border-warm-900'
                                    : 'bg-white text-warm-600 border-warm-200 hover:border-warm-400'
                                }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block font-sans text-[11px] tracking-wide text-warm-500 mb-1.5">
                        Notes <span className="text-warm-300">(optional)</span>
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={e => update('notes', e.target.value)}
                        rows={2}
                        className="w-full bg-white border border-warm-200 px-4 py-3 font-sans text-sm text-warm-900 placeholder:text-warm-300 focus:outline-none focus:border-warm-700 transition-colors resize-none"
                        placeholder="Any special requests..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      className="mt-2 w-full bg-warm-900 text-white py-4 text-[12px] tracking-[0.15em] uppercase font-sans font-medium hover:bg-warm-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {submitting ? 'Sending...' : 'Confirm Booking'}
                    </button>
                  </form>
                </>
              ) : step === 'confirm' ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-warm-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-white text-2xl">check</span>
                  </div>
                  <h2 className="font-serif text-3xl text-warm-900 mb-3">
                    You're all set
                  </h2>
                  <p className="font-sans text-sm text-warm-500 mb-2 leading-relaxed">
                    {form.service} on {new Date(form.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {form.time}
                  </p>
                  <p className="font-sans text-sm text-warm-400 mb-8">
                    We'll confirm your appointment shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full bg-warm-900 text-white py-3.5 text-[12px] tracking-[0.1em] uppercase font-sans font-medium hover:bg-warm-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-red-500 text-2xl">error</span>
                  </div>
                  <h2 className="font-serif text-3xl text-warm-900 mb-3">
                    Something went wrong
                  </h2>
                  <p className="font-sans text-sm text-warm-400 mb-8">
                    We couldn't send your booking. Please try again or call us directly.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setStep('form')}
                      className="w-full bg-warm-900 text-white py-3.5 text-[12px] tracking-[0.1em] uppercase font-sans font-medium hover:bg-warm-800 transition-colors"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleClose}
                      className="w-full border border-warm-200 text-warm-600 py-3.5 text-[12px] tracking-[0.1em] uppercase font-sans hover:bg-warm-100 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
