# Photography Portfolio - Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account with the repository
- Vercel account (sign up at https://vercel.com)
- Cloudinary account for image storage

### Step 1: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository: `Rishit912/photography`
4. Click "Import"

### Step 2: Configure Build Settings

Vercel will auto-detect the configuration from `vercel.json`. Ensure:
- **Framework Preset**: Other
- **Root Directory**: ./
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`

### Step 3: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

#### Required Variables:
```
ADMIN_PASSWORD=Admin!2026#Photo
JWT_SECRET=SuperSecureJWTSecret!2026#PhotoKey
NODE_ENV=production
STORAGE_PROVIDER=cloudinary
CLOUDINARY_CLOUD_NAME=dedbwhnxd
CLOUDINARY_API_KEY=697832163816939
CLOUDINARY_API_SECRET=hmGAoTp1bmFFo_KXuBbOq0h8sdo
CLOUDINARY_FOLDER=photography/uploads
EMAIL_PROVIDER=none
VERCEL=1
```

#### Optional (if using email):
```
EMAIL_FROM="OM Studio" <no-reply@example.com>
EMAIL_TO=owner@example.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

### Step 5: Update Client Origin

After deployment, add your Vercel URL to environment variables:
```
CLIENT_ORIGIN=https://your-project.vercel.app
```

## 📁 Project Structure

```
photography/
├── api/
│   └── index.js          # Vercel serverless function entry
├── backend/
│   ├── index.js          # Express API server
│   ├── db.js            # SQLite database
│   └── .env             # Backend environment variables
├── frontend/
│   ├── src/
│   ├── dist/            # Build output
│   └── .env.production  # Frontend environment variables
├── vercel.json          # Vercel configuration
└── README.md            # This file
```

## 🔧 Local Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Features

- **Admin Portal**: Upload and manage photos
- **Client Portal**: Clients can view and download their photos using unique keys
- **Cloudinary Integration**: Scalable image storage
- **Responsive Design**: Works on all devices
- **Authentication**: JWT-based secure authentication

## 📝 Admin Access

- **URL**: `https://your-project.vercel.app/admin/login`
- **Password**: `Admin!2026#Photo`

## 🎨 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: SQLite (for Vercel, consider upgrading to PostgreSQL)
- **Storage**: Cloudinary
- **Deployment**: Vercel

## ⚠️ Important Notes

### Database Limitation
SQLite on Vercel is **ephemeral** (resets on each deployment). For production:

1. **Option 1: Use Vercel Postgres** (Recommended)
   ```bash
   # Install Vercel Postgres
   npm install @vercel/postgres
   ```

2. **Option 2: Use External Database**
   - MongoDB Atlas
   - PlanetScale (MySQL)
   - Supabase (PostgreSQL)

### File Uploads
Always use Cloudinary (already configured) for image storage, not local storage.

## 🔄 Redeployment

To redeploy after making changes:
```bash
git add .
git commit -m "Update message"
git push origin main
```

Vercel will automatically detect the push and redeploy.

## 🆘 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Verify all dependencies in `package.json`
- Check Vercel logs for specific errors

### API Not Working
- Ensure environment variables include `VERCEL=1`
- Check API routes are prefixed with `/api`
- Verify CORS settings include your Vercel domain

### Images Not Loading
- Confirm Cloudinary credentials are correct
- Check Cloudinary upload folder permissions
- Verify STORAGE_PROVIDER=cloudinary

## 📞 Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Review error logs in Vercel dashboard
- Check browser console for frontend errors

## 🎉 Success!

Once deployed, your photography portfolio is live and ready to use!

**Admin Dashboard**: `https://your-project.vercel.app/admin/login`
**Client Portal**: `https://your-project.vercel.app/client/login`
