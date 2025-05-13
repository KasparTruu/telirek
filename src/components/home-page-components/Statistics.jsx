import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from "framer-motion";

const Counter = ({ target, isInView, duration = 650 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <p className='text-5xl md:text-6xl lg:text-7xl'>{count.toLocaleString()}</p>;
};

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    rootMargin: "-30% 0px -30% 0px", // fade out earlier
    threshold: 0.1,
  });

  return (
    <div className='relative top-[50px] flex items-center justify-center px-4 sm:px-8'>
      {/* Invisible scroll trigger */}
      <div ref={ref} className='h-[1px] w-full' />

      {/* Overlapping Stats Box */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.5 }}
        className='bg-[#00529c] text-[#fbfbfb] w-full max-w-[1400px] 
                   absolute top-[50%] lg:top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                   flex items-center justify-center z-50 h-auto py-12'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-12 px-6 sm:px-10'>
          <div className='grid grid-cols-1 gap-4 text-center font-medium'>
            <Counter target={30000} isInView={isInView} />
            <p className='text-xl md:text-2xl'>m2 soojustatud <br /> fassaadi</p>
          </div>
          <div className='grid grid-cols-1 gap-4 text-center font-medium'>
            <Counter target={400000} isInView={isInView} />
            <p className='text-xl md:text-2xl'>tehtud <br /> töötundi</p>
          </div>
          <div className='grid grid-cols-1 gap-4 text-center font-medium'>
            <Counter target={5000} isInView={isInView} />
            <p className='text-xl md:text-2xl'>head mõtet töö <br /> paremaks sujumiseks</p>
          </div>
          <div className='grid grid-cols-1 gap-4 text-center font-medium'>
            <Counter target={100} isInView={isInView} />
            <p className='text-xl md:text-2xl'>% rahulolevad <br /> kliendid</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Statistics;
