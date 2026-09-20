import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
    { to: '/', label: 'Home', icon: 'fa-solid fa-house', end: true },
    { to: '/posts', label: 'Blog', icon: 'fa-solid fa-book-open-reader' },
    { to: '/projects', label: 'Projects', icon: 'fa-solid fa-list-check' },
    { to: '/potfolio', label: 'Potfolio', icon: 'fa-solid fa-palette' },
]

const linkClass = ({ isActive }) =>
    cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
    )

function Header({ darkMode, toggleDarkMode }) {
    const [menuOpen, setMenuOpen] = useState(false)

    const themeToggle = (
        <Button
            variant='ghost'
            size='icon'
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {darkMode ? <Sun /> : <Moon />}
        </Button>
    )

    return (
        <header className='sticky top-0 z-40 border-y bg-background/80 backdrop-blur'>
            <div className='mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6'>
                <Link to='/' aria-label='Home'>
                    <i className='fa-solid fa-code fa-xl'></i>
                </Link>

                {/* Desktop nav */}
                <nav className='hidden items-center gap-1 md:flex'>
                    {navLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                            <i className={link.icon}></i> {link.label}
                        </NavLink>
                    ))}
                    {themeToggle}
                </nav>

                {/* Mobile nav */}
                <div className='flex items-center gap-1 md:hidden'>
                    {themeToggle}
                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant='ghost' size='icon' aria-label='Open menu'>
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='right' className='w-64'>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription className='sr-only'>Site navigation</SheetDescription>
                            <nav className='mt-6 flex flex-col gap-1'>
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        end={link.end}
                                        className={linkClass}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <i className={link.icon}></i> {link.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Header
