import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.nav
      initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: 'easeOut' }}
      className="bg-white shadow-md fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <a href="#home" className="flex min-w-0 flex-shrink items-center gap-3">
            <img
              className="h-12 w-auto flex-shrink-0"
              src="/logo.png"
              alt=""
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150x50?text=SAI+Logo' }}
            />
            <span className="hidden min-w-0 text-sm font-bold leading-tight text-slate-900 md:block md:text-base">
              Secure Advance Information
              <span className="mt-1 block text-xs font-medium text-gray-500 sm:text-sm">
                Computer Training Centre
              </span>
            </span>
          </a>
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-saiRed font-medium transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-saiRed font-medium transition-colors">About Us</a>
            <a href="#featured-courses" className="text-gray-700 hover:text-saiRed font-medium transition-colors">Courses</a>
            <a href="#services" className="text-gray-700 hover:text-saiRed font-medium transition-colors">Services</a>
            <a href="#testimonials" className="text-gray-700 hover:text-saiRed font-medium transition-colors">Testimonials</a>
            <a href="#contact" className="bg-saiRed text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-all">Get Started</a>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 rounded-md p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saiRed"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
        <motion.div
          id="mobile-navigation"
          initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: 'easeInOut' }}
          className="lg:hidden overflow-hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              ['#home', 'Home'],
              ['#about', 'About Us'],
              ['#featured-courses', 'Courses'],
              ['#services', 'Services'],
              ['#testimonials', 'Testimonials'],
              ['#contact', 'Get Started'],
            ].map(([href, label], index) => (
              <motion.a
                key={href}
                onClick={() => setIsOpen(false)}
                href={href}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: prefersReducedMotion ? 0 : index * 0.04 }}
                className={`block rounded-md px-3 py-2 ${
                  href === '#contact'
                    ? 'bg-saiRed font-bold text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
