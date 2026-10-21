import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Code2, Monitor, Presentation } from 'lucide-react';

const courses = [
  {
    icon: Monitor,
    title: 'Basic Computer Training',
    description: 'Build confidence with computer fundamentals, file management, typing, internet, and email.',
    level: 'Start with the essentials',
    serviceId: 'service-basic-computer-training',
  },
  {
    icon: Presentation,
    title: 'Microsoft Office Training',
    description: 'Learn practical tools for creating documents, working with spreadsheets, and presenting ideas.',
    level: 'Develop workplace skills',
    serviceId: 'service-microsoft-office-training',
  },
  {
    icon: Code2,
    title: 'Web Design & Development',
    description: 'Explore HTML, CSS, JavaScript, and the foundations of building and managing websites.',
    level: 'Create for the web',
    serviceId: 'service-web-design-development',
  },
];

const FeaturedCourses = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
  <section id="featured-courses" className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        className="max-w-3xl mx-auto mb-12 text-center"
      >
        <p className="text-sm font-bold uppercase tracking-wider text-saiRed">Learn by doing</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Featured Courses</h2>
        <div className="w-20 h-1.5 bg-saiRed mx-auto mt-4 rounded-full" />
        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          Build practical digital skills with training designed to help you take your next step.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {courses.map(({ icon: Icon, title, description, level, serviceId }, index) => (
          <motion.article
            key={title}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : index * 0.12 }}
            whileHover={prefersReducedMotion ? undefined : { y: -6 }}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-saiRed/10 text-saiRed">
              <motion.span
                whileHover={prefersReducedMotion ? undefined : { rotate: 8, scale: 1.1 }}
                className="inline-flex"
              >
                <Icon size={24} aria-hidden="true" />
              </motion.span>
            </div>
            <p className="mb-2 text-sm font-semibold text-saiRed">{level}</p>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-slate-600">{description}</p>
            <p className="mt-4 text-sm text-slate-500">
              Contact us for current schedules, fees, delivery options, and prerequisites.
            </p>
            <a
              href={`#${serviceId}`}
              className="mt-6 inline-flex items-center gap-2 font-semibold text-saiRed hover:text-red-700"
            >
              View course details
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <motion.a
          href="#contact"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          className="inline-flex items-center justify-center rounded-full bg-saiRed px-7 py-3 font-bold text-white transition-colors hover:bg-red-700"
        >
          Ask about enrollment
        </motion.a>
      </div>
    </div>
  </section>
  );
};

export default FeaturedCourses;
