import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import Gallery from '../components/referents-page-components/Gallery';
import Header from '../components/referents-page-components/Header';

const ReferentsPage = () => {
  return (
    <div>
      <NavBar />
      <Header /> 
      <Gallery />

      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default ReferentsPage; 