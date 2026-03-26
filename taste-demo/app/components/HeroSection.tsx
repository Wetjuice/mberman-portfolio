"use client";

import { motion } from "framer-motion";
import { ArrowRight, GameController } from "@phosphor-icons/react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Asymmetric layout - DESIGN_VARIANCE=8 (no centered content) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.1,
            }}
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
              className="flex items-center gap-3"
            >
              <div className="h-[1px] w-12 bg-emerald-500"></div>
              <span className="text-sm uppercase tracking-wider text-zinc-400 font-mono">
                Game Director
              </span>
            </motion.div>

            {/* Headline - tracking-tighter, leading-none */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
                className="block text-zinc-50"
              >
                Mike Berman
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
                className="block text-emerald-500 mt-2"
              >
                Crafting Worlds
              </motion.span>
            </h1>

            {/* Body text - max-w-[65ch], leading-relaxed */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
              className="text-base text-zinc-400 leading-relaxed max-w-[65ch]"
            >
              16+ years at Sony Bend Studio, from Senior Systems Designer to Game
              Director. Led cross-functional teams building AAA open-world experiences
              played by millions.
            </motion.p>

            {/* CTA - with active state transform */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 20 }}
            >
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-zinc-950 font-semibold rounded-lg transition-all duration-300 hover:bg-emerald-400 active:scale-[0.98] active:-translate-y-[1px]">
                View Projects
                <ArrowRight
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={20}
                />
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Visual Asset */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
            }}
            className="relative"
          >
            {/* Floating card with liquid glass effect */}
            <div className="relative rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <GameController
                weight="thin"
                size={240}
                className="text-emerald-500/20 mx-auto"
              />
              
              {/* Accent glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50"></div>
            </div>

            {/* Floating particles - perpetual micro-interaction */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut",
              }}
              className="absolute top-8 -left-8 w-20 h-20 rounded-full bg-emerald-500/20 blur-2xl"
            ></motion.div>
            <motion.div
              animate={{
                y: [10, -10, 10],
                x: [5, -5, 5],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 -right-8 w-32 h-32 rounded-full bg-zinc-700/20 blur-3xl"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
