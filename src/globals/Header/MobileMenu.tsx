'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface MobileMenuProps {
    navLinks: {
        href: string
        label: string
    }[]
    joinButtonLabel: string
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ navLinks, joinButtonLabel }) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    return (
        <div className="lg:hidden flex items-center">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-navy hover:text-navy-mid focus:outline-none transition-colors active:scale-95"
                aria-label="Toggle menu"
            >
                <div className="relative w-7 h-7 flex items-center justify-center">
                    <Menu
                        size={28}
                        className={`absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                            }`}
                    />
                    <X
                        size={28}
                        className={`absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                            }`}
                    />
                </div>
            </button>

            {/* Full-screen menu overlay */}
            <div
                className={`fixed inset-0 top-20 z-40 bg-brand-white flex flex-col pt-8 px-6 lg:px-16 overflow-y-auto duration-500 transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-8 invisible pointer-events-none'
                    }`}
            >
                <nav className="flex flex-col gap-4 mb-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-lg font-bold py-3 border-b border-silver-lt flex items-center justify-between transition-colors ${pathname === link.href ? 'text-navy-mid' : 'text-navy'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/join"
                        className="mt-6 bg-navy text-brand-white px-6 py-4 rounded-xl font-bold text-center text-lg shadow-lg hover:bg-navy-mid transition-transform duration-300 active:scale-95"
                    >
                        {joinButtonLabel}
                    </Link>
                </nav>

                <div className="mt-auto pb-20 pt-10 text-center opacity-50">
                    <span className="text-navy text-xs font-semibold tracking-wider">
                        Қазақстандық Күміс Университеттер Қауымдастығы
                    </span>
                </div>
            </div>
        </div>
    )
}
