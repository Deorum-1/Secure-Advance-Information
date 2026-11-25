import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const prefersReducedMotion = useReducedMotion();
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ status: 'submitting', message: '' });

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      course: formData.get('course'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const contentType = response.headers.get('content-type') || '';
      let data = {};

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        await response.text();
        throw new Error(
          response.status === 404
            ? 'The email API is not available on this deployment.'
            : 'The email server returned an unexpected response.'
        );
      }

      if (!response.ok) {
        throw new Error(data.error || 'Your message could not be sent.');
      }

      event.currentTarget.reset();
      setSubmitState({
        status: 'success',
        message: 'Thank you. Your enquiry has been sent.',
      });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Your message could not be sent. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="bg-saiBlack rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2"
        >
          <div className="p-8 md:p-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-400 mb-12 text-lg">
              Ready to upgrade your digital skills? Contact us today to find the perfect course for your goals.
            </p>
            <div className="space-y-8">
              {[
                { icon: Phone, label: "Call Us", val: "08167337873", href: "tel:+2348167337873" },
                { icon: Mail, label: "Email Us", val: "info@sai.com.ng", href: "mailto:info@sai.com.ng" },
                {
                  icon: MapPin,
                  label: "Visit Us",
                  val: "84, Orimerunmu Road, Olowotedo, Mowe, Ogun State",
                  href: "https://maps.google.com/?q=84+Orimerunmi+Road+Olowotedo+Mowe+Ogun+State",
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: prefersReducedMotion ? 0 : i * 0.12 }}
                  className="flex items-center group"
                >
                  <div className="w-12 h-12 bg-saiRed rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <a
                      href={item.href}
                      className="text-lg font-medium hover:text-red-300"
                      target={item.label === "Visit Us" ? "_blank" : undefined}
                      rel={item.label === "Visit Us" ? "noreferrer" : undefined}
                    >
                      {item.val}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 border-t border-white/10 pt-7">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                Follow us
              </h3>
              <nav aria-label="Social media" className="flex flex-wrap gap-3">
                {[
                  {
                    label: "TikTok",
                    href: "https://www.tiktok.com/@secureadvanceinformation?_r=1&_t=ZS-9AjcpgoKpgE",
                  },
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/sai_tech.ng/?__pwa=1",
                  },
                  {
                    label: "X",
                    href: "https://x.com/sec_tech26",
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/feed/update/urn:li:activity:7518579255535116288",
                  },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-saiRed hover:bg-saiRed hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="bg-gray-100 p-8 md:p-16">
            <motion.form
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.15 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saiRed focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saiRed focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-course" className="block text-sm font-medium text-gray-700 mb-2">Course of Interest</label>
                <select id="contact-course" name="course" required defaultValue="" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saiRed focus:border-transparent outline-none transition-all bg-white">
                  <option value="" disabled>Select a course</option>
                  <option>Basic Computer Training</option>
                  <option>Microsoft Office Training</option>
                  <option>Graphics Design</option>
                  <option>Web Design &amp; Development</option>
                  <option>Programming &amp; Software</option>
                  <option>Networking &amp; IT</option>
                  <option>Cybersecurity</option>
                  <option>Data Analysis</option>
                  <option>Corporate Training</option>
                  <option>Exam Preparation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea id="contact-message" name="message" rows="4" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saiRed focus:border-transparent outline-none transition-all" placeholder="Tell us about your goals..."></textarea>
              </div>
              <motion.button
                type="submit"
                disabled={submitState.status === 'submitting'}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="w-full py-4 bg-saiRed text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitState.status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
              </motion.button>
              {submitState.message && (
                <p
                  role="status"
                  className={`text-sm ${submitState.status === 'success' ? 'text-green-700' : 'text-red-700'}`}
                >
                  {submitState.message}
                </p>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
