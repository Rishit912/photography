import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-gradient-to-t from-gray-950 to-gray-900 border-t border-yellow-500/20 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-yellow-500 font-bold mb-4">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional photography studio specializing in weddings, events, and portraits.
            </p>
          </div>
          <div>
            <h3 className="text-yellow-500 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-yellow-500 transition cursor-pointer">Home</li>
              <li className="hover:text-yellow-500 transition cursor-pointer">Portfolio</li>
              <li className="hover:text-yellow-500 transition cursor-pointer">About</li>
              <li className="hover:text-yellow-500 transition cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-yellow-500 font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-yellow-500 transition">Instagram</a>
              <a href="#" className="hover:text-yellow-500 transition">Facebook</a>
              <a href="#" className="hover:text-yellow-500 transition">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-yellow-500/20 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} OM Studio — Capturing Moments, Creating Memories
        </div>
      </div>
    </footer>
  )
}
