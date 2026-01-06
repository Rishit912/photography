# OM Studio - Professional Photography Portfolio

A full-featured photography portfolio with secure client galleries, HD image downloads, and admin dashboard built with Vite + React + Tailwind CSS plus an Express + SQLite backend.

## Features

✨ **Professional Design** - Modern, responsive UI showcasing photography work
🔐 **Dual Authentication** - Separate admin and client login systems with JWT sessions
👥 **Admin Dashboard** - Manage clients, generate unique keys, upload photos
📸 **Client Portal** - Personalized gallery with HD download capabilities
⬇️ **HD Downloads** - Download photos in full resolution (4K/6K quality)
📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
🎨 **Beautiful UI** - Tailwind CSS with smooth animations and interactions
🗄️ **Persistent Storage** - SQLite database with file uploads served from `/uploads`

## Authentication

### Admin Login
- Configure `ADMIN_PASSWORD` in `.env` (see setup). Default is `admin2025` for local dev.
- Features: manage clients, generate keys, upload photos.

### Client Login
- Clients authenticate with the unique key generated for them by the admin.

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm 8+

### Quick Start (PowerShell)

```powershell
cd c:\Users\Admin\Desktop\photography
npm install               # installs workspaces: frontend + backend
copy backend\.env.example backend\.env   # set ADMIN_PASSWORD, JWT_SECRET, etc.
copy frontend\.env.example frontend\.env # set VITE_API_URL
npm run dev:full          # backend on 4000, frontend on 5173
```

Frontend uses `VITE_API_URL` from `frontend/.env` (defaults to `http://localhost:4000`).

## Project Structure

```
frontend/
├── src/              # React app (components, pages, context)
├── public/           # Static assets
├── index.html        # Vite entry
├── tailwind.config.cjs
└── postcss.config.cjs

backend/
├── index.js          # Express API (auth, clients, photos, contact)
├── db.js             # SQLite setup + helpers
└── data/             # SQLite database (created at runtime)
```

## How to Use

### As Admin
1. Click "Admin" in the navbar or visit `#/admin`.
2. Login with the `ADMIN_PASSWORD` set in `backend/.env`.
3. **Manage Clients**: Add names, get auto-generated unique keys.
4. **Upload Photos**: Upload files (stored under `/uploads` served by backend) or provide external URLs.
5. Share client key with them securely.

### As Client
1. Click "Client" button in navbar
2. Enter your unique key (provided by photographer/admin)
3. View your personal gallery
4. Click photos to see full resolution
5. Download in HD or Preview format

## Deployment

### Build for Production
```powershell
npm run build
```

This creates a `dist/` folder ready for deployment.

### Deploy to Netlify
1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Deploy to Vercel
```powershell
npm i -g vercel
vercel
```

## Customization

### Update Branding
- Edit `src/components/Navbar.jsx` - Change title and logo
- Edit `src/pages/Home.jsx` - Update hero text and features
- Edit `src/index.css` - Customize colors and fonts

### Image Management
- **Admin Dashboard** → Upload Photos section
- Support any image URL (Unsplash, Pexels, your own server, Cloudinary, etc)
- HD URLs should point to 4K+ resolution versions

### Admin Password
Set `ADMIN_PASSWORD` in your `.env` before starting the backend.

## Optional Enhancements

### Backend Integration
- Use cloud storage: set `STORAGE_PROVIDER=cloudinary` or `s3` in `backend/.env` (configure Cloudinary or S3 keys). Default is `local` using `/uploads`.
- Email delivery: set `EMAIL_PROVIDER=smtp` (with SMTP creds) or `sendgrid` (with `SENDGRID_API_KEY`). Emails are sent on contact form submissions and admin photo uploads.
- Swap SQLite for PostgreSQL/MySQL if you expect larger scale.

### Image Optimization
- Integrate Cloudinary or Imgix for automatic resizing
- Lazy loading for faster performance
- WebP format conversion

### CMS Integration
- Integrate Sanity, Strapi, or Contentful for photo management
- Admin can manage content without code changes

### Email Contact
- Integrate Formspree, SendGrid, or Nodemailer
- Auto-reply to inquiries

## Storage Notes

- SQLite database lives at `backend/data/photography.db` (created automatically).
- Default uploads go to `backend/uploads` and are served from `/uploads/...`. Switch to Cloudinary or S3 via `STORAGE_PROVIDER` env vars for production durability.

## Troubleshooting

**Client key not working?**
- Ensure key is correctly copied from Admin Dashboard
- Ask admin to regenerate if lost; keys are stored server-side
- Use private/incognito window to test fresh login

**Images not showing?**
- Verify image URLs are publicly accessible
- Try a test image from Unsplash: `https://picsum.photos/seed/test/800/600`
- If using uploaded files, confirm backend is running and `VITE_API_URL` is correct

**CSS not working?**
- Run `npm install` again
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

## Support & Contact

For questions or custom modifications, contact your development team.

---

Built with ❤️ using React, Tailwind CSS, and Vite

