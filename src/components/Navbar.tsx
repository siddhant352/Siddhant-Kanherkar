import { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Health Library', href: '#library' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm z-10 shrink-0">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ayur-green flex items-center justify-center text-ayur-gold shrink-0 font-bold text-xl">
              <Stethoscope size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-ayur-dark-green leading-tight">
                Dr. Maheshwari Kanherkar
              </h1>
              <p className="text-[11px] text-ayur-dark-gold font-semibold tracking-wider uppercase">
                BAMS Doctor • Ayurvedic Consultant
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={idx === 0 ? "text-ayur-green border-b-2 border-ayur-green" : "hover:text-ayur-green transition-colors"}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-sm font-bold text-ayur-dark-green">7030019036</span>
            <a href="tel:7030019036" className="bg-ayur-green text-white px-4 py-2 rounded text-sm font-semibold shadow-md hover:bg-green-800 transition-colors">
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-ayur-green"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-ayur-cream z-50 flex flex-col pt-20 px-6"
          >
            <button 
              className="absolute top-6 right-6 text-ayur-green"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <nav className="flex flex-col gap-6 text-xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className="font-medium text-gray-800 border-b border-gray-200 pb-2"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto pb-12 flex flex-col gap-4">
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }} className="flex items-center justify-center gap-2 bg-ayur-green text-white px-6 py-4 rounded-xl font-semibold">
                <Calendar size={20} />
                BOOK FREE CONSULTATION
              </a>
              <a href="tel:7030019036" className="flex items-center justify-center gap-2 border-2 border-ayur-green text-ayur-green px-6 py-4 rounded-xl font-semibold">
                <Phone size={20} />
                CALL 7030019036
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
