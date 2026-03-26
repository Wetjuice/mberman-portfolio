import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="relative py-12 border-t border-zinc-800/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-500 font-mono">
              © 2026 Mike Berman. Built with taste-skill.
            </p>
            <p className="text-sm text-zinc-500">
              Design System: VARIANCE=8 / MOTION=6 / DENSITY=4
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
