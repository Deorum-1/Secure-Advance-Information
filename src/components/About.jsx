import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

const About = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About Secure Advance Information</h2>
          <div className="w-20 h-1.5 bg-saiRed mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-gray-600 leading-relaxed text-lg">
            Based in Mowe, Ogun State, we are committed to empowering individuals with the digital skills and practical knowledge needed to succeed in today's technology-driven world.
          </p>
        </motion.div>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-16"
        >
          <div
            role="img"
            aria-label="Video introduction about Secure Advance Information coming soon"
            className="relative mx-auto flex aspect-video max-w-5xl items-center justify-center overflow-hidden rounded-3xl bg-slate-950 shadow-2xl"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_20%,rgba(237,28,36,0.3),transparent_45%),radial-gradient(ellipse_at_80%_75%,rgba(6,182,212,0.24),transparent_45%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative z-10 flex max-w-md flex-col items-center px-6 text-center text-white">
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { rotate: -6, scale: 1.08 }}
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-cyan-200 backdrop-blur-sm"
              >
                <Clapperboard size={28} aria-hidden="true" />
              </motion.div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
                Meet our training centre
              </p>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">Introduction video coming soon</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                A closer look at our learning experience will be available here.
              </p>
            </div>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Our Vision", text: "To become a leading computer and ICT training centre in Nigeria, recognized for excellence in digital skills development, innovation, and professional training." },
            { title: "Our Mission", text: "To deliver quality, affordable, and practical computer and ICT training that empowers individuals and organizations with digital competencies." },
            { title: "Core Values", text: "Excellence & Integrity, Innovation & Empowerment, Practical Learning" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : i * 0.2 }}
              className="p-8 bg-gray-50 rounded-xl border-b-4 border-saiRed hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
