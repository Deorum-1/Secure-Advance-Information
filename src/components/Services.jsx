import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";

const getServiceId = (title) =>
  `service-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const ServiceCard = ({ title, description, items, prefersReducedMotion }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isFlipped = isHovered || isPinned;

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsPinned((flipped) => !flipped);
    }
  };

  return (
    <div
      id={getServiceId(title)}
      className="h-full lg:h-[350px] lg:[perspective:1200px]"
    >
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:hidden">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-saiRed/10 text-saiRed">
          <ChevronRight size={22} aria-hidden="true" />
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-saiRed">
          Course offered
        </p>
        <h3 className="text-xl font-bold leading-snug text-slate-900">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {description}
        </p>
        <p className="mb-3 mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">
          Courses offered
        </p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-snug text-slate-700"
            >
              <ChevronRight
                size={15}
                className="mt-0.5 flex-shrink-0 text-saiRed"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
      <div className="hidden h-full lg:block">
        <div
          role="button"
          tabIndex={0}
          aria-label={`${isFlipped ? "Hide" : "Show"} details for ${title}`}
          aria-pressed={isPinned}
          onClick={() => setIsPinned((flipped) => !flipped)}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          className="h-full cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-4 focus-visible:ring-saiRed/40"
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.85,
              ease: "easeInOut",
            }}
            className="relative h-full w-full rounded-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              aria-hidden={isFlipped}
              className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-saiRed/10 text-saiRed">
                <ChevronRight size={22} aria-hidden="true" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-saiRed">
                Course offered
              </p>
              <h3 className="text-xl font-bold leading-snug text-slate-900">
                {title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>

            <div
              aria-hidden={!isFlipped}
              className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white shadow-lg"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="mb-4 flex items-center gap-2 text-cyan-200">
                <ArrowLeft size={17} aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Course details
                </span>
              </div>
              <h3 className="text-lg font-bold leading-snug">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {description}
              </p>
              <p className="mb-3 mt-5 text-xs font-bold uppercase tracking-wider text-cyan-200">
                Courses offered
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-snug text-slate-200"
                  >
                    <ChevronRight
                      size={15}
                      className="mt-0.5 flex-shrink-0 text-cyan-300"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const prefersReducedMotion = useReducedMotion();

  const services = [
    {
      title: "Basic Computer Training",
      description: "Foundation for digital literacy",
      items: [
        "Introduction to computers",
        "Keyboarding & Typing",
        "Windows & File Management",
        "Internet & Email",
      ],
    },
    {
      title: "Microsoft Office Training",
      description: "Professional productivity suite",
      items: [
        "MS Word (Documents)",
        "MS Excel (Data Analysis)",
        "MS PowerPoint (Presentations)",
        "MS Access Fundamentals",
      ],
    },
    {
      title: "Graphics Design",
      description: "Visual communication & branding",
      items: [
        "CorelDRAW & Photoshop",
        "Logo & Flyer Design",
        "Poster & Business Cards",
        "Digital Marketing Graphics",
      ],
    },
    {
      title: "Web Design & Development",
      description: "Building the modern web",
      items: [
        "HTML & CSS",
        "JavaScript Introduction",
        "Website Management",
        "CMS & Publishing",
      ],
    },
    {
      title: "Programming & Software",
      description: "Developing software solutions",
      items: [
        "Python Fundamentals",
        "Web App Development",
        "Database Management",
        "Logical Thinking",
      ],
    },
    {
      title: "Networking & IT",
      description: "Infrastructure & Support",
      items: [
        "Network Installation",
        "Routers & Switches",
        "Troubleshooting",
        "Systems Administration",
      ],
    },
    {
      title: "Cybersecurity",
      description: "Protecting digital assets",
      items: [
        "Online Safety",
        "Data Protection",
        "Identity Protection",
        "Threat Awareness",
      ],
    },
    {
      title: "Data Analysis",
      description: "Turning data into insights",
      items: [
        "Excel for Data Analysis",
        "Information Management",
        "Data Visualization",
        "Business Reporting",
      ],
    },
    {
      title: "Corporate Training",
      description: "Tailored for organizations",
      items: [
        "Staff Skills Development",
        "Office Productivity",
        "ICT Workshops",
        "Corporate Awareness",
      ],
    },
    {
      title: "Exam Preparation",
      description: "Success in CBT exams",
      items: [
        "CBT Practice",
        "Typing Speed Improvement",
        "Online Exam Familiarization",
        "Literacy Assessments",
      ],
    },
  ];

  return (
    <section id="services" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-saiRed">
            Explore what you can learn
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Our Specialized Services
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-saiRed" />
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            We provide a wide range of practical computer education designed to
            equip you for today's competitive environment.
          </p>
        </motion.div>
        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.65,
                delay: prefersReducedMotion ? 0 : (i % 4) * 0.1,
              }}
              className="h-full"
            >
              <ServiceCard {...s} prefersReducedMotion={prefersReducedMotion} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
