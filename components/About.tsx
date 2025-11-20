export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate about technology and innovation, with a track record of building successful digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              I am a seasoned web developer and IT consultant with over a decade of experience in creating innovative digital solutions. My journey spans from building enterprise applications to launching successful startups, always with a focus on user-centered design and scalable architecture.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Beyond coding, I'm passionate about sharing knowledge through writing and speaking. I've authored books on web development and regularly speak at tech conferences across Africa and beyond.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              When I'm not coding, you can find me exploring new technologies, mentoring aspiring developers, or working on my latest entrepreneurial venture.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Expertise</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Full-stack web development</li>
                <li>• IT consulting and strategy</li>
                <li>• Startup incubation</li>
                <li>• Technical writing and education</li>
                <li>• Digital transformation</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'Python', 'AWS', 'Docker'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}