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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
          <a 
            href="https://www.amazon.com/You-Can-Start-Now-Breaking-ebook/dp/B095NH6Z2Z"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow block"
          >
            <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative">
               {/* Replace with actual book cover image if available */}
               <img 
                  src="https://m.media-amazon.com/images/I/71DlV09ughS._SL1500_.jpg" 
                  alt="You Can Start Now: Breaking The Myths of Success"
                  className="w-full h-full object-cover"
                />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              You Can Start Now: Breaking The Myths of Success
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A guide to breaking the myths of success and starting your journey today.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">By Daniel Ishaku</p>
          </a>
        </div>
      </div>
    </section>
  )
}