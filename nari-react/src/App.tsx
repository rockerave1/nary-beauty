import { BookingProvider } from './hooks/useBooking';
import { BookingModal } from './components/ui/BookingModal';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/ui/Hero';
import { Intro } from './components/ui/Intro';
import { Rituals } from './components/ui/Rituals';
import { Gallery } from './components/ui/Gallery';
import { Testimonials } from './components/ui/Testimonials';
import { Membership } from './components/ui/Membership';

export default function App() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Rituals />
        <Gallery />
        <Testimonials />
        <Membership />
      </main>
      <Footer />
      <BookingModal />
    </BookingProvider>
  );
}
