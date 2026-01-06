const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendgridMail = require('@sendgrid/mail')
const cloudinary = require('cloudinary').v2
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const { init, run, get, all } = require('./db')

const PORT = process.env.PORT || 4000
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2025'
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',').map(o => o.trim()) : ['http://localhost:5173']
const STORAGE_PROVIDER = (process.env.STORAGE_PROVIDER || 'local').toLowerCase()
const EMAIL_PROVIDER = (process.env.EMAIL_PROVIDER || 'none').toLowerCase()

// Cloudinary setup
if (STORAGE_PROVIDER === 'cloudinary') {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })
}

// S3 setup
let s3Client = null
if (STORAGE_PROVIDER === 's3') {
  s3Client = new S3Client({
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT || undefined,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
    }
  })
}

// Email setup
let mailTransport = null
if (EMAIL_PROVIDER === 'smtp') {
  mailTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
} else if (EMAIL_PROVIDER === 'sendgrid' && process.env.SENDGRID_API_KEY) {
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const app = express()

const corsOptions = {
  origin: CLIENT_ORIGIN && CLIENT_ORIGIN.length ? CLIENT_ORIGIN : true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

function generateKey() {
  return crypto.randomBytes(12).toString('base64url')
}

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' })
}

async function sendEmail(subject, text) {
  const from = process.env.EMAIL_FROM
  const to = process.env.EMAIL_TO
  if (!from || !to || EMAIL_PROVIDER === 'none') return

  try {
    if (EMAIL_PROVIDER === 'smtp' && mailTransport) {
      await mailTransport.sendMail({ from, to, subject, text })
    } else if (EMAIL_PROVIDER === 'sendgrid' && process.env.SENDGRID_API_KEY) {
      await sendgridMail.send({ from, to, subject, text })
    }
  } catch (err) {
    console.error('Email send failed:', err.message)
  }
}

function safeFileName(original) {
  return original.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_.-]/g, '')
}

async function storeFileBuffer(file, variant) {
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  const baseName = safeFileName(file.originalname || `${variant}.bin`)

  if (STORAGE_PROVIDER === 'cloudinary') {
    const folder = process.env.CLOUDINARY_FOLDER || 'photography/uploads'
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (err, result) => {
        if (err) return reject(err)
        resolve({ url: result.secure_url })
      })
      stream.end(file.buffer)
    })
  }

  if (STORAGE_PROVIDER === 's3') {
    const bucket = process.env.S3_BUCKET
    const regionBase = process.env.S3_PUBLIC_BASE || ''
    const key = `uploads/${unique}-${baseName}`
    const command = new PutObjectCommand({ Bucket: bucket, Key: key, Body: file.buffer, ContentType: file.mimetype })
    await s3Client.send(command)
    const url = regionBase ? `${regionBase}/${key}` : `https://${bucket}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`
    return { url }
  }

  // local fallback
  const destDir = path.join(__dirname, 'uploads')
  fs.mkdirSync(destDir, { recursive: true })
  const filename = `${unique}-${baseName}`
  const filePath = path.join(destDir, filename)
  fs.writeFileSync(filePath, file.buffer)
  return { url: `/uploads/${filename}` }
}

function requireAuth(expectedRole) {
  return (req, res, next) => {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) {
      return res.status(401).json({ message: 'Missing token' })
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      if (expectedRole && decoded.role !== expectedRole) {
        return res.status(403).json({ message: 'Forbidden' })
      }
      req.user = decoded
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
}

function deleteLocalIfNeeded(url) {
  if (STORAGE_PROVIDER !== 'local') return
  if (!url || !url.startsWith('/uploads/')) return
  const filePath = path.join(__dirname, url.replace('/uploads/', 'uploads/'))
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, () => {})
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {}
  if (!password) return res.status(400).json({ message: 'Password required' })
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ message: 'Invalid admin password' })

  const token = signToken({ role: 'admin' })
  return res.json({ token, role: 'admin' })
})

app.get('/api/admin/clients', requireAuth('admin'), async (req, res) => {
  try {
    const clients = await all('SELECT id, name, client_key AS clientKey, created_at AS createdAt FROM clients ORDER BY created_at DESC')
    res.json(clients)
  } catch (err) {
    console.error('Error listing clients', err)
    res.status(500).json({ message: 'Failed to fetch clients' })
  }
})

app.post('/api/admin/clients', requireAuth('admin'), async (req, res) => {
  const { name } = req.body || {}
  if (!name) return res.status(400).json({ message: 'Name is required' })

  const clientKey = generateKey()
  const createdAt = new Date().toISOString()

  try {
    const result = await run('INSERT INTO clients (name, client_key, created_at) VALUES (?, ?, ?)', [name, clientKey, createdAt])
    res.status(201).json({ id: result.lastID, name, clientKey, createdAt })
  } catch (err) {
    console.error('Error creating client', err)
    res.status(500).json({ message: 'Failed to create client' })
  }
})

app.delete('/api/admin/clients/:id', requireAuth('admin'), async (req, res) => {
  const clientId = Number(req.params.id)
  if (!Number.isInteger(clientId)) return res.status(400).json({ message: 'Invalid client id' })

  try {
    const photos = await all('SELECT preview_url AS previewUrl, hd_url AS hdUrl FROM photos WHERE client_id = ?', [clientId])
    photos.forEach(p => {
      deleteLocalIfNeeded(p.previewUrl)
      deleteLocalIfNeeded(p.hdUrl)
    })

    await run('DELETE FROM clients WHERE id = ?', [clientId])
    res.json({ message: 'Client deleted' })
  } catch (err) {
    console.error('Error deleting client', err)
    res.status(500).json({ message: 'Failed to delete client' })
  }
})

app.get('/api/admin/clients/:id/photos', requireAuth('admin'), async (req, res) => {
  const clientId = Number(req.params.id)
  if (!Number.isInteger(clientId)) return res.status(400).json({ message: 'Invalid client id' })
  try {
    const photos = await all(
      'SELECT id, client_id AS clientId, title, preview_url AS previewUrl, hd_url AS hdUrl, uploaded_at AS uploadedAt FROM photos WHERE client_id = ? ORDER BY uploaded_at DESC',
      [clientId]
    )
    res.json(photos)
  } catch (err) {
    console.error('Error fetching photos', err)
    res.status(500).json({ message: 'Failed to fetch photos' })
  }
})

app.post(
  '/api/admin/photos',
  requireAuth('admin'),
  upload.fields([
    { name: 'preview', maxCount: 1 },
    { name: 'hd', maxCount: 1 }
  ]),
  async (req, res) => {
    const { clientId, title, previewUrl, hdUrl } = req.body || {}
    if (!clientId || !title) return res.status(400).json({ message: 'clientId and title are required' })

    try {
      const client = await get('SELECT id FROM clients WHERE id = ?', [clientId])
      if (!client) return res.status(404).json({ message: 'Client not found' })

      const previewFile = req.files?.preview?.[0]
      const hdFile = req.files?.hd?.[0]

      let resolvedPreview = previewUrl || null
      let resolvedHd = hdUrl || null

      if (previewFile) {
        const stored = await storeFileBuffer(previewFile, 'preview')
        resolvedPreview = stored.url
      }

      if (hdFile) {
        const stored = await storeFileBuffer(hdFile, 'hd')
        resolvedHd = stored.url
      }

      if (!resolvedPreview) return res.status(400).json({ message: 'Preview image or URL is required' })
      resolvedHd = resolvedHd || resolvedPreview
      const uploadedAt = new Date().toISOString()

      const result = await run(
        'INSERT INTO photos (client_id, title, preview_url, hd_url, uploaded_at) VALUES (?, ?, ?, ?, ?)',
        [clientId, title, resolvedPreview, resolvedHd, uploadedAt]
      )

      res.status(201).json({
        id: result.lastID,
        clientId: Number(clientId),
        title,
        previewUrl: resolvedPreview,
        hdUrl: resolvedHd,
        uploadedAt
      })

      sendEmail('New photo uploaded', `Client ID: ${clientId}\nTitle: ${title}\nUploaded: ${uploadedAt}`)
    } catch (err) {
      console.error('Error uploading photo', err)
      res.status(500).json({ message: 'Failed to upload photo' })
    }
  }
)

app.delete('/api/admin/photos/:id', requireAuth('admin'), async (req, res) => {
  const photoId = Number(req.params.id)
  if (!Number.isInteger(photoId)) return res.status(400).json({ message: 'Invalid photo id' })
  try {
    const photo = await get('SELECT preview_url AS previewUrl, hd_url AS hdUrl FROM photos WHERE id = ?', [photoId])
    if (!photo) return res.status(404).json({ message: 'Photo not found' })

    deleteLocalIfNeeded(photo.previewUrl)
    deleteLocalIfNeeded(photo.hdUrl)

    await run('DELETE FROM photos WHERE id = ?', [photoId])
    res.json({ message: 'Photo deleted' })
  } catch (err) {
    console.error('Error deleting photo', err)
    res.status(500).json({ message: 'Failed to delete photo' })
  }
})

app.post('/api/client/login', async (req, res) => {
  const { key } = req.body || {}
  if (!key) return res.status(400).json({ message: 'Client key required' })

  try {
    const client = await get('SELECT id, name FROM clients WHERE client_key = ?', [key])
    if (!client) return res.status(401).json({ message: 'Invalid client key' })

    const token = signToken({ role: 'client', clientId: client.id, clientName: client.name })
    res.json({ token, role: 'client', clientId: client.id, clientName: client.name })
  } catch (err) {
    console.error('Client login error', err)
    res.status(500).json({ message: 'Failed to login' })
  }
})

app.get('/api/client/photos', requireAuth('client'), async (req, res) => {
  try {
    const photos = await all(
      'SELECT id, client_id AS clientId, title, preview_url AS previewUrl, hd_url AS hdUrl, uploaded_at AS uploadedAt FROM photos WHERE client_id = ? ORDER BY uploaded_at DESC',
      [req.user.clientId]
    )
    res.json(photos)
  } catch (err) {
    console.error('Error fetching client photos', err)
    res.status(500).json({ message: 'Failed to fetch photos' })
  }
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {}
  if (!name || !email || !subject || !message) return res.status(400).json({ message: 'All fields are required' })

  const createdAt = new Date().toISOString()
  try {
    await run(
      'INSERT INTO contact_messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject, message, createdAt]
    )
    sendEmail('New contact inquiry', `From: ${name} <${email}>\nSubject: ${subject}\nMessage: ${message}`)
    res.status(201).json({ message: 'Message received' })
  } catch (err) {
    console.error('Error saving contact message', err)
    res.status(500).json({ message: 'Failed to send message' })
  }
})

init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('Failed to init database', err)
    process.exit(1)
  })
