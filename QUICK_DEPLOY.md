# Quick Deployment Steps

## 🚀 Fastest Way: Vercel + Render

### Backend (Render) - 5 minutes

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Name**: `your-app-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm ci && npm run build` (or `npm install && npm run build`)
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   HOST=0.0.0.0
   LOG_ENABLED=false
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```
6. Click "Create Web Service"
7. Wait for deployment → Copy URL (e.g., `https://your-app.onrender.com`)

### Frontend (Vercel) - 3 minutes

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `my-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-app.onrender.com` (from step 7 above)
6. Click "Deploy"
7. Done! Your app is live 🎉

### Update Backend CORS

1. Go back to Render dashboard
2. Update `CORS_ORIGIN` to your Vercel URL
3. Redeploy

---

## 📋 Pre-Deployment Checklist

### Backend
- [ ] `package.json` has `build` and `start` scripts ✅
- [ ] `.env` file is NOT committed (use `.gitignore`)
- [ ] All environment variables set in hosting platform
- [ ] CORS origin set correctly

### Frontend
- [ ] `VITE_API_URL` environment variable set
- [ ] Build works locally: `npm run build`
- [ ] No hardcoded API URLs in code

---

## 🔗 Your URLs After Deployment

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.onrender.com`
- **Health Check**: `https://your-app.onrender.com/health`

---

## ⚠️ Important Notes

1. **Render Free Tier**: Spins down after 15 min inactivity (first request takes ~30s)
2. **Environment Variables**: Must be set in hosting platform, not in `.env` files
3. **CORS**: Must match your frontend URL exactly
4. **Build Time**: First deployment takes 5-10 minutes

---

## 🆘 Troubleshooting

**Backend not starting?**
- Check build logs in Render
- Verify `npm start` works locally
- Check environment variables are set

**Frontend can't connect to backend?**
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Check browser console for errors

**CORS errors?**
- Ensure `CORS_ORIGIN` matches frontend URL exactly
- No trailing slashes
- Include `https://` protocol

---

That's it! Your app should be live in ~10 minutes! 🚀

