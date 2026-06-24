import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

// The homepage is just the sections stacked. Each section owns its own
// container width and spacing, so reordering is as simple as moving a line.
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
