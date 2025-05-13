import React, { useState, useEffect } from 'react';
import BlueButton from './BlueButton';
import Logo from '../assets/telirek.png';

const NavBar = () => {
    const [scrolling, setScrolling] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const Links = [
        { name: "Avaleht", link: "/" },
        { name: "Meist", link: "/meist" },
        { name: "Teenused", link: "/teenused" },
        { name: "Referentsid", link: "/referentsid" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`
            w-full fixed top-0 left-0 z-[999] transition-all duration-300 ease-in-out
            ${scrolling ? 'bg-[#fbfbfb]' : 'md:bg-transparent bg-[#fbfbfb]'}
            ${scrolling ? 'py-[10px] shadow-md text-[#414141]' : 'py-[25px] md:text-[#fbfbfb] text-[#414141]'}
        `}>
            <div className="flex items-center justify-between px-6 md:px-[100px] xl:px-[250px]">
                {/* Logo */}
                <a href='/' className={`text-3xl font-semibold transition-all ${scrolling ? 'text-2xl' : 'text-3xl'}`}>
                    <img src={Logo} alt="Telirek Logo" className="h-12" />
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12 text-[19px]">
                    {Links.map((link) => (
                        <a key={link.name} href={link.link} className="px-[15px] py-[7px] hover:text-[#00529c] hover:bg-[#fbfbfb] duration-200 transition-colors">
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Desktop Button */}
                <div className="hidden md:block">
                    <BlueButton href="/kontakt">Kontakt</BlueButton>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#fbfbfb] text-[#414141] px-6 pt-4 pb-6">
                    <div className="flex flex-col gap-4 text-lg">
                        {Links.map((link) => (
                            <a
                                key={link.name}
                                href={link.link}
                                className="hover:text-[#00529c] transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div>
                            <BlueButton href="/kontakt">Kontakt</BlueButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;