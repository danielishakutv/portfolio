import projectsData from "../data/projects.json";

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  url: string;
  category: string;
  year: number;
  technologies: string[];
  repository: string | null;
}

export const projects: ProjectItem[] = projectsData as ProjectItem[];

export function getFeaturedProjects(limit: number = 10): ProjectItem[] {
  return projects.slice(0, limit);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find(p => p.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(projects.map(p => p.category))).sort();
}
