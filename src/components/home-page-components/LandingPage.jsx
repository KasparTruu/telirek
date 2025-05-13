import React from 'react';
import BlueButton from '../BlueButton';
import * as motion from "motion/react-client";

const LandingPage = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <img
                src="src/assets/gallery/20230106_154638.jpg" // <-- replace with your image path
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Overlay (optional dark layer for better text visibility) */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Centered Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-[#fbfbfb] px-4 text-center">
                
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }}
                    className='text-center'
                >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        TELIREK
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl opacity-95">
                        Ehitustööde professionaalid, kes teevad <br className='md:block hidden' /> teie unistused reaalsuseks
                    </p>
                    
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
