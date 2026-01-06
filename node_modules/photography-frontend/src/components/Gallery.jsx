import React from 'react'

export default function Gallery({ images = [], onOpen }){
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {images.map((img, i) => {
        const src = typeof img === 'string' ? img : img.url
        const title = typeof img === 'string' ? `Photo ${i}` : img.title

        return (
          <button
            key={i}
            onClick={() => onOpen && onOpen(i)}
            className="relative block w-full h-40 sm:h-48 md:h-56 bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-2xl group border-2 border-yellow-500/20 hover:border-yellow-500/60 shadow-xl hover:shadow-[0_0_40px_rgba(234,179,8,0.2)] transition-all duration-500"
          >
            <img
              src={src}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
              onError={e => {
                e.target.onerror = null
                e.target.src = '/wedding/w1.jpg'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="text-yellow-400 text-5xl drop-shadow-[0_0_20px_rgba(234,179,8,0.8)] animate-pulse">🔍</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
