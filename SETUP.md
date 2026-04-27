# 🚀 Quick Setup Guide

## Step 1: Change Admin Password
1. Open `admin.js`
2. Line 4: Change `const ADMIN_PASSWORD = "admin123";`
3. Set your own secure password
4. Save the file

## Step 2: Test Locally
1. Open `index.html` in browser
2. Press **Ctrl+Shift+A** to test admin access
3. Edit content in admin panel
4. Go to Settings → Download Content JSON

## Step 3: Deploy to GitHub
```bash
git init
git add .
git commit -m "Portfolio ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

## Step 4: Enable GitHub Pages
1. Go to GitHub repository
2. Settings → Pages
3. Source: Deploy from branch → main → root
4. Save

## Step 5: Update Content
1. Edit locally in admin panel
2. Export content.json
3. Upload to GitHub
4. Wait 1-2 minutes

---

## 🔑 Admin Access
- **URL:** yourdomain.com/admin.html
- **Shortcut:** Ctrl+Shift+A (any page)
- **Password:** (the one you set in admin.js)

## 📁 Files to Remember
- `content.json` - Your portfolio content (upload to GitHub)
- `admin.js` - Contains password (change before deploying!)
- `admin.html` - Admin panel (password protected)

---

**That's it! Your portfolio is live! 🎉**
