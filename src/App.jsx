import { useState } from 'react'
import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Contact />
      <Footer />
    </AppContainer>
  )
}

export default App
