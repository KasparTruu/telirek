import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/about-page-components/Header'
import Footer from '../components/Footer'
import InformationSection from '../components/about-page-components/InformationSection'

const AboutPage = () => {
  return (
    <div className='bg-[#fbfbfb] text-[#414141]'>
        <NavBar />
        <Header />
        <InformationSection />
        <Footer />
    </div>
  )
}

export default AboutPage