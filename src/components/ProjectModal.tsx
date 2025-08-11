import { X, Github, ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-2xl border border-slate-300 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="muted mt-1 text-sm">{project.description}</p>
          </div>
          <button aria-label="Close" onClick={onClose} className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>
        {project.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="badge text-xs">{t}</span>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          {project.repo && (
            <a className="btn btn-ghost" href={project.repo} target="_blank" rel="noreferrer"><Github className="mr-2 h-4 w-4" /> Repo</a>
          )}
          {project.demo && (
            <a className="btn btn-ghost" href={project.demo} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Demo</a>
          )}
        </div>
      </div>
    </div>
  )
}
