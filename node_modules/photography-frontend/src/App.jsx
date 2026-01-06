import React, { useContext } from 'react'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ClientLogin from './pages/ClientLogin'
import ClientPortal from './pages/ClientPortal'

function AppContent() {
  const { auth, loading, isAdmin, isClient } = useContext(AuthContext)
  const [route, setRoute] = React.useState('home')

  // Handle hash-based routing
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home'
      setRoute(hash)
    }
    
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Set initial route
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (path) => {
    window.location.hash = path
    setRoute(path)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  // Admin login page (accessible via #/admin)
  if (route === '/admin' && !isAdmin()) {
    return <AdminLogin />
  }

  // Admin dashboard (after login)
  if (isAdmin()) {
    return <AdminDashboard />
  }

  // Client portal (after login)
  if (isClient()) {
    return <ClientPortal />
  }

  // Public routes
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(234,179,8,0.03),transparent_50%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,179,8,0.03),transparent_50%)] pointer-events-none"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar onNavigate={navigate} />
        <main className="flex-grow container mx-auto px-4 py-8">
          {(route === 'home' || route === '') && <Home onNavigate={navigate} />}
          {route === 'client-login' && <ClientLogin />}
          {route === 'portfolio' && <Portfolio />}
          {route === 'about' && <About />}
          {route === 'contact' && <Contact />}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
