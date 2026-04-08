import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Prevent background scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    // Framer Motion Variants
    const menuVariants = {
        closed: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
        open: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 20 },
        open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex items-center justify-between pointer-events-none">

                {/* Left: Logo */}
                <div className="flex items-center gap-2 pointer-events-auto cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-['Outfit'] font-bold text-xl tracking-tight text-white">PDA</span>
                </div>

                {/* Right: CTA + Menu Button */}
                <div className="flex items-center gap-4 pointer-events-auto">
                    <button
                        className={`hidden md:block px-5 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all backdrop-blur-md ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                        onClick={() => navigate('/dashboard')}
                    >
                        Try Demo
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="group relative w-12 h-12 flex flex-col items-center justify-center gap-[5px] bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-colors z-[110]"
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            className="w-5 h-[2px] bg-white block origin-center transition-transform duration-300"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-5 h-[2px] bg-white block transition-opacity duration-300"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            className="w-5 h-[2px] bg-white block origin-center transition-transform duration-300"
                        />
                    </button>
                </div>

            </nav>

            {/* FULLSCREEN OVERLAY MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-2xl flex items-center justify-center text-white"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-purple-900/10 pointer-events-none" />

                        <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 h-[80vh] pt-24 overflow-y-auto">

                            {/* PRIMARY LINKS */}
                            <div className="col-span-1 md:col-span-5 flex flex-col justify-center">
                                <nav className="flex flex-col gap-6">
                                    {['Home', 'Features', 'How It Works', 'Dashboard', 'About'].map((item) => (
                                        <motion.a
                                            key={item}
                                            variants={itemVariants}
                                            href="#"
                                            className="text-5xl md:text-7xl font-bold font-['Outfit'] tracking-tighter text-gray-400 hover:text-white transition-colors relative group w-fit"
                                        >
                                            {item}
                                            <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-indigo-500 transition-all duration-500 group-hover:w-full" />
                                        </motion.a>
                                    ))}
                                </nav>
                            </div>

                            {/* SECONDARY INFO */}
                            <div className="col-span-1 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 md:pt-12 items-center">

                                {/* Product Features */}
                                <motion.div variants={itemVariants} className="flex flex-col">
                                    <h3 className="text-indigo-400 font-semibold mb-6 tracking-widest uppercase text-xs">Product Features</h3>
                                    <ul className="space-y-4">
                                        {['Power Dynamics Analysis', 'Timeline Visualization', 'Evidence Engine', 'Replay Mode'].map((feat) => (
                                            <li key={feat}><a href="#" className="text-xl text-gray-300 hover:text-white transition-colors">{feat}</a></li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Use Cases */}
                                <motion.div variants={itemVariants} className="flex flex-col">
                                    <h3 className="text-indigo-400 font-semibold mb-6 tracking-widest uppercase text-xs">Use Cases</h3>
                                    <ul className="space-y-4">
                                        {['HR Analytics', 'Customer Support Insights', 'Personal Communication Analysis'].map((uc) => (
                                            <li key={uc}><a href="#" className="text-xl text-gray-300 hover:text-white transition-colors">{uc}</a></li>
                                        ))}
                                    </ul>
                                </motion.div>

                            </div>

                        </div>

                        {/* Footer Links */}
                        <motion.div variants={itemVariants} className="absolute bottom-12 left-0 right-0 px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 max-w-7xl mx-auto">
                            <div className="flex gap-6 mb-4 sm:mb-0">
                                <a href="#" className="hover:text-white transition-colors">Login / Signup</a>
                                <a href="#" className="hover:text-white transition-colors">GitHub</a>
                                <a href="#" className="hover:text-white transition-colors">Contact</a>
                            </div>
                            <span>© {new Date().getFullYear()} PDA Core Systems</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
