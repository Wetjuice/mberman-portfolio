"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const projects = [
  {
    title: "Days Gone",
    role: "Director",
    year: "2019",
    description:
      "Led a team of 6 direct reports through the final production phase of Sony's AAA open-world survival game. Shipped to critical acclaim and millions of players worldwide.",
    tags: ["Leadership", "AAA Production", "Open World"],
  },
  {
    title: "Uncharted: Golden Abyss",
    role: "Systems Designer",
    year: "2011",
    description:
      "Designed core gameplay systems for PlayStation Vita's flagship launch title. Collaborated with Naughty Dog to maintain franchise quality standards.",
    tags: ["Systems Design", "Franchise", "Platform Launch"],
  },
  {
    title: "Resistance: Burning Skies",
    role: "Senior Designer",
    year: "2012",
    description:
      "Owned weapon systems and combat balance for PlayStation Vita's first-person shooter. Optimized gameplay for handheld platform constraints.",
    tags: ["FPS", "Combat Design", "Vita"],
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section header - asymmetric */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter leading-none"
            >
              Featured Projects
            </motion.h2>
          </div>
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-base text-zinc-400 leading-relaxed max-w-[65ch]"
            >
              A selection of shipped titles from 16+ years in AAA game development.
              From systems design to game direction.
            </motion.p>
          </div>
        </div>

        {/* Project cards - staggered reveal */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="relative rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 p-8 md:p-12 overflow-hidden transition-all duration-500 hover:border-emerald-500/30">
                {/* Grid layout for asymmetry */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                  {/* Content */}
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-baseline gap-4">
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {project.title}
                      </h3>
                      <span className="text-sm text-zinc-500 font-mono">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-base text-zinc-400 leading-relaxed max-w-[65ch]">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 rounded-full border border-emerald-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta - right aligned */}
                  <div className="flex flex-col justify-between items-end text-right">
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500 uppercase tracking-wider font-mono">
                        Role
                      </p>
                      <p className="text-lg font-semibold text-zinc-200">
                        {project.role}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-8 md:mt-0 inline-flex items-center gap-2 text-sm font-medium text-emerald-500 group-hover:text-emerald-400 transition-colors"
                    >
                      View Details
                      <ArrowUpRight
                        weight="bold"
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
