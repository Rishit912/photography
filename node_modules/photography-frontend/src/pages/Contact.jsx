import React from 'react'
import Reveal from '../components/Reveal'
import { apiFetch } from '../lib/api'

export default function Contact(){
  const [formData, setFormData] = React.useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = React.useState(false)
  const [sending, setSending] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submit = async e => {
    e.preventDefault()
    try {
      setSending(true)
      await apiFetch('/api/contact', { method: 'POST', body: formData })
      setSent(true)
      setError('')
      setTimeout(() => setSent(false), 3000)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err.message || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  return (
    <section>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold tracking-wider mb-6">
            💌 CONTACT US
          </div>
          <h1 className="text-6xl font-black mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600">Touch</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">Have questions or interested in booking? We'd love to hear from you.</p>
        </div>

        <Reveal direction="left">
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="group text-center bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-3 transition-all duration-500">
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">📧</div>
            <h3 className="font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 text-lg">Email</h3>
            <p className="text-gray-400 break-all text-sm">hello@photography.com</p>
          </div>
          <div className="group text-center bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-3 transition-all duration-500">
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">📱</div>
            <h3 className="font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 text-lg">Phone</h3>
            <p className="text-gray-400">+91 9909345049</p>
          </div>
          <div className="group text-center bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/60 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-3 transition-all duration-500">
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">📍</div>
            <h3 className="font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 text-lg">Location</h3>
            <p className="text-gray-400">Rajkot , Gujarat</p>
          </div>
        </div>
        </Reveal>

        <Reveal direction="up">
        <div className="relative bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600"></div>
          {!sent ? (
            <form onSubmit={submit} className="space-y-8">
              {error && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded">{error}</div>}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-900/50 border border-yellow-500/30 text-gray-100 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all w-full px-4 py-3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-900/50 border border-yellow-500/30 text-gray-100 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all w-full px-4 py-3"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-gray-900/50 border border-yellow-500/30 text-gray-100 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all w-full px-4 py-3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="bg-gray-900/50 border border-yellow-500/30 text-gray-100 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all w-full px-4 py-3 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group px-10 py-4 bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-600 text-gray-900 font-bold rounded-xl hover:from-yellow-400 hover:via-yellow-500 hover:to-amber-500 transition-all shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transform w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2 justify-center">
                  {sending ? 'Sending...' : 'Send Message'}
                  {!sending && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                </span>
              </button>
            </form>
          ) : (
            <div className="p-10 bg-gradient-to-br from-yellow-500/10 to-amber-600/10 backdrop-blur-sm border border-yellow-500/30 rounded-2xl text-center">
              <div className="text-6xl mb-6 animate-bounce">✓</div>
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">Message Sent!</h3>
              <p className="text-gray-300 text-lg">Thank you for your inquiry. We'll respond within 24 hours.</p>
            </div>
          )}
        </div>
        </Reveal>
      </div>
    </section>
  )
}
