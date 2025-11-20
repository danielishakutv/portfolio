'use client'

import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Hi, I'm Daniel Ishaku
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Web Developer • IT Consultant • Author • Techpreneur
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
              Building innovative tech solutions and empowering others through
              knowledge sharing and entrepreneurship.
            </p>
            <div className="flex gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Let's Talk
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                View Work
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-[3/4] bg-gradient-to-br from-amber-200 to-amber-100 dark:from-amber-800 dark:to-amber-900 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHYQpsozwFp0Q/profile-displayphoto-crop_800_800/B4DZqNofNpGsAI-/0/1763312793214?e=1764806400&v=beta&t=yPFx1-ptDY1Rg1Vbd4ZEpKGwjoJ2c_EyJFudT2mXAlw"
                  alt="Daniel Ishaku"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Tech Innovator</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Multiple Startups</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
