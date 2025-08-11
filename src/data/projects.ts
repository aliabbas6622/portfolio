export type Project = {
  title: string
  description: string
  href?: string
  gradient?: string
  tags?: string[]
  repo?: string
  demo?: string
}

export const projects: Project[] = [
  {
    title: 'AI Chat Assistant',
    description: 'Custom conversational interface with prompt orchestration, context memory, and clean UI animations.',
    href: '#',
    gradient: 'from-indigo-300/60 to-cyan-300/60',
    tags: ['React', 'TypeScript', 'OpenAI'],
    repo: 'https://github.com/aliabbas6622',
  },
  {
    title: 'Portfolio Website',
    description: 'Responsive, accessible, and fast personal site with micro-interactions and modern theming.',
    href: '#',
    gradient: 'from-cyan-300/60 to-sky-300/60',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    repo: 'https://github.com/aliabbas6622',
  },
  {
    title: 'Task Flow Optimizer',
    description: 'Workflow automation with AI suggestions to reduce repetitive operations and increase throughput.',
    href: '#',
    gradient: 'from-sky-300/60 to-indigo-300/60',
    tags: ['Node', 'LangChain', 'UX'],
    repo: 'https://github.com/aliabbas6622',
  },
]
