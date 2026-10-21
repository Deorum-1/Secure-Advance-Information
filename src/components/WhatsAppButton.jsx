import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

const WhatsAppButton = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href="https://wa.me/2348167337873"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      animate={
        prefersReducedMotion
          ? undefined
          : { scale: [1, 1.08, 1], y: [0, -3, 0] }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut',
            }
      }
      whileHover={prefersReducedMotion ? undefined : { scale: 1.12 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg focus-visible:outline-white"
    >
      <MessageCircle size={30} strokeWidth={2.5} aria-hidden="true" />
      <Phone
        size={14}
        strokeWidth={3}
        aria-hidden="true"
        className="absolute"
      />
    </motion.a>
  );
};

export default WhatsAppButton;
