"use client";

import { motion } from "framer-motion";
import { Envelope, LinkedinLogo, GithubLogo } from "@phosphor-icons/react";

export default function ContactSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Split layout - asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none sticky top-8">
              Let's Build
              <span className="block text-emerald-500 mt-2">Something Great</span>
            </h2>
          </motion.div>

          {/* Right: Contact form + links */}
          <div className="space-y-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-base text-zinc-400 leading-relaxed max-w-[65ch]"
            >
              Currently exploring new opportunities in game direction, creative
              leadership, and AAA production. Open to remote, hybrid, or
              Seattle-area positions.
            </motion.p>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Email input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-all duration-300"
                />
              </div>

              {/* Message textarea */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-zinc-950 font-semibold rounded-lg transition-all duration-300 hover:bg-emerald-400 active:-translate-y-[1px]"
              >
                Send Message
                <Envelope weight="bold" size={20} />
              </motion.button>
            </motion.form>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              className="pt-8 border-t border-zinc-800/50"
            >
              <p className="text-sm text-zinc-500 mb-4">Connect elsewhere</p>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <LinkedinLogo weight="fill" size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <GithubLogo weight="fill" size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:mberman47@gmail.com"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <Envelope weight="fill" size={24} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
