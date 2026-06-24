import { numberedProjects } from "@/config/projects";
import { ProjectEntry } from "@/components/project-entry";

export function ProjectsSection() {
  const entries = numberedProjects();

  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="eyebrow">The log</h2>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      <div>
        {entries.map(({ project, number }) => (
          <ProjectEntry
            key={project.slug}
            project={project}
            number={number}
          />
        ))}
      </div>
    </section>
  );
}
