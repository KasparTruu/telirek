import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/contact-page-components/Header'
import Footer from '../components/Footer'
import ContactSection from '../components/contact-page-components/ContactSection'

const ContactPage = () => {
  return (
    <div>
        <NavBar />
        <Header />
        <ContactSection />
        
        <footer className='bg-[#00529c] text-[#fbfbfb] px-[16px] py-[12px] w-full z-10 relative'>
          <p className='text-center text-xs md:text-base m-0'>
            <strong>© 2025 TELIREK GRUPP OÜ.</strong> Kõik õigused kaitstud.
          </p>
        </footer>
    </div>
  )
}

export default ContactPage;