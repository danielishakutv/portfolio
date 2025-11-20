export default function Books() {
  return (
    <section id="books" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Books
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sharing knowledge through published works on web development and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Book Cover</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Mastering Modern Web Development
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A comprehensive guide to building scalable web applications with modern technologies.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Published 2023</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Book Cover</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              The Entrepreneur's Guide to Tech Startups
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Practical insights for launching and scaling technology companies in emerging markets.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Published 2022</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Book Cover</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Digital Transformation in Africa
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Case studies and strategies for implementing digital solutions in African businesses.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Published 2021</p>
          </div>
        </div>
      </div>
    </section>
  )
}