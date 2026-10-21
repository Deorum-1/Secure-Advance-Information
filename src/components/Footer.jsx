import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Footer = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.footer
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
      className="bg-gray-900 py-10 text-white sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center gap-7 border-b border-gray-800 pb-7 sm:mb-8 sm:pb-8 md:flex-row md:items-start md:justify-between">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <img src="/logo-footer.png" alt="SAI Logo" className="mb-3 h-10 w-auto sm:mb-4" onError={(e) => { e.target.style.display = 'none' }} />
            <p className="max-w-xs text-sm text-gray-400">
              Building Digital Skills for a Better Future.
            </p>
          </motion.div>
          <nav aria-label="Footer navigation" className="grid w-full max-w-sm grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3 md:w-auto md:justify-end">
            {[
              ['#home', 'Home'],
              ['#about', 'About'],
              ['#featured-courses', 'Courses'],
              ['#services', 'Services'],
              ['#testimonials', 'Testimonials'],
              ['#contact', 'Contact'],
            ].map(([href, label], index) => (
              <motion.a
                key={href}
                href={href}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : index * 0.06 }}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className="rounded text-center text-sm text-gray-400 transition-colors hover:text-white focus-visible:text-white sm:text-left"
              >
                {label}
              </motion.a>
            ))}
          </nav>
        </div>
        <div className="px-2 text-center text-xs leading-relaxed text-gray-500 sm:px-0 sm:text-sm">
          © {new Date().getFullYear()} Secure Advance Information Computer Training Centre. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
