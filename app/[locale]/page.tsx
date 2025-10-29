'use client'

import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ToolsSidebar from '../components/ToolsSidebar'

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      
      <main className="min-h-screen">
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        
        <section id="about" aria-label="About section">
          <About />
        </section>
        
        <section id="skills" aria-label="Skills section">
          <Skills />
        </section>
        
        <section id="projects" aria-label="Projects section">
          <Projects />
        </section>
        
        <section id="contact" aria-label="Contact section">
          <Contact />
        </section>
      </main>
      
      <footer>
        <Footer />
      </footer>
      
      {/* Tools Sidebar */}
      <ToolsSidebar />
    </>
  )
}