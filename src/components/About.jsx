import React from "react";
import { motion, useReducedMotion } from "framer-motion";

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
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About Secure Advance Information
          </h2>
          <div className="w-20 h-1.5 bg-saiRed mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-gray-600 leading-relaxed text-lg">
            Secure Advance Information is a trusted ICT and computer training
            centre in Mowe, Ogun State, committed to helping individuals and
            businesses build the practical digital skills needed to thrive in a
            fast-changing world. We create a supportive learning environment
            where students gain confidence, competence, and the technical
            knowledge to succeed in their careers and everyday life.
          </p>
        </motion.div>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="mb-16"
        >
          <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-3xl bg-slate-950 shadow-2xl">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay={!prefersReducedMotion}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source
                src={`${process.env.PUBLIC_URL}/videos/secure-advance-info.mp4`}
                type="video/mp4"
              />
            </video>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Vision",
              text: "To become a leading computer and ICT training centre in Nigeria, recognized for excellence in digital skills development, innovation, and professional growth.",
            },
            {
              title: "Our Mission",
              text: "To provide practical, affordable, and accessible ICT training that equips individuals and organizations with the digital expertise needed for real-world success.",
            },
            {
              title: "Our Values",
              text: "Excellence, integrity, innovation, empowerment, and hands-on learning are at the heart of everything we do.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : i * 0.2,
              }}
              className="p-8 bg-gray-50 rounded-xl border-b-4 border-saiRed hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
