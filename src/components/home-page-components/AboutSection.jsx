import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const containerRef = useRef(null);
  const [activePoints, setActivePoints] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Key information from the paragraph
  const keyPoints = [
    { 
      id: 1, 
      text: "Ettevõtte personal on tegelenud ehitustöödega", 
      highlight: "üle 12 aasta."
    },
    { 
      id: 2, 
      text: "Meie eesmärgiks on", 
      highlight: "iga töö puhul välja selgitada kliendi täpsed vajadused."
    },
    { 
      id: 3, 
      text: "Iga projekti lõpptulemus peab olema", 
      highlight: "rahulolev klient ja positiivne tagasiside."
    },
    { 
      id: 4, 
      text: "Oma tööde teostamiseks kasutame ainult", 
      highlight: "sertifitseeritud materjale ja anname garantii vastavalt tarbijakaitse seadustikule."
    }
  ];

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Setup scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate which points should be shown based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Lower threshold means animations start sooner
      // Larger step means animations appear faster with less scrolling
      const threshold = isMobile ? 0.1 : 0.15; // Lower values trigger animations sooner
      const step = (0.7 - threshold) / keyPoints.length; // Smaller range means faster transitions
      
      if (value < threshold) {
        setActivePoints([]);
      } else {
        const visibleCount = Math.min(
          Math.ceil((value - threshold) / step),
          keyPoints.length
        );
        
        setActivePoints(keyPoints.slice(0, visibleCount).map(p => p.id));
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);

  // Animation variants for points
  const pointVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 20
      } 
    }
  };

  return (
    <div 
      ref={containerRef}
      className="py-24 sm:py-32 md:py-40 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-[175px]
                 min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh]
                 flex flex-col
                 mt-[400px] sm:mt-[150px] md:mt-40 lg:mt-[225px]"
    >
      {/* Title with animated underline */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, margin: "-100px" }}
        className="mb-12 sm:mb-16 md:mb-20 w-full text-left"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#00529c] relative inline-block">
          Meist
        </h1>
      </motion.div>

      {/* Grid layout for key points */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2
                      gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-16">
        {keyPoints.map((point) => (
          <motion.div
            key={point.id}
            className="bg-white 
                       p-4 sm:p-5 md:p-6 lg:p-8 
                       shadow-md hover:shadow-lg 
                       border-l-4 border-[#00529c]
                       transition-shadow duration-300"
            initial="hidden"
            animate={activePoints.includes(point.id) ? "visible" : "hidden"}
            variants={pointVariants}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-xl leading-relaxed">
              {point.text}{" "}
              <span className="font-bold text-[#00529c]">{point.highlight}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Scroll progress indicator - hidden on small mobile */}
      <div className="hidden sm:flex w-full justify-center mb-8">
        <div className="flex gap-1 sm:gap-2">
          {keyPoints.map((point) => (
            <motion.div
              key={point.id}
              className="h-1 sm:h-2 bg-gray-300"
              animate={{
                width: activePoints.includes(point.id) ? "1rem" : "0.5rem",
                backgroundColor: activePoints.includes(point.id) ? "#00529c" : "#d1d5db"
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: true }}
        className="self-center mt-4 sm:mt-6 md:mt-8"
      >
        <a 
          href="/meist" 
          className="group flex items-center text-[#00529c] font-bold transition-all duration-200
                     text-lg md:text-lg sm:text-xl"
        >
          VAATA VEEL
          <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">
            <ArrowRight size={isMobile ? 16 : 20} />
          </span>
        </a>
      </motion.div>
    </div>
  );
}

export default AboutSection;