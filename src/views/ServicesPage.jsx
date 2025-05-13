import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Header from '../components/services-page-components/Header'
import Services from '../components/services-page-components/Services'

const ServicesPage = () => {
  return (
    <div>
        <NavBar />
        <Header />
        <Services />
        <Footer />
    </div>
  )
}

export default ServicesPage