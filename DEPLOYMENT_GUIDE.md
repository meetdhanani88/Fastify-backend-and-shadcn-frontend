# Free Deployment Guide

This guide covers deploying both your frontend and backend for free using various hosting services.

---

## 🎯 Recommended Free Hosting Options

### **Option 1: Vercel (Frontend) + Render (Backend)** ⭐ Recommended
- **Frontend**: Vercel - Excellent for React/Vite apps
- **Backend**: Render - Free tier with PostgreSQL option
- **Pros**: Easy setup, automatic deployments, great performance
- **Cons**: Render free tier spins down after inactivity (15 min cold start)

### **Option 2: Netlify (Frontend) + Railway (Backend)**
- **Frontend**: Netlify - Great for static sites
- **Backend**: Railway - $5 free credit monthly (effectively free for small apps)
- **Pros**: No cold starts, always-on
- **Cons**: Railway requires credit card (but free tier available)

### **Option 3: Cloudflare Pages (Frontend) + Fly.io (Backend)**
- **Frontend**: Cloudflare Pages - Fast CDN
- **Backend**: Fly.io - Free tier with 3 shared VMs
- **Pros**: Global CDN, good performance
- **Cons**: Fly.io has some limitations

---

## 🚀 Option 1: Vercel + Render (Step-by-Step)

### **Part 1: Deploy Backend to Render**

1. **Prepare Backend for Production**

   Create `backend/.dockerignore`:
   ```
   node_modules
   dist
   .env
   .git
   *.log
   ```

   Update `backend/package.json` scripts:
   ```json
   {
     "scripts": {
       "dev": "tsx watch src/server.ts",
       "build": "tsc",
       "start": "node dist/server.js",
       "type-check": "tsc --noEmit"
     }
   }
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder
   - Settings:
     - **Name**: `your-app-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm ci && npm run build` (or `npm install && npm run build`)
     - **Start Command**: `npm start`
     - **Plan**: Free
   - Add Environment Variables:
     ```
     NODE_ENV=production
     PORT=10000
     HOST=0.0.0.0
     LOG_ENABLED=false
     LOG_LEVEL=info
     CORS_ORIGIN=https://your-frontend.vercel.app
     ```
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://your-app-backend.onrender.com`)

### **Part 2: Deploy Frontend to Vercel**

1. **Update Frontend Environment**

   Create `my-app/.env.production`:
   ```env
   VITE_API_URL=https://your-app-backend.onrender.com
   ```

   **Important**: Add `.env.production` to `.gitignore` but commit it (or use Vercel's environment variables)

2. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

3. **Deploy Frontend**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `my-app`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add Environment Variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://your-app-backend.onrender.com`
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Your app will be live at `https://your-app.vercel.app`

4. **Update Backend CORS**
   - Go back to Render dashboard
   - Update `CORS_ORIGIN` environment variable to your Vercel URL
   - Redeploy backend

---

## 🚀 Option 2: Netlify + Railway

### **Part 1: Deploy Backend to Railway**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Add credit card (required but won't charge on free tier)

2. **Deploy Backend**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Add service → Select `backend` folder
   - Railway auto-detects Node.js
   - Add Environment Variables:
     ```
     NODE_ENV=production
     PORT=$PORT
     HOST=0.0.0.0
     LOG_ENABLED=false
     CORS_ORIGIN=https://your-app.netlify.app
     ```
   - Railway provides a URL automatically

### **Part 2: Deploy Frontend to Netlify**

1. **Prepare Frontend**
   - Create `my-app/netlify.toml`:
     ```toml
     [build]
       command = "npm run build"
       publish = "dist"
     
     [[redirects]]
       from = "/*"
       to = "/index.html"
       status = 200
     ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub repository
   - Settings:
     - **Base directory**: `my-app`
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Add Environment Variable:
     - **Key**: `VITE_API_URL`
     - **Value**: Your Railway backend URL
   - Click "Deploy site"

---

## 🔧 Additional Configuration

### **Backend Production Optimizations**

1. **Update `backend/src/server.ts`** to handle production:
   ```typescript
   // Remove console.log statements
   // Ensure error handling is production-ready
   ```

2. **Add Health Check Endpoint** (already exists at `/health`)

3. **Environment Variables** - Make sure all are set in hosting platform

### **Frontend Production Build**

1. **Build Optimization** - Vite already optimizes by default
2. **Environment Variables** - Must be prefixed with `VITE_`
3. **API URL** - Update in production environment

---

## 📝 Quick Deploy Checklist

### Backend:
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Environment variables set
- [ ] CORS origin set to frontend URL
- [ ] Health check endpoint working

### Frontend:
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable `VITE_API_URL` set
- [ ] SPA routing configured (redirects)

---

## 🌐 Alternative: Single Platform (Vercel)

If you want everything on one platform, you can use **Vercel Serverless Functions**:

1. **Convert Backend to Serverless**
   - Vercel supports Node.js serverless functions
   - You'd need to adapt Fastify to work with Vercel's serverless format
   - More complex but keeps everything in one place

2. **Use Vercel + External Backend**
   - Keep backend on Render/Railway
   - Frontend on Vercel
   - This is the recommended approach

---

## 🆓 Free Tier Limits

### **Render (Backend)**
- ✅ 750 hours/month free
- ⚠️ Spins down after 15 min inactivity (cold start ~30s)
- ✅ Free SSL
- ✅ Custom domains

### **Vercel (Frontend)**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Free SSL
- ✅ Custom domains
- ✅ Automatic HTTPS

### **Railway (Backend)**
- ✅ $5 free credit/month
- ✅ Always-on (no cold starts)
- ⚠️ Requires credit card
- ✅ Free SSL

### **Netlify (Frontend)**
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Free SSL
- ✅ Custom domains

---

## 🔒 Security Checklist

1. **Environment Variables**
   - Never commit `.env` files
   - Use hosting platform's environment variable settings
   - Use different values for production

2. **CORS Configuration**
   - Set `CORS_ORIGIN` to your production frontend URL only
   - Don't use `true` in production

3. **Error Messages**
   - Ensure production error messages don't leak sensitive info
   - Check `NODE_ENV=production` is set

---

## 🐛 Troubleshooting

### Backend Issues

**Cold Start on Render:**
- First request after inactivity takes ~30 seconds
- Consider using Railway for always-on backend

**CORS Errors:**
- Verify `CORS_ORIGIN` matches your frontend URL exactly
- Check for trailing slashes

**Environment Variables:**
- Ensure all required variables are set
- Redeploy after changing environment variables

### Frontend Issues

**API Not Connecting:**
- Verify `VITE_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend is running

**Build Failures:**
- Check build logs in hosting platform
- Verify all dependencies are in `package.json`
- Ensure Node.js version is compatible

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Netlify Documentation](https://docs.netlify.com)

---

## 🎉 Next Steps After Deployment

1. **Set up custom domains** (optional)
2. **Enable monitoring** (optional, some platforms provide basic monitoring)
3. **Set up CI/CD** (automatic deployments on git push)
4. **Add database** (if needed, Render/Railway offer free PostgreSQL)

---

## 💡 Pro Tips

1. **Use GitHub Actions** for automated testing before deployment
2. **Monitor your free tier usage** to avoid unexpected charges
3. **Set up staging environment** for testing before production
4. **Use environment-specific configs** for dev/staging/prod
5. **Enable error tracking** (Sentry has free tier)

---

**Recommended Setup**: Vercel (Frontend) + Render (Backend) for the easiest free deployment experience!

