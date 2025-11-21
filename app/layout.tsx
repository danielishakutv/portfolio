import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/ThemeProvider'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daniel Ishaku - Web Developer & IT Consultant',
  description: 'Building innovative tech solutions and empowering others through knowledge sharing and entrepreneurship.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load the prebuilt Tailwind CSS so dev and GitHub Pages always get processed CSS */}
        <link
          rel="stylesheet"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/tailwind.css`}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}