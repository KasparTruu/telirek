import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import BlueButton from './BlueButton';

const Footer = () => {
  const ref = useRef(null);
  const isTextInView = useInView(ref, {
    once: false,
    rootMargin: "-20% 0px -20% 0px", // adjust as needed
  });

  return (
    <div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: isTextInView ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className='bg-[#fbfbfb] text-[#414141] px-[32px] md:px-[32px] lg:flex lg:justify-center lg:gap-50 py-[50px] md:py-[15px] lg:py-[50px] lg:mt-[50px] border-t-4 border-[#00529c]'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div className='text-left'>
            <h2 className='text-2xl font-semibold mb-4 text-[#00529c]'>TELIREK GRUPP OÜ</h2>
            <p className='font-bold mb-1'>Projektijuht</p>
            <p className='mb-1 flex items-center gap-2'>
              Peeter Seppel
              <span className='inline-flex gap-1'>
                <img src='https://hatscripts.github.io/circle-flags/flags/ee.svg' alt='ee' className='w-5 h-5' />
                <img src='https://hatscripts.github.io/circle-flags/flags/ru.svg' alt='ru' className='w-5 h-5' />
                <img src='https://hatscripts.github.io/circle-flags/flags/gb.svg' alt='gb' className='w-5 h-5' />
                <img src='https://hatscripts.github.io/circle-flags/flags/fi.svg' alt='fi' className='w-5 h-5' />
              </span>
            </p>
            <p className='mb-1'>
              Tel <a href='tel:+3725204303' className='underline'>+372 5204 303</a>
            </p>
            <p className='mb-1'>E-mail <a href='mailto:info@telirekgrupp.ee' className='underline'>info@telirekgrupp.ee</a></p>
            <p className='mb-1'>Majandustegevusteate number EEH011485</p>
            <p className='mb-1'>LHV Pank EE987700771003288349</p>
          </div>
          <div className='flex flex-col items-center md:items-end mt-6 md:mt-0'>
            <BlueButton href={'/kontakt'}>Võta ühendust</BlueButton>
          </div>
        </div>
      </motion.div>

      <div className='bg-[#00529c] text-[#fbfbfb] px-[16px] py-[12px] w-full z-10 relative'>
        <p className='text-center text-xs md:text-base m-0'>
          <strong>© 2025 TELIREK GRUPP OÜ.</strong> Kõik õigused kaitstud.
        </p>
      </div>
    </div>
  );
};

export default Footer;
