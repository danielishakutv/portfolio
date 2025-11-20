"use client";

import { useState } from "react";
import { projects, ProjectItem } from "../../lib/projects";
import { ExternalLink, LayoutGrid, List, Github } from "lucide-react";

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <main className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">All Projects</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Explore a broader collection of platforms, institutional properties, media brands, and technology initiatives I have architected, built, or contributed to over the years.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("grid")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors border ${view === "grid" ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
              aria-pressed={view === "grid"}
            >
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-colors border ${view === "list" ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
              aria-pressed={view === "list"}
            >
              <List className="w-4 h-4" /> List
            </button>
          </div>
        </div>

        {view === "grid" ? <GridView items={projects} /> : <ListView items={projects} />}
      </div>
    </main>
  );
}

function GridView({ items }: { items: ProjectItem[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((project) => (
        <div
          key={project.slug}
          className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
        >
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <img
              src={`https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1200`}
              alt={`${project.title} website screenshot`}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-500 text-sm">Preview unavailable</div>';
                }
              }}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-medium hover:gap-3 transition-all"
              >
                Visit Site <ExternalLink className="w-4 h-4" />
              </a>
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-gray-200"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              )}
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{project.category} • {project.year}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListView({ items }: { items: ProjectItem[] }) {
  return (
    <ul className="space-y-6">
      {items.map((project) => (
        <li
          key={project.slug}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.slice(0, 8).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{project.category} • {project.year}</div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-medium hover:gap-3 transition-all"
              >
                Visit <ExternalLink className="w-4 h-4" />
              </a>
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-gray-200"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
