import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { apiFetch, API_URL } from '../lib/api'

export default function AdminDashboard() {
  const { logout, auth } = useContext(AuthContext)
  const [clients, setClients] = useState([])
  const [photos, setPhotos] = useState([])
  const [newClientName, setNewClientName] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [photoTitle, setPhotoTitle] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoHdUrl, setPhotoHdUrl] = useState('')
  const [previewFile, setPreviewFile] = useState(null)
  const [hdFile, setHdFile] = useState(null)
  const [uploadMode, setUploadMode] = useState('url') // 'url' or 'file'
  const [activeTab, setActiveTab] = useState('clients')
  const [loadingClients, setLoadingClients] = useState(true)
  const [loadingPhotos, setLoadingPhotos] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadClients()
  }, [auth?.token])

  useEffect(() => {
    if (selectedClient) {
      loadPhotos(selectedClient)
    } else {
      setPhotos([])
    }
  }, [selectedClient])

  const loadClients = async () => {
    if (!auth?.token) return
    setLoadingClients(true)
    try {
      const data = await apiFetch('/api/admin/clients', { token: auth.token })
      setClients(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load clients')
    } finally {
      setLoadingClients(false)
    }
  }

  const loadPhotos = async (clientId) => {
    if (!auth?.token) return
    setLoadingPhotos(true)
    try {
      const data = await apiFetch(`/api/admin/clients/${clientId}/photos`, { token: auth.token })
      setPhotos(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to load photos')
    } finally {
      setLoadingPhotos(false)
    }
  }

  const addClient = () => {
    if (!newClientName.trim() || !auth?.token) return
    apiFetch('/api/admin/clients', {
      method: 'POST',
      token: auth.token,
      body: { name: newClientName.trim() }
    })
      .then(client => {
        setClients(prev => [client, ...prev])
        setNewClientName('')
        setError('')
      })
      .catch(err => setError(err.message || 'Failed to add client'))
  }

  const deleteClient = id => {
    if (!auth?.token) return

    if (uploadMode === 'file' && !previewFile) {
      alert('Select at least a preview image file')
      return
    }
    apiFetch(`/api/admin/clients/${id}`, { method: 'DELETE', token: auth.token })
      .then(() => {
        setClients(clients.filter(c => c.id !== id))
        if (selectedClient === id) {
          setSelectedClient(null)
          setPhotos([])
        }
      })
      .catch(err => setError(err.message || 'Failed to delete client'))
  }

  // Handle file upload and convert to base64
  const handleFileUpload = (e, isHd = false) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (isHd) {
      setHdFile(file)
    } else {
      setPreviewFile(file)
    }
  }

  const addPhoto = () => {
    if (!selectedClient || !photoTitle.trim()) {
      alert('Fill all fields and select a client')
      return
    }

    if (uploadMode === 'url' && !photoUrl.trim()) {
      alert('Provide a preview image URL')
      return
    }

    if (!auth?.token) return

    if (uploadMode === 'url') {
      apiFetch('/api/admin/photos', {
        method: 'POST',
        token: auth.token,
        body: {
          clientId: selectedClient,
          title: photoTitle,
          previewUrl: photoUrl,
          hdUrl: photoHdUrl || undefined
        }
      })
        .then(photo => {
          setPhotos(prev => [photo, ...prev])
          resetUploadState()
        })
        .catch(err => setError(err.message || 'Failed to upload photo'))
    } else {
      const formData = new FormData()
      formData.append('clientId', selectedClient)
      formData.append('title', photoTitle)
      if (previewFile) formData.append('preview', previewFile)
      if (hdFile) formData.append('hd', hdFile)

      apiFetch('/api/admin/photos', {
        method: 'POST',
        token: auth.token,
        body: formData,
        isFormData: true
      })
        .then(photo => {
          setPhotos(prev => [photo, ...prev])
          resetUploadState()
        })
        .catch(err => setError(err.message || 'Failed to upload photo'))
    }
  }

  const deletePhoto = id => {
    if (!auth?.token) return
    apiFetch(`/api/admin/photos/${id}`, { method: 'DELETE', token: auth.token })
      .then(() => setPhotos(photos.filter(p => p.id !== id)))
      .catch(err => setError(err.message || 'Failed to delete photo'))
  }

  const clientPhotos = selectedClient ? photos.filter(p => p.clientId === selectedClient) : []

  const resetUploadState = () => {
    setPhotoTitle('')
    setPhotoUrl('')
    setPhotoHdUrl('')
    setPreviewFile(null)
    setHdFile(null)
    setUploadMode('url')
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-yellow-500/5 to-purple-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Photography Management</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-medium transition shadow-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 relative">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-800/50 p-1.5 rounded-xl border border-gray-700">
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex-1 px-6 py-2.5 font-semibold text-sm transition-all duration-200 rounded-lg ${
              activeTab === 'clients' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 px-6 py-2.5 font-semibold text-sm transition-all duration-200 rounded-lg ${
              activeTab === 'photos' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            Photos
          </button>
        </div>

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Client
              </h2>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={newClientName}
                  onChange={e => setNewClientName(e.target.value)}
                  placeholder="Enter client name"
                  className="flex-1 bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  onClick={addClient}
                  className="md:w-auto w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition shadow-lg"
                >
                  Add Client
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {loadingClients ? (
                <div className="text-center py-16">
                  <div className="inline-block w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                  <p className="text-gray-400 mt-4">Loading clients...</p>
                </div>
              ) : clients.map(client => (
                <div key={client.id} className="group bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 rounded-xl p-5 transition-all duration-200 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">{client.name}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-gray-900/70 border border-gray-700 px-3 py-2 rounded-lg">
                          <span className="text-xs text-gray-400">Access Key:</span>
                          <span className="font-mono font-semibold text-blue-400">{client.clientKey}</span>
                        </div>
                        <p className="text-xs text-gray-500">Added {new Date(client.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-400 rounded-lg font-medium transition text-sm ml-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {clients.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📋</div>
                  <p className="text-gray-500 text-sm">No clients yet. Add your first client above!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Photo
              </h2>
              
              {/* Upload Mode Selector */}
              <div className="flex gap-2 mb-5 bg-gray-900/50 p-1.5 rounded-lg border border-gray-700">
                <button
                  onClick={() => setUploadMode('url')}
                  className={`flex-1 px-4 py-2 font-medium text-sm transition-all duration-200 rounded-md ${
                    uploadMode === 'url' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Image URL
                </button>
                <button
                  onClick={() => setUploadMode('file')}
                  className={`flex-1 px-4 py-2 font-medium text-sm transition-all duration-200 rounded-md ${
                    uploadMode === 'file' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Upload File
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select Client</label>
                  <select
                    value={selectedClient || ''}
                    onChange={e => setSelectedClient(e.target.value ? Number(e.target.value) : null)}
                    className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="">Choose a client...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Photo Title</label>
                  <input
                    type="text"
                    value={photoTitle}
                    onChange={e => setPhotoTitle(e.target.value)}
                    placeholder="e.g., Golden Hour at the Beach"
                    className="w-full bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {uploadMode === 'url' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preview Image URL</label>
                      <input
                        type="text"
                        value={photoUrl}
                        onChange={e => setPhotoUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">HD Download URL <span className="text-gray-500">(optional)</span></label>
                      <input
                        type="text"
                        value={photoHdUrl}
                        onChange={e => setPhotoHdUrl(e.target.value)}
                        placeholder="https://example.com/image-hd.jpg"
                        className="w-full bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Preview Image</label>
                      <label className="group block w-full px-6 py-10 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-800/50 transition-all bg-gray-900/30 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleFileUpload(e, false)}
                          className="hidden"
                        />
                        <div>
                          {previewFile ? (
                            <div className="space-y-2">
                              <svg className="w-12 h-12 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-white font-medium">{previewFile.name}</p>
                              <p className="text-gray-500 text-xs">Click to change</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <svg className="w-12 h-12 text-gray-500 mx-auto group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-white font-medium">Click to Upload</p>
                              <p className="text-gray-500 text-xs">PNG, JPG up to 10MB</p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">HD Image <span className="text-gray-500">(optional)</span></label>
                      <label className="group block w-full px-6 py-10 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-gray-800/50 transition-all bg-gray-900/30 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleFileUpload(e, true)}
                          className="hidden"
                        />
                        <div>
                          {hdFile ? (
                            <div className="space-y-2">
                              <svg className="w-12 h-12 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="text-white font-medium">{hdFile.name}</p>
                              <p className="text-gray-500 text-xs">Click to change</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <svg className="w-12 h-12 text-gray-500 mx-auto group-hover:text-purple-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-white font-medium">Click to Upload</p>
                              <p className="text-gray-500 text-xs">High resolution version</p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </>
                )}

                <button
                  onClick={addPhoto}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition shadow-lg"
                >
                  Upload Photo
                </button>
              </div>
            </div>

            {selectedClient && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">
                <h2 className="text-lg font-bold text-white mb-5">
                  Photos for {clients.find(c => c.id === selectedClient)?.name}
                </h2>
                {loadingPhotos ? (
                  <div className="text-center py-16">
                    <div className="inline-block w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="text-gray-400 mt-4">Loading photos...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {clientPhotos.map((photo, index) => (
                        <div key={photo.id} className="group bg-gray-900/50 border border-gray-700 hover:border-gray-600 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg">
                          <div className="relative h-48 overflow-hidden bg-black">
                            <img
                              src={photo.previewUrl?.startsWith('http') ? photo.previewUrl : `${API_URL}${photo.previewUrl}`}
                              alt={photo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 bg-gray-900">
                            <p className="font-medium text-white text-sm mb-2 line-clamp-1">{photo.title}</p>
                            <button
                              onClick={() => deletePhoto(photo.id)}
                              className="w-full px-3 py-1.5 bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-400 rounded font-medium transition text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {clientPhotos.length === 0 && (
                      <div className="text-center py-16">
                        <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-400">No photos yet</p>
                        <p className="text-gray-600 text-sm mt-1">Upload your first photo above</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <div className="max-w-6xl mx-auto p-4 text-red-400">{error}</div>}
    </div>
  )
}
