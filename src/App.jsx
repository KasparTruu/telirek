import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './views/HomePage'
import AboutPage from './views/AboutPage'
import ContactPage from './views/ContactPage'
import ServicesPage from './views/ServicesPage'
import ReferentsPage from './views/ReferentsPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route index path="/" element={ <HomePage /> } />
          <Route path='/meist' element={ <AboutPage /> } />
          <Route path='/teenused' element={ <ServicesPage /> } />
          <Route path='/referentsid' element={ <ReferentsPage /> } />
          <Route path='/kontakt' element={ <ContactPage /> } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
