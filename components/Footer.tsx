import { Github, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Work', href: '/projects' },
    { name: 'Speaking', href: '/#speaking' },
    { name: 'Contact', href: '/contact' },
  ]

  const handle = 'danieishakutv' // social handle requested

  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const hrefFor = (href: string) => (href.startsWith('http') ? href : base + href)

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-3">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">DI.</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm">
              Building innovative tech solutions and empowering others through knowledge sharing and entrepreneurship.
            </p>
          </div>

          <nav className="flex flex-col sm:flex-row sm:flex-wrap gap-3 md:justify-center">
            {links.map((l) => (
              <a
                key={l.name}
                href={hrefFor(l.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {l.name}
              </a>
            ))}
          </nav>

          <div className="flex md:justify-end items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">@{handle}</span>
              <a
                href={`https://github.com/${handle}`}
                aria-label={`GitHub @${handle}`}
                target="_blank"
                rel="noopener"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`https://linkedin.com/in/${handle}`}
                aria-label={`LinkedIn @${handle}`}
                target="_blank"
                rel="noopener"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`https://instagram.com/${handle}`}
                aria-label={`Instagram @${handle}`}
                target="_blank"
                rel="noopener"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500 dark:text-gray-400 text-center md:text-left">
          © {year} Daniel Ishaku. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
