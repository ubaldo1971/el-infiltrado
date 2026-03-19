/**
 * Header — Logo, título del sitio y barra de búsqueda.
 */
import { useState, useEffect } from 'react';

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <header className="bg-navy text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-7 flex items-center justify-between gap-5">
                {/* Logo + Title */}
                <a href="/" className="flex items-center gap-4 group">
                    {/* Eye icon (brand symbol) */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg
                            viewBox="0 0 64 64"
                            className="w-16 h-16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Outer eye shape */}
                            <path
                                d="M32 12C18 12 6 32 6 32s12 20 26 20 26-20 26-20S46 12 32 12z"
                                stroke="white"
                                strokeWidth="3"
                                fill="none"
                            />
                            {/* Iris */}
                            <circle cx="32" cy="32" r="10" fill="white" />
                            {/* Pupil */}
                            <circle cx="32" cy="32" r="5" fill="#c92a2a" />
                            {/* Reflection */}
                            <circle cx="35" cy="29" r="2" fill="white" opacity="0.8" />
                            {/* Signal waves */}
                            <path
                                d="M18 18 L14 14 M46 18 L50 14 M18 46 L14 50 M46 46 L50 50"
                                stroke="#c92a2a"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-base tracking-[0.3em] text-white/60 font-light leading-none">
                            EL
                        </span>
                        <span
                            className="text-3xl md:text-4xl font-black tracking-wider leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            INFILTRADO
                        </span>
                    </div>
                </a>

                {/* Actions: Search + Dark Mode */}
                <div className="flex items-center gap-2">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-3 rounded-full hover:bg-white/10 transition-all duration-300 group"
                        title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                    >
                        {darkMode ? (
                            <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-white/80 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'w-48 md:w-64 opacity-100' : 'w-0 opacity-0'
                            }`}
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar noticias..."
                            className="w-full bg-navy-light text-white text-base px-5 py-2.5 rounded-full border border-white/20 outline-none focus:border-accent placeholder:text-white/40"
                        />
                    </div>
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="p-3 rounded-full hover:bg-navy-light transition-colors duration-200"
                        aria-label="Buscar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
