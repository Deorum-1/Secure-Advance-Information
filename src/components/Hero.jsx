import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronRight, CheckCircle, Zap } from 'lucide-react';

const Hero = () => {
  // Mouse tracking for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize to range [-0.5, 0.5]
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="home" className="relative isolate overflow-hidden bg-slate-950 pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to bottom, black, transparent 90%)',
        }}
      >
        <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-saiRed/20 blur-[120px]" />
        <div className="absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-cyan-500/15 blur-[120px]" />
        <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M0 190H250L310 250H490M1440 150H1240L1180 210H1050M0 700H180L240 640H390M1440 680H1280L1210 610H1100" stroke="#38BDF8" strokeOpacity=".55" />
          <path d="M250 190V115H370M1240 150V90H1130M180 700V790H300M1280 680V780H1170" stroke="#ED1C24" strokeOpacity=".65" />
          <circle cx="490" cy="250" r="4" fill="#38BDF8" />
          <circle cx="1050" cy="210" r="4" fill="#38BDF8" />
          <circle cx="390" cy="640" r="4" fill="#ED1C24" />
          <circle cx="1100" cy="610" r="4" fill="#ED1C24" />
        </svg>
        {!prefersReducedMotion && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.15, 0.6, 0.15]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-300/10 text-cyan-200 text-sm font-bold mb-6 border border-cyan-200/20"
            >
              <Zap size={16} className="mr-2 text-cyan-300" />
              Begin Your Journey To a Digital Future
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6"
            >
              Empowering Your Future <br />
              <span className="text-saiRed relative inline-block">
                Digital Skills
                <motion.span
                  initial={prefersReducedMotion ? false : { width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: prefersReducedMotion ? 0 : 1, duration: prefersReducedMotion ? 0 : 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-saiRed/20 -z-10"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.5 }}
              className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Secure Advance Information Computer Training Centre provides quality, accessible, and practical ICT training designed to bridge the digital gap and prepare you for the modern economy.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
            >
              <motion.a
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                href="#services"
                className="flex items-center justify-center px-8 py-4 bg-saiRed text-white rounded-full font-bold text-lg hover:bg-red-700 transition-all group shadow-lg shadow-saiRed/30"
              >
                Explore Our Courses
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -5 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                href="#contact"
                className="flex items-center justify-center px-8 py-4 bg-white/5 text-white border-2 border-white/20 rounded-full font-bold text-lg hover:border-cyan-300 hover:text-cyan-200 transition-all"
              >
                Contact Our Experts
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 3D Visual Composition */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            className="relative hidden lg:block"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="relative w-full h-[600px]"
            >
              {/* Primary Card */}
              <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-3/4 h-3/4 z-20"
                style={{ translateZ: "50px" }}
              >
                <div className="relative h-full w-full">
                  <img
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Training"
                    className="w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-white"
                  />
                  {/* Floating Badge */}
                  <div className={`absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-30 flex items-center gap-3 ${prefersReducedMotion ? '' : 'animate-bounce-slow'}`}
                       style={{ transform: "translateZ(30px)" }}>
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-500 font-bold uppercase">Certified</p>
                      <p className="text-sm font-black text-slate-900">Industry Standard</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Accent Card 1 */}
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-0 w-1/2 h-1/2 z-30"
                style={{ translateZ: "100px" }}
              >
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Collaboration"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-white"
                />
              </motion.div>

              {/* Accent Card 2 */}
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-20 right-10 w-1/3 h-1/3 z-10"
                style={{ translateZ: "-50px" }}
              >
                <img
                  src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Expert"
                  className="w-full h-full object-cover rounded-3xl shadow-xl border-8 border-white"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
