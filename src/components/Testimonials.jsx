import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

const testimonialPrompts = [
  {
    title: 'Your learning journey',
    prompt: 'Share what your course experience was like.',
  },
  {
    title: 'Skills you gained',
    prompt: 'Tell us what new skills or projects you are proud of.',
  },
  {
    title: 'Advice for future learners',
    prompt: 'What would you tell someone considering a course?',
  },
  {
    title: 'Your favourite moment',
    prompt: 'Let us know what you enjoyed most about learning with us.',
  },
];

const TestimonialCard = ({ item }) => (
  <article className="flex min-h-44 w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md lg:mx-3 lg:w-72 lg:shrink-0">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-saiRed/10 text-saiRed">
        <MessageSquareQuote size={20} aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold text-slate-900">Student testimonial</p>
        <p className="text-xs text-slate-500">Placeholder — feedback coming soon</p>
      </div>
    </div>
    <p className="text-xs font-bold uppercase tracking-wider text-saiRed">{item.title}</p>
    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.prompt}</p>
    <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
      Genuine student feedback will appear here once provided.
    </p>
  </article>
);

const TestimonialMarqueeRow = ({ items, reverse = false, label, prefersReducedMotion }) => (
  <div className="testimonial-marquee group relative overflow-hidden py-3" role="group" aria-label={label}>
    <div className={`testimonial-marquee-track${reverse ? ' testimonial-marquee-reverse' : ''}`}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="testimonial-marquee-group flex shrink-0"
          aria-hidden={copy === 1}
        >
          {items.map((item) => (
            <TestimonialCard key={item.title} item={item} />
          ))}
        </div>
      ))}
    </div>
    {!prefersReducedMotion && (
      <>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent sm:w-20" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent sm:w-20" />
      </>
    )}
  </div>
);

const Testimonials = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="testimonials" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-saiRed">
            Student stories
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Testimonials
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-saiRed" />
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            We look forward to sharing feedback from our students here.
          </p>
        </motion.div>

        <div role="region" aria-roledescription="testimonial carousel" aria-label="Student testimonial placeholders">
          <div className="mx-auto flex max-w-xl flex-col gap-4 px-4 lg:hidden">
            {testimonialPrompts.map((item, index) => (
              <motion.div
                key={item.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                }}
              >
                <TestimonialCard item={item} />
              </motion.div>
            ))}
          </div>
          <div className="hidden lg:block">
            <TestimonialMarqueeRow
              items={testimonialPrompts}
              label="Student testimonial placeholders, scrolling left"
              prefersReducedMotion={prefersReducedMotion}
            />
            <TestimonialMarqueeRow
              items={[...testimonialPrompts].reverse()}
              reverse
              label="More student testimonial placeholders, scrolling right"
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
