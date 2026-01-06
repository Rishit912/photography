import React, { useState } from 'react'

export default function Navbar({ onNavigate }){
  const [open, setOpen] = useState(false)

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'about', label: 'About' },
    { key: 'contact', label: 'Contact' }
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-gray-950/95 border-b border-yellow-500/20 shadow-2xl shadow-yellow-500/5">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { onNavigate('home'); setOpen(false) }}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-600 rounded-xl flex items-center justify-center font-bold text-gray-900 group-hover:shadow-xl group-hover:shadow-yellow-500/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse">
            📸
          </div>
          <div className="text-lg sm:text-2xl font-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
            OM Studio
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(i => (
            <button key={i.key} onClick={() => onNavigate(i.key)} className="px-3 py-2 text-gray-300 hover:text-yellow-400 transition-all font-semibold text-sm relative group">
              {i.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent"></div>
          <button
            onClick={() => onNavigate('client-login')}
            className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 text-gray-900 font-bold rounded-xl hover:from-yellow-400 hover:via-yellow-500 hover:to-amber-500 transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/50 hover:scale-105 transform text-sm"
          >
            Client Portal
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu" className="p-2 text-gray-300 hover:text-yellow-500">
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="absolute left-0 right-0 top-full bg-gray-950/95 border-t border-yellow-500/10 md:hidden z-40">
            <div className="px-4 py-4 space-y-2">
              {navItems.map(i => (
                <button key={i.key} onClick={() => { onNavigate(i.key); setOpen(false) }} className="w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-500 transition font-medium rounded">
                  {i.label}
                </button>
              ))}
              <div className="w-full border-t border-yellow-500/20 my-2"></div>
              <button onClick={() => { onNavigate('client-login'); setOpen(false) }} className="w-full px-3 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded">
                Client Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
