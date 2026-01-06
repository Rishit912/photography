import React from 'react'
import Gallery from '../components/Gallery'
import Reveal from '../components/Reveal'

// Local wedding assets (place w1.jpg, w2.jpg inside frontend/public/wedding/)
const weddingLocal = [
  { category: 'weddings', url: '/wedding/w1.jpg', hdUrl: '/wedding/w1.jpg', title: 'Local Wedding 1' },
  { category: 'weddings', url: '/wedding/w2.jpg', hdUrl: '/wedding/w2.jpg', title: 'Local Wedding 2' }
]

// Helper to build random-but-stable images per load
const buildCategoryImages = (category, label, count, seed) =>
  Array.from({ length: count }).map((_, i) => {
    const slug = `${category}-${seed}-${i}`
    return {
      category,
      url: `https://picsum.photos/seed/${slug}/1200/800`,
      hdUrl: `https://picsum.photos/seed/${slug}/2000/1400`,
      title: `${label} ${i + 1}`
    }
  })

const categoryLabels = {
  all: 'All',
  weddings: 'Weddings',
  events: 'Events',
  'baby-shower': 'Baby Shower',
  portraits: 'Portraits'
}

export default function Portfolio(){
  const [openIndex, setOpenIndex] = React.useState(null)
  const [filter, setFilter] = React.useState('all')

  // Fresh random set each page load; stable during the session
  const seed = React.useMemo(() => Math.floor(Math.random() * 1_000_000), [])
  const generated = React.useMemo(
    () => [
      ...weddingLocal,
      ...buildCategoryImages('weddings', 'Wedding', 3, seed),
      ...buildCategoryImages('events', 'Event', 3, seed + 1),
      ...buildCategoryImages('baby-shower', 'Baby Shower', 2, seed + 2),
      ...buildCategoryImages('portraits', 'Portrait', 4, seed + 3)
    ],
    [seed]
  )

  const sampleImages = generated

  const categories = ['all', ...Array.from(new Set(sampleImages.map(i => i.category)))]
  const displayed = filter === 'all' ? sampleImages : sampleImages.filter(i => i.category === filter)

  React.useEffect(() => setOpenIndex(null), [filter])

  return (
    <section>
      <Reveal direction="down">
        <div className="mb-20">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600">Photography</span> Portfolio
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">A collection of our finest work across weddings, events, and portraits.</p>

          <div className="flex flex-wrap gap-4 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-110 hover:rotate-1 active:scale-95 ${
                filter === cat
                  ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 text-gray-900 shadow-xl shadow-yellow-500/30'
                  : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 border border-yellow-500/30 hover:border-yellow-500 hover:bg-gray-800'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>
      </Reveal>

      <Reveal direction="up">
      <Gallery images={displayed} onOpen={idx => setOpenIndex(idx)} />
      </Reveal>

      {/* Lightbox Modal */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 text-yellow-500 text-3xl font-bold hover:text-yellow-400 transition z-10 bg-black/50 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            <img
              src={displayed[openIndex].hdUrl || displayed[openIndex].url}
              alt={displayed[openIndex].title}
              className="w-full rounded-lg shadow-2xl shadow-yellow-500/30"
              onClick={e => e.stopPropagation()}
            />

            <div className="mt-4 flex items-center justify-between text-white">
              <p className="text-lg font-semibold">{displayed[openIndex].title}</p>
              <div className="space-x-2">
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setOpenIndex(openIndex > 0 ? openIndex - 1 : displayed.length - 1)
                  }}
                  className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500/40 text-yellow-500 rounded transition"
                >
                  ← Prev
                </button>
                <span className="text-sm bg-gray-800 border border-yellow-500/30 px-3 py-2 rounded inline-block">
                  {openIndex + 1} / {displayed.length}
                </span>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setOpenIndex(openIndex < displayed.length - 1 ? openIndex + 1 : 0)
                  }}
                  className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500/40 text-yellow-500 rounded transition"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
