'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const t = useTranslations('nav')
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { name: t('home'), href: '#home' },
        { name: t('about'), href: '#about' },
        { name: t('skills'), href: '#skills' },
        { name: t('projects'), href: '#projects' },
        { name: t('contact'), href: '#contact' },
    ]

    const switchLanguage = (locale: string) => {
        const newPath = pathname.replace(/^\/[a-z]{2}/, `/${locale}`)
        router.push(newPath)
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-bold gradient-text"
                    >
                        Portfolio
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
                            >
                                {item.name}
                            </motion.a>
                        ))}
                        
                        {/* Language Switcher */}
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
                                <Globe size={20} />
                                <span className="text-sm">{pathname.startsWith('/fr') ? 'FR' : 'EN'}</span>
                            </button>
                            <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <button
                                    onClick={() => switchLanguage('en')}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => switchLanguage('fr')}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                                >
                                    Français
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 dark:text-gray-300"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pb-4"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}

export default Navbar