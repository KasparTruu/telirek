import React from 'react';
import BlueButton from '../BlueButton';
import * as motion from "motion/react-client";
import HeaderImg from '../../assets/about-page-assets/received_1075846640045180.jpeg';

const Header = () => {
    return (
        <div className="relative w-full h-[550px] overflow-hidden">
            {/* Background Image */}
            <img
                src={HeaderImg}
                alt="Background"
                className="absolute inset-0 w-full h-[550px] object-cover z-0 border-b-4 border-[#00529c]"
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
                className='relative z-[998] text-center text-[#fbfbfb]'
            >

                <h1 className='mt-[225px] lg:text-7xl text-4xl'>REFERENTSID</h1>

            </motion.div>

            <div className="absolute inset-0 bg-black/40 z-10 h-[550px]" />
        </div>
    );
};

export default Header;
