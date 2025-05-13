import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServiceSection = () => {
  const containerRef = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);

  // Service information from telirekgrupp.ee - reduced to 4 key services
  const services = [
    {
      id: 1,
      title: "Fassaaditööd",
      description: "Pakume professionaalset fassaadi renoveerimist, soojustamist ja hooldust, et tagada Teie hoone välimuse ja energiatõhususe pikaajaline säilimine.",
      icon: "🏠"
    },
    {
      id: 2,
      title: "Tellingute paigaldus",
      description: "Turvalised ja kvaliteetsed tellingulahendused, mis tagavad igasuguste tööde mugava ja ohutu teostamise.",
      icon: "🔨"
    },
    {
      id: 3,
      title: "Üldehitus",
      description: "Teostame kõikvõimalikke ehitusprotsesse, alates vundamendist kuni katusekonstruktsioonideni.",
      icon: "🔧"
    },
    {
      id: 4,
      title: "Viimistlustööd",
      description: "Pakume laia valikut viimistlusteenuseid, sealhulgas sise- ja välisviimistlustöid, et luua Teie kodu või tööruumides professionaalne ja esteetiline keskkond.",
      icon: "⚒️"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const serviceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div ref={containerRef} className="py-24 sm:py-32 md:py-40 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-[175px] relative">
      {/* Title with animated underline */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, margin: "-100px" }}
        className="mb-12 sm:mb-16 md:mb-20 w-full text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#00529c] text-left">
          Teenused
        </h1>
      </motion.div>

      {/* Services Grid - 2x2 layout */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            className={`p-4 sm:p-5 md:p-6 lg:p-8 shadow-md hover:shadow-lg transition-all duration-300 
                      border-l-4 border-[#00529c] bg-white flex flex-col
                      ${hoveredService === service.id ? 'transform -translate-y-2' : ''}`}
            variants={serviceVariants}
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="text-4xl sm:text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#00529c]">{service.title}</h3>
            <p className="text-base sm:text-lg text-gray-700">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* "See More" Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: false }}
        className="mt-12 text-center"
      >
        <a 
          href="/teenused" 
          className="group inline-flex items-center text-[#00529c] font-bold text-lg md:text-lg sm:text-xl transition-all duration-200"
        >
          VAATA LÄHEMALT
          <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
            <ArrowRight size={20} />
          </span>
        </a>
      </motion.div>
    </div>
  );
};

export default ServiceSection;