import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquareQuote, Pause, Play } from "lucide-react";

const testimonialPrompts = [
  {
    title: "Your learning journey",
    feedback:
      "My Learning Journey is more about developing my skills and using it to build a successful career",
    name: "Akinwole Abraham",
  },
  {
    title: "Skills you gained",
    feedback:
      "I enjoyed learning new skills,practicing them, and building projects that I am proud of.",
    name: "Ebaju Deborah Chioma",
  },
  {
    title: "Advice for future learners",
    feedback:
      "I would tell them to take the course and invest in their learning journey. It is worth it.",
    name: "Adeyemi Ayomide",
  },
  {
    title: "Your favourite moment",
    feedback:
      "My favourite moment was when I completed my first project in graphics design and received positive feedback from my mentor.",
    name: "Ilori Deborah",
  },
];

const TestimonialCard = ({ item }) => (
  <article className="flex min-h-56 w-full flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg lg:mx-3 lg:w-80 lg:shrink-0">
    <MessageSquareQuote
      size={26}
      className="mb-4 text-saiRed"
      aria-hidden="true"
    />
    <p className="flex-1 text-base leading-relaxed text-slate-700">
      “{item.feedback}”
    </p>
    <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
      <p className="font-semibold text-slate-900">{item.name}</p>
      <span className="rounded-full bg-saiRed/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-saiRed">
        {item.title}
      </span>
    </div>
  </article>
);

const TestimonialMarqueeRow = ({
  items,
  reverse = false,
  label,
  prefersReducedMotion,
  isPaused,
}) => (
  <div
    className="testimonial-marquee group relative overflow-hidden py-3"
    role="group"
    aria-label={label}
  >
    <div
      data-paused={isPaused}
      className={`testimonial-marquee-track${reverse ? " testimonial-marquee-reverse" : ""}`}
    >
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent sm:w-20"
        />
      </>
    )}
  </div>
);

const Testimonials = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-slate-50 py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgba(237,28,36,0.08),transparent_38%),radial-gradient(ellipse_at_88%_78%,rgba(6,182,212,0.08),transparent_38%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            Hear directly from learners about the skills, projects, and experiences that matter to them.
          </p>
        </motion.div>

        <div
          role="region"
          aria-label="Student testimonials"
        >
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
            {!prefersReducedMotion && (
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPaused((paused) => !paused)}
                  aria-pressed={isPaused}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-saiRed hover:text-saiRed"
                >
                  {isPaused ? (
                    <Play size={16} aria-hidden="true" />
                  ) : (
                    <Pause size={16} aria-hidden="true" />
                  )}
                  {isPaused ? "Resume stories" : "Pause stories"}
                </button>
              </div>
            )}
            <TestimonialMarqueeRow
              items={testimonialPrompts}
              label="Student testimonials, scrolling left"
              prefersReducedMotion={prefersReducedMotion}
              isPaused={isPaused}
            />
            <TestimonialMarqueeRow
              items={[...testimonialPrompts].reverse()}
              reverse
              label="More student testimonials, scrolling right"
              prefersReducedMotion={prefersReducedMotion}
              isPaused={isPaused}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
