import React from 'react'
import Reveal from '../components/Reveal'

export default function About(){
  return (
    <section>
      <Reveal direction="left">
      <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <div className="inline-block px-4 py-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold tracking-wider mb-6">
            ✨ ABOUT US
          </div>
          <h1 className="text-6xl font-black mb-8 leading-tight">
            About Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600">Studio</span>
          </h1>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            With over a decade of professional photography experience, we specialize in capturing life's most precious moments with artistry and technical excellence.
          </p>
          <p className="text-gray-400 mb-6 text-lg leading-relaxed">
            Our approach combines candid storytelling with professional composition, ensuring every photo reflects the emotion and beauty of the occasion.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            From intimate weddings to grand corporate events, we bring passion and expertise to every project.
          </p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative rounded-2xl overflow-hidden h-[500px] border border-yellow-500/30 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-yellow-500/20 transition-all duration-500">
            <img src="https://picsum.photos/600/600?random=7" alt="photographer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
      </Reveal>

      {/* Services */}
      <div className="mb-24">
        <h2 className="text-5xl font-black mb-16 text-center">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600">Services</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-3 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center gap-3">
              <span className="text-4xl">💒</span> Weddings
            </h3>
            <p className="text-gray-400 leading-relaxed">Comprehensive wedding coverage including engagement, rehearsal, ceremony, and reception.</p>
          </div>
          <div className="group bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-3 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center gap-3">
              <span className="text-4xl">🎉</span> Events
            </h3>
            <p className="text-gray-400 leading-relaxed">Corporate events, parties, and celebrations captured with professionalism and creativity.</p>
          </div>
          <div className="group bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-3 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center gap-3">
              <span className="text-4xl">👤</span> Portraits
            </h3>
            <p className="text-gray-400 leading-relaxed">Professional headshots, family portraits, and personal branding photography.</p>
          </div>
          <div className="group bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-3 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center gap-3">
              <span className="text-4xl">📸</span> Prints & Albums
            </h3>
            <p className="text-gray-400 leading-relaxed">High-quality prints, albums, and canvas art to preserve your memories forever.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative bg-gradient-to-br from-yellow-500/10 via-gray-900/50 to-amber-600/10 backdrop-blur-xl p-16 rounded-3xl border border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(234,179,8,0.1),transparent)]" />
        <div className="relative z-10 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-3">1000+</p>
            <p className="text-gray-300 text-lg font-semibold">Happy Clients</p>
          </div>
          <div>
            <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-3">1000+</p>
            <p className="text-gray-300 text-lg font-semibold">Photos Delivered</p>
          </div>
          <div>
            <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-3">10+</p>
            <p className="text-gray-300 text-lg font-semibold">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}
