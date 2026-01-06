import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { apiFetch, API_URL } from '../lib/api'

export default function ClientPortal() {
  const { auth, logout } = useContext(AuthContext)
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [downloadFormat, setDownloadFormat] = useState('hd')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function loadPhotos() {
      if (!auth?.token) return
      try {
        const data = await apiFetch('/api/client/photos', { token: auth.token })
        if (active) {
          setPhotos(data)
          setError('')
        }
      } catch (err) {
        if (active) setError(err.message || 'Failed to load photos')
      } finally {
        if (active) setLoading(false)
      }
    }
    loadPhotos()
    return () => { active = false }
  }, [auth?.token])

  const clientPhotos = photos

  const handleDownload = (photo) => {
    const target = downloadFormat === 'hd' ? photo.hdUrl : photo.previewUrl
    const url = target?.startsWith('http') ? target : `${API_URL}${target}`
    // Create a temporary anchor to trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = `${photo.title}-${downloadFormat}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-black relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative backdrop-blur-2xl bg-gradient-to-r from-gray-900/90 via-purple-900/50 to-gray-900/90 border-b-2 border-yellow-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl shadow-yellow-500/50">
              <span className="text-4xl">📸</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-shimmer">Your Gallery</h1>
              <p className="text-gray-400 mt-2 text-lg">Welcome back, <span className="font-bold text-yellow-500 text-xl">{auth?.clientName}</span> ✨</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block w-20 h-20 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-6 text-xl">✨ Loading your beautiful photos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <div className="text-8xl mb-6">⚠️</div>
            <p className="text-red-400 text-xl">{error}</p>
          </div>
        ) : clientPhotos.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-9xl mb-8 animate-bounce">📸</div>
            <p className="text-gray-400 text-2xl mb-4">No photos yet</p>
            <p className="text-gray-500 text-lg">Your photographer will upload your amazing shots soon! ✨</p>
          </div>
        ) : (
          <>
            <div className="mb-10 backdrop-blur-xl bg-white/5 border-2 border-yellow-500/30 rounded-3xl p-6 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🖼️</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Your Collection</p>
                  <p className="text-white text-2xl font-bold"><span className="text-yellow-500">{clientPhotos.length}</span> Beautiful Photos</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {clientPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-yellow-500/30 hover:border-yellow-500/80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-105"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="relative overflow-hidden bg-black/40 h-72">
                    <img
                      src={photo.previewUrl?.startsWith('http') ? photo.previewUrl : `${API_URL}${photo.previewUrl}`}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <div className="text-5xl mb-3">👁️</div>
                        <span className="text-white text-xl font-bold">View & Download</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-900/90 to-black/90">
                    <h3 className="font-bold text-white text-xl mb-2">{photo.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <span>📅</span>
                      <span>{new Date(photo.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/98 backdrop-blur-2xl flex items-center justify-center z-50 p-6 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-yellow-500/40 rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b-2 border-yellow-500/30 backdrop-blur-xl bg-gray-900/90">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🖼️</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">{selectedPhoto.title}</h2>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-12 h-12 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-2xl font-bold text-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-110"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl mb-8 bg-black/40">
                <img
                  src={(selectedPhoto.hdUrl || selectedPhoto.previewUrl)?.startsWith('http')
                    ? (selectedPhoto.hdUrl || selectedPhoto.previewUrl)
                    : `${API_URL}${selectedPhoto.hdUrl || selectedPhoto.previewUrl}`}
                  alt={selectedPhoto.title}
                  className="w-full"
                />
              </div>

              <div className="space-y-6">
                <div className="backdrop-blur-xl bg-white/5 border-2 border-yellow-500/30 rounded-2xl p-6">
                  <label className="block text-lg font-bold mb-4 text-white">📥 Download Format</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className={`flex-1 cursor-pointer transition-all duration-300 ${
                      downloadFormat === 'hd' 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-xl shadow-yellow-500/50' 
                        : 'bg-white/5 hover:bg-white/10'
                    } rounded-2xl p-5 border-2 border-yellow-500/30`}>
                      <input
                        type="radio"
                        value="hd"
                        checked={downloadFormat === 'hd'}
                        onChange={e => setDownloadFormat(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{downloadFormat === 'hd' ? '✅' : '⚪'}</div>
                        <div>
                          <span className={`font-bold text-lg block ${downloadFormat === 'hd' ? 'text-gray-900' : 'text-white'}`}>HD Quality</span>
                          <span className={`text-sm ${downloadFormat === 'hd' ? 'text-gray-800' : 'text-gray-400'}`}>High Resolution</span>
                        </div>
                      </div>
                    </label>
                    <label className={`flex-1 cursor-pointer transition-all duration-300 ${
                      downloadFormat === 'preview' 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-xl shadow-yellow-500/50' 
                        : 'bg-white/5 hover:bg-white/10'
                    } rounded-2xl p-5 border-2 border-yellow-500/30`}>
                      <input
                        type="radio"
                        value="preview"
                        checked={downloadFormat === 'preview'}
                        onChange={e => setDownloadFormat(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{downloadFormat === 'preview' ? '✅' : '⚪'}</div>
                        <div>
                          <span className={`font-bold text-lg block ${downloadFormat === 'preview' ? 'text-gray-900' : 'text-white'}`}>Preview</span>
                          <span className={`text-sm ${downloadFormat === 'preview' ? 'text-gray-800' : 'text-gray-400'}`}>Web Optimized</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(selectedPhoto)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 py-6 rounded-2xl font-bold text-xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 flex items-center justify-center gap-3"
                >
                  <span className="text-3xl">⬇️</span>
                  Download {downloadFormat === 'hd' ? 'HD Version' : 'Preview Version'}
                </button>

                <div className="backdrop-blur-xl bg-yellow-500/10 border-2 border-yellow-500/30 p-5 rounded-2xl">
                  <div className="space-y-2 text-sm text-yellow-200">
                    <p className="flex items-center gap-2"><span className="text-lg">✨</span><strong>HD Download:</strong> Professional quality (4K/6K resolution)</p>
                    <p className="flex items-center gap-2"><span className="text-lg">🌐</span><strong>Preview:</strong> Perfect for social media & quick sharing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
