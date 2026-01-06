import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function ClientLogin() {
  const { clientLogin } = useContext(AuthContext)
  const [clientKey, setClientKey] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await clientLogin(clientKey)
      setClientKey('')
      setError('')
    } catch (err) {
      setError(err.message || 'Invalid client key. Please check and try again.')
      setClientKey('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950/20 to-black px-4 py-12 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/30 to-pink-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/30 to-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="w-full max-w-md relative">
        <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-yellow-500/30 rounded-3xl p-10 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500">
          <div className="text-center mb-10">
            <div className="inline-block relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/50 animate-pulse">
                <span className="text-5xl">📸</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent mb-3 animate-shimmer">Client Portal</h1>
            <p className="text-yellow-500 text-xl font-semibold">✨ Access Your Photos</p>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full"></div>
          </div>

          {error && (
            <div className="mb-6 p-5 bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/50 text-red-200 rounded-2xl text-sm backdrop-blur-xl animate-shake">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="font-semibold">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-gray-200 mb-3 flex items-center gap-2">
                <span className="text-xl">🔑</span>
                <span>Your Client Key</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={clientKey}
                  onChange={e => setClientKey(e.target.value)}
                  placeholder="Enter your unique client key"
                  className="bg-black/40 border-2 border-yellow-500/30 text-gray-100 placeholder-gray-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all w-full px-6 py-4 text-lg backdrop-blur-xl"
                  required
                />
              </div>
              <p className="text-sm text-gray-400 mt-3 flex items-center gap-2">
                <span>💬</span>
                <span>Ask your photographer for your unique access key</span>
              </p>
            </div>
            <button
              type="submit"
              className="px-10 py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-2xl hover:shadow-yellow-500/50 w-full text-xl hover:scale-105"
            >
              🎉 View My Photos
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="backdrop-blur-xl bg-gradient-to-r from-yellow-500/10 to-purple-500/10 border-2 border-yellow-500/30 rounded-2xl p-5">
              <p className="text-sm text-gray-300 mb-2">🤔 Don't have a key?</p>
              <p className="text-base font-bold text-yellow-400">Contact your photographer</p>
            </div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-xl animate-float"></div>
        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
  )
}
