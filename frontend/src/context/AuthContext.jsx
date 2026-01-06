import React, { createContext, useState, useEffect } from 'react'
import { apiFetch } from '../lib/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      try {
        setAuth(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load auth:', e)
      }
    }
    setLoading(false)
  }, [])

  const adminLogin = async (password) => {
    const result = await apiFetch('/api/admin/login', { method: 'POST', body: { password } })
    const authData = { token: result.token, role: 'admin' }
    setAuth(authData)
    localStorage.setItem('auth', JSON.stringify(authData))
    return true
  }

  const clientLogin = async (clientKey) => {
    const result = await apiFetch('/api/client/login', { method: 'POST', body: { key: clientKey } })
    const authData = {
      token: result.token,
      role: 'client',
      clientId: result.clientId,
      clientName: result.clientName
    }
    setAuth(authData)
    localStorage.setItem('auth', JSON.stringify(authData))
    return true
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem('auth')
  }

  const isAdmin = () => auth?.role === 'admin'
  const isClient = () => auth?.role === 'client'
  const isLoggedIn = () => !!auth

  return (
    <AuthContext.Provider value={{ auth, loading, adminLogin, clientLogin, logout, isAdmin, isClient, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
