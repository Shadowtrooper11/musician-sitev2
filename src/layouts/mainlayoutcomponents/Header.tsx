import { cn } from "@/lib/clsx"
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, Book, Music, Menu, Minimize2 } from "lucide-react";
import { GradientSpinnerA } from "@/components/ui/GradientSpinnerA";

interface NavLink {
    label: string;
    path: string;
    icon: React.ElementType;
}

export default function Header() {
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks: NavLink[] = [
        { label: t('header.home'), path: '/', icon: Home },
        { label: t('header.music'), path: '/music', icon: Music },
        { label: t('header.about'), path: '/about', icon: Info },
        { label: t('header.contact'), path: '/contact', icon: Book }
    ]
    
    return (
        <header className={cn("p-2 h-20 sticky top-0 z-50 shadow-lg bg-neutral-900 border-b border-neutral-700")}>
            <nav className={cn("mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center")}>
                <div className="flex items-center justify-between gap-3">
                    {/* Logo and Name */}
                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >
                        <img
                            src="/ChrisProductions.jpg"
                            alt="Logo"
                            className="size-12 md:16 rounded-full object-cover"
                        />
                        <span className="text-xl md:text-2xl font-bold hover:text-white transition-colors">
                            {t('header.title')}
                        </span>
                    </Link>
                    {/* Desktop Navigation */}
                    <div className="flex items-center gap-4 hidden md:flex">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <div className="relative overflow-hidden p-0.5 rounded-lg">
                                    {isActive ? <GradientSpinnerA /> : null}
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={cn(
                                            "size-full relative group flex items-center p-1 text-lg transition-all duration-300 hover:ring-2 ring-sky-700 rounded-lg bg-neutral-900",
                                            isActive ? " inset-shadow-lg inset-shadow-white rounded-lg text-white" : "hover:text-white hover:"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2"
                        >
                            {mobileMenuOpen ? <Minimize2 className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className={cn("absolute top-full left-0 w-full bg-zinc-800 flex flex-col border-b border-neutral-700 md:hidden"
                            )}>
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn("flex items-center text-xl gap-3 p-4",
                                                isActive ? "bg-neutral-700 text-white" : "hover:bg-neutral-700 hover:text-white"
                                                )}
                                        >
                                            <link.icon className="size-6" /> {link.label}
                                        </Link>
                                    )
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </header>
    )
}