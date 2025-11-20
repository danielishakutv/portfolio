import Hero from '../components/Hero'
import About from '../components/About'
import Portfolio from '../components/Portfolio'
import Books from '../components/Books'
import Speaking from '../components/Speaking'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <Books />
      <Speaking />
    </main>
  )
}