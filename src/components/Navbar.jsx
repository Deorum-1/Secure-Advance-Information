import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  ['#home', 'Home'],
  ['#about', 'About Us'],
  ['#featured-courses', 'Courses'],
  ['#services', 'Services'],
  ['#testimonials', 'Testimonials'],
  ['#contact', 'Get Started'],
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const prefersReducedMotion = useReducedMotion();
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopMediaQuery.addEventListener('change', closeOnDesktop);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      desktopMediaQuery.removeEventListener('change', closeOnDesktop);
    };
  }, [isOpen]);

  useEffect(() => {
    const sections = navItems
      .map(([href]) => document.querySelector(href))
      .filter(Boolean);

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.35;
      const currentSection = sections.find((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        return top <= marker && bottom > marker;
      });

      if (currentSection) {
        setActiveSection(`#${currentSection.id}`);
      }
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: '-30% 0px -65% 0px',
    });

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 bg-white shadow-md"
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
                Building Digital Skill for a Better Future
              </span>
            </span>
          </a>
          <div className="hidden items-center space-x-8 lg:flex">
            {navItems.map(([href, label]) => {
              const isActive = activeSection === href;
              const isCta = href === '#contact';

              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? 'location' : undefined}
                  className={
                    isCta
                      ? `rounded-full bg-saiRed px-6 py-2 font-bold text-white transition-all hover:bg-red-700 ${
                          isActive ? 'ring-2 ring-saiRed ring-offset-2' : ''
                        }`
                      : `relative py-2 font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-saiRed after:transition-transform hover:text-saiRed ${
                          isActive
                            ? 'text-saiRed after:scale-x-100'
                            : 'text-gray-700'
                        }`
                  }
                >
                  {label}
                </a>
              );
            })}
          </div>
          <div className="flex items-center lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
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
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain border-t bg-white lg:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navItems.map(([href, label], index) => {
                const isActive = activeSection === href;
                const isCta = href === '#contact';

                return (
                  <motion.a
                    key={href}
                    onClick={() => setIsOpen(false)}
                    href={href}
                    aria-current={isActive ? 'location' : undefined}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.2,
                      delay: prefersReducedMotion ? 0 : index * 0.04,
                    }}
                    className={`block rounded-md px-3 py-3 transition-colors ${
                      isCta
                        ? `font-bold text-white ${
                            isActive ? 'bg-red-700' : 'bg-saiRed'
                          }`
                        : isActive
                          ? 'bg-red-50 font-semibold text-saiRed'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
