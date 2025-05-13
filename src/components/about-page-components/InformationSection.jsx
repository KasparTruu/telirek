import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const InformationSection = () => {
  const containerRef = useRef(null);
  const [activePoints, setActivePoints] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Extended key information
  const keyPoints = [
    { 
      id: 1, 
      text: "Ettevõtte personal on tegelenud ehitustöödega", 
      highlight: "üle 12 aasta.",
      image: "src/assets/gallery/IMG-759f81425f6deb80c33f40858076ab05-V.jpg",
      description: "Meie meeskond koosneb kogenud spetsialistidest, kes on aastate jooksul kogunud väärtuslikku kogemust erinevates ehitustöödes."
    },
    { 
      id: 2, 
      text: "Meie eesmärgiks on", 
      highlight: "iga töö puhul välja selgitada kliendi täpsed vajadused.",
      image: "src/assets/gallery/IMG-2752a7c64940a81998310301973a1ed1-V.jpg",
      description: "Usume, et iga projekt on unikaalne ja nõuab individuaalset lähenemist. Seetõttu veedame aega, et mõista kliendi ootusi ja soove."
    },
    { 
      id: 3, 
      text: "Iga projekti lõpptulemus peab olema", 
      highlight: "rahulolev klient ja positiivne tagasiside.",
      image: "src/assets/gallery/IMG-ba014fc8fade0ff4036c772895e5039b-V.jpg",
      description: "Meie kvaliteedistandardid on kõrged ja me ei lõpeta projekti enne, kui klient on 100% rahul tulemusega."
    },
    { 
      id: 4, 
      text: "Oma tööde teostamiseks kasutame ainult", 
      highlight: "sertifitseeritud materjale ja anname garantii vastavalt tarbijakaitse seadustikule.",
      image: "src/assets/gallery/received_1303031417250809.jpeg",
      description: "Meie partnerid on juhtivad materjalide tootjad ja tarnijad, mis tagab kõrge kvaliteedi ja vastupidavuse."
    }
  ];

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
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
      const threshold = isMobile ? 0.1 : 0.15;
      const step = (0.7 - threshold) / keyPoints.length;
      
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

  // Animation variants
  const pointVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 30 : 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20
      } 
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: isMobile ? 0.95 : 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      } 
    }
  };

  return (
    <div 
      ref={containerRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-[175px]"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, margin: "-100px" }}
        className="mb-12 sm:mb-16 md:mb-20 w-full text-left hidden"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#00529c] relative inline-block">
          Meist
        </h1>
      </motion.div>

      <div className="space-y-16 sm:space-y-20 md:space-y-24">
        {keyPoints.map((point, index) => (
          <motion.div
            key={point.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ 
              once: false, 
              margin: isMobile ? "-50px" : "-100px",
              amount: isMobile ? 0.2 : 0.3
            }}
            variants={pointVariants}
          >
            <div className={`order-2 md:order-${point.id % 2 === 0 ? '1' : '2'}`}>
              <motion.div
                className="relative overflow-hidden shadow-md"
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ 
                  once: false, 
                  margin: isMobile ? "-50px" : "-100px",
                  amount: isMobile ? 0.2 : 0.3
                }}
              >
                <img
                  src={point.image}
                  alt={`Illustration for ${point.text}`}
                  className="w-full h-[250px] sm:h-[300px] object-cover"
                />
              </motion.div>
            </div>
            
            <div className={`order-1 md:order-${point.id % 2 === 0 ? '2' : '1'}`}>
              <motion.div 
                className="bg-white p-6 shadow-md border-l-4 border-[#00529c]"
                initial="hidden"
                whileInView="visible"
                viewport={{ 
                  once: false, 
                  margin: isMobile ? "-50px" : "-100px",
                  amount: isMobile ? 0.2 : 0.3
                }}
                variants={pointVariants}
              >
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-4">
                  {point.text}{" "}
                  <span className="font-bold text-[#00529c]">{point.highlight}</span>
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  {point.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InformationSection;