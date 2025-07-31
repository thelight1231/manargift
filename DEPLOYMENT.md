# Deployment Guide

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account
- Git repository (optional but recommended)

### Files Prepared
- ✅ `netlify.toml` - Netlify configuration file
- ✅ `.gitignore` - Excludes large audio files and unnecessary files

### Deployment Steps
1. **Option A: Drag & Drop**
   - Go to [Netlify](https://app.netlify.com/)
   - Drag the `frontend` folder to the deploy area
   - Site will be deployed automatically

2. **Option B: Git Integration**
   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify
   - Set build settings:
     - Build command: (leave empty)
     - Publish directory: `frontend`

### Important Notes
- Audio files are excluded from deployment due to size limits
- The site will redirect all routes to `index.html` for SPA behavior
- Security headers are configured in `netlify.toml`

---

## Backend Deployment (Railway)

### Prerequisites
- Railway account
- MongoDB Atlas account (for database)

### Files Prepared
- ✅ `railway.json` - Railway configuration file
- ✅ `.gitignore` - Excludes node_modules and sensitive files
- ✅ `package.json` - Contains start script

### Environment Variables Required
Set these in Railway dashboard:
```
MONGODB_URI=mongodb+srv://your-connection-string
PORT=4000
```

### Deployment Steps
1. **Connect Repository**
   - Go to [Railway](https://railway.app/)
   - Create new project
   - Connect your GitHub repository
   - Select the `Backend` folder as root

2. **Configure Environment**
   - Add environment variables in Railway dashboard
   - Railway will automatically detect Node.js and install dependencies

3. **Deploy**
   - Railway will automatically build and deploy
   - Your API will be available at the provided Railway URL

### API Endpoints
- `GET /` - Health check
- `POST /api/entries` - Create diary entry
- `GET /api/entries` - Get diary entries
- WebSocket support for real-time chat

---

## Connecting Frontend to Backend

After both are deployed, update the frontend to use your Railway backend URL:

1. Find API calls in `script.js`, `chat.js`, and `visual-novel.js`
2. Replace `localhost:4000` with your Railway URL
3. Redeploy frontend to Netlify

### Example URL Update
```javascript
// Before
const response = await fetch('http://localhost:4000/api/entries');

// After
const response = await fetch('https://your-app-name.railway.app/api/entries');
```

---

## Database Setup (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create a new cluster
3. Create database user
4. Whitelist Railway's IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get connection string and add to Railway environment variables

---

## Post-Deployment Checklist

- [ ] Frontend deployed to Netlify
- [ ] Backend deployed to Railway
- [ ] MongoDB Atlas configured
- [ ] Environment variables set in Railway
- [ ] Frontend updated with Railway backend URL
- [ ] Test all functionality (diary entries, chat, visual novel)
- [ ] Verify WebSocket connections work
