import React from 'react'
import Reveal from '../components/Reveal'

export default function Home({ onNavigate }){
  return (
    <section>
      {/* Hero Section */}
      <div className="relative h-[700px] rounded-3xl overflow-hidden mb-24 group shadow-2xl animate-pulse-border">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] group-hover:scale-110 group-hover:rotate-1"
          style={{backgroundImage: 'url(https://picsum.photos/1600/700?random=1)'}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-yellow-900/40 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.1),transparent)] animate-glow" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <Reveal direction="down" className="absolute inset-0">
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6 px-6 py-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold tracking-wider animate-float">
            ✨ PROFESSIONAL PHOTOGRAPHY STUDIO
          </div>
          <h1 className="text-7xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl tracking-tight leading-tight transform hover:scale-105 transition-transform duration-500">
            Capture Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600">Moments</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 drop-shadow-lg max-w-3xl leading-relaxed font-light">
            Award-winning photography for weddings, events, and portraits. <br/>Creating timeless memories with artistic excellence.
          </p>
          <div className="space-x-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('portfolio')}
              className="group px-10 py-4 bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 text-gray-900 font-bold rounded-xl hover:from-yellow-400 hover:via-yellow-500 hover:to-amber-500 transition-all shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transform"
            >
              <span className="flex items-center gap-2">
                View Portfolio
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
            <button
              onClick={() => onNavigate('client-login')}
              className="px-10 py-4 bg-white/5 backdrop-blur-md border-2 border-yellow-500/50 text-yellow-400 font-bold rounded-xl hover:bg-yellow-500 hover:text-gray-900 hover:border-yellow-500 transition-all hover:scale-105 transform shadow-xl"
            >
              Access Your Photos
            </button>
          </div>
        </div>
      </Reveal>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-24">
        <Reveal direction="left">
        <div className="group relative bg-gradient-to-br from-yellow-500/5 via-gray-900/90 to-amber-600/5 backdrop-blur-xl border-2 border-yellow-500/30 rounded-3xl p-10 hover:border-yellow-500 hover:shadow-[0_0_50px_rgba(234,179,8,0.3)] hover:-translate-y-4 transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="relative text-7xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)] animate-float">🎬</div>
          <h3 className="relative text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">Professional Quality</h3>
          <p className="relative text-gray-300 leading-relaxed text-lg">High-resolution images captured with professional equipment and artistic vision.</p>
        </div>
        </Reveal>
        <Reveal direction="up">
        <div className="group relative bg-gradient-to-br from-yellow-500/5 via-gray-900/90 to-amber-600/5 backdrop-blur-xl border-2 border-yellow-500/30 rounded-3xl p-10 hover:border-yellow-500 hover:shadow-[0_0_50px_rgba(234,179,8,0.3)] hover:-translate-y-4 transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="relative text-7xl mb-8 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]">🔐</div>
          <h3 className="relative text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">Secure Access</h3>
          <p className="relative text-gray-300 leading-relaxed text-lg">Your photos are secured with unique client keys. Only you can access your gallery.</p>
        </div>
        </Reveal>
        <Reveal direction="right">
        <div className="group relative bg-gradient-to-br from-yellow-500/5 via-gray-900/90 to-amber-600/5 backdrop-blur-xl border-2 border-yellow-500/30 rounded-3xl p-10 hover:border-yellow-500 hover:shadow-[0_0_50px_rgba(234,179,8,0.3)] hover:-translate-y-4 transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="relative text-7xl mb-8 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]">⬇️</div>
          <h3 className="relative text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">HD Downloads</h3>
          <p className="relative text-gray-300 leading-relaxed text-lg">Download your photos in multiple formats including high-resolution originals.</p>
        </div>
        </Reveal>
      </div>

      {/* Featured Work */}
      <div className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600">Featured</span> Work
          </h2>
          <p className="text-gray-400 text-xl">Showcasing our finest captures</p>
        </div>
        
        <Reveal direction="up">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group bg-gray-900 shadow-xl">
              <img
                src={`https://picsum.photos/600/400?random=${i}`}
                alt="featured"
                className="w-full h-full object-cover group-hover:scale-125 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-yellow-400 text-4xl mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">🔍</div>
                <p className="text-yellow-400 font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">View Details</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-bold text-lg drop-shadow-lg">Photography {i}</p>
                <p className="text-yellow-400 text-sm">Professional Shoot</p>
              </div>
            </div>
          ))}
        </div>
        </Reveal>
      </div>

      {/* CTA Section */}
      <Reveal direction="up">
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-2 border-yellow-500/30 p-12 rounded-2xl text-center mb-20 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/20 transition animate-pulse-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-transparent animate-shimmer" style={{backgroundSize: '200% 100%'}}></div>
        <h2 className="text-4xl font-bold mb-4">
           Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600">View Your Photos?</span>
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
           Log in with your unique client key to access and download your personal gallery in HD quality.
        </p>
        <button
          onClick={() => onNavigate('client-login')}
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition shadow-xl hover:shadow-2xl"
        >
           <span className="flex items-center gap-2 justify-center">
            Client Login
            <span className="group-hover:translate-x-1 transition-transform">→</span>
           </span>
        </button>
      </div>
      </Reveal>
    </section>
  )
}
