"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero3 = () => {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const isAnyHovered = hoveredLink !== null;

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-background text-foreground px-4 relative overflow-hidden transition-colors duration-300">
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-45"
                style={{
                    backgroundImage: "radial-gradient(circle, var(--primary) 0.5px, transparent 0.5px)",
                    backgroundSize: "10px 10px",
                }}
            />

            <div className="flex flex-col items-center justify-center text-center w-full max-w-[800px] mx-auto z-10">
                {/* Available for work pill */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`flex items-center gap-2 mb-6 bg-foreground/3 py-1 px-3 rounded-md border border-foreground/8 transition-all duration-500 ${isAnyHovered ? 'opacity-20' : 'opacity-100'}`}
                >
                    <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full transition-colors duration-500 ${isAnyHovered ? 'bg-foreground/20' : 'bg-foreground opacity-75'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 ${isAnyHovered ? 'bg-foreground/20' : 'bg-foreground'}`}></span>
                    </span>
                    <span className={`text-[11px] font-sans font-medium tracking-wide transition-colors duration-500 ${isAnyHovered ? 'text-foreground/20' : 'text-foreground/70'}`}>Available for work</span>
                </motion.div>

                {/* Main Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`font-erode text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-extrabold tracking-[-0.05em] leading-[0.9] mb-5 drop-shadow-sm transition-colors duration-500 ${isAnyHovered ? 'text-foreground/20' : 'text-foreground'}`}
                >
                    Avinash Kumar
                </motion.h1>

                {/* Description Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 2.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`font-sans text-[16px] sm:text-[18px] md:text-[20px] leading-[1.65] mb-10 max-w-full sm:max-w-[80%] font-normal tracking-[-0.01em] transition-colors duration-500 ${isAnyHovered ? 'text-foreground/10' : 'text-foreground/50'}`}
                >
                    <strong className={`font-semibold transition-colors duration-500 ${isAnyHovered ? 'text-foreground/10' : 'text-foreground/80'}`}>Creative Developer</strong> building fast, immersive products for the web with a focus on interactive experiences, performance, and UI/UX.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.5, ease: "easeOut" }}
                    className="flex items-center gap-3 md:gap-4 z-20"
                >
                    <Link
                        href="/about"
                        onMouseEnter={() => setHoveredLink('about')}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`font-sans text-[13px] sm:text-sm font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-500 shadow-sm hover:shadow-md pointer-events-auto active:scale-95 group/btn
                        ${hoveredLink === 'about' ? 'bg-foreground text-background' :
                                hoveredLink === 'work' ? 'bg-foreground/90 text-background/90 opacity-40' :
                                    'bg-foreground text-background'}
                    `}
                    >
                        More about me
                    </Link>
                    <Link
                        href="/work"
                        onMouseEnter={() => setHoveredLink('work')}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`bg-background font-sans text-[13px] sm:text-sm font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-500 shadow-sm hover:shadow-md pointer-events-auto active:scale-95 group/btn
                        ${hoveredLink === 'work' ? 'border-foreground/30 text-foreground' :
                                hoveredLink === 'about' ? 'border-foreground/10 text-foreground/90 opacity-50' :
                                    'border-foreground/15 text-foreground'}
                        border
                    `}
                    >
                        View work
                    </Link>
                </motion.div>
            </div>

            {/* Bottom separator */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-20 w-[60%] max-w-[400px] h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent pointer-events-none"
            />
        </div>
    );
};

export default Hero3;
