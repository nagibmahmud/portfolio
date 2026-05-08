# My Portfolio Website

A modern, responsive portfolio website with a dynamic admin panel for managing content.

## 🚀 Features

- **Modern Design** - Beautiful gradient UI with neon glow effects
- **Fully Responsive** - Works on all devices
- **Dynamic Content** - Manage all content from admin panel
- **Export/Import** - Download/upload content as JSON
- **GitHub Pages Ready** - Easy deployment to GitHub Pages

## 📁 File Structure

```
portfolio/
├── index.html          # Homepage
├── projects.html       # Projects & Websites pages
├── about.html          # About & Skills sections
├── contact.html        # Contact form
├── admin.html          # Admin dashboard
├── content.json        # Content file for GitHub Pages
├── styles.css          # Main website styles
├── admin-styles.css    # Admin panel styles
├── script.js           # Main website JavaScript
└── admin.js            # Admin panel JavaScript
```

## 🔒 Security & Admin Access

**Admin panel is now HIDDEN and PASSWORD PROTECTED!**

### How to Access Admin Panel:

**Method 1: Direct URL**
- Navigate to: `yourdomain.com/admin.html`
- Enter password (default: `admin123`)

**Method 2: Keyboard Shortcut**
- Press **Ctrl + Shift + A** on any page
- Opens admin panel directly

### ⚠️ IMPORTANT: Change Password!

**Before deploying to GitHub:**

1. Open `admin.js`
2. Find line 4: `const ADMIN_PASSWORD = "admin123";`
3. Change to your password: `const ADMIN_PASSWORD = "YourSecretPassword";`
4. Save and commit!

**Note:** This is client-side protection (not server-level). For complete security, use a backend authentication system.

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser
3. Access admin panel at `admin.html`

### Deploy to GitHub Pages (3 Steps!)

```bash
# 1. Initialize git and commit
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to: Repository Settings → Pages
# Source: Deploy from branch → main → root
# Click Save
```

Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio/`

---

## 📝 How to Update Content on GitHub Pages

### Method 1: Export/Import (Recommended)

**Step 1: Edit Locally**
1. Open `admin.html` in your browser (locally)
2. Edit all sections (Hero, Projects, About, Skills, Contact)
3. Go to **Settings** tab
4. Click **"Download Content JSON"**
5. Save the file as `content.json`

**Step 2: Upload to GitHub**
1. Go to your GitHub repository
2. Click "Upload files" or use GitHub Desktop
3. Upload the `content.json` file
4. Commit the changes

**Step 3: Wait for Update**
- GitHub Pages will update in 1-2 minutes
- Your website will automatically load the new content!

### Method 2: Direct JSON Edit

1. Edit `content.json` directly on GitHub
2. Commit changes
3. Wait 1-2 minutes for GitHub Pages to update

---

## 🎨 Customization

### Edit Content via Admin Panel

Open `admin.html` to manage:

| Section | What You Can Edit |
|---------|-------------------|
| **Hero** | Title words, subtitle, button texts & links |
| **Projects** | Add/Edit/Delete projects with images, links, tags |
| **Websites** | Add/Edit/Delete websites |
| **About** | Text paragraphs, image, stats (projects, experience, etc.) |
| **Skills** | Add/Edit/Delete skill categories |
| **Contact** | Email, social media links |
| **Settings** | Export/Import content JSON |

### Edit Colors

Modify CSS variables in `styles.css`:

```css
:root {
    --bg-color: #0f172a;          /* Background */
    --accent-color: #22d3ee;      /* Cyan accent */
    --accent-2: #a78bfa;          /* Purple accent */
    --accent-3: #f472b6;          /* Pink accent */
}
```

---

## ⚠️ Important Notes

### How Content Works

- **Local Development**: Content saved in browser's localStorage
- **GitHub Pages**: Content loaded from `content.json` file
- **Export/Import**: Transfer content between local and GitHub

### Contact Form

Messages are saved to localStorage. To receive real emails:

1. Use [Formspree](https://formspree.io/) (free)
2. Replace form action in `contact.html`:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Default Content

Default content is in `content.json`. Edit this file to change what visitors see on GitHub Pages.

---

## 🔧 Troubleshooting

### Content Not Updating?

1. Clear browser cache (Ctrl+Shift+R)
2. Check if `content.json` was committed to GitHub
3. Wait 1-2 minutes for GitHub Pages to refresh

### Admin Panel Not Working?

1. Make sure you're opening `admin.html` from the same domain
2. Check browser console for errors (F12)
3. Ensure all JavaScript files are loaded

### Local Changes Not on GitHub?

1. Export content from admin panel
2. Upload `content.json` to GitHub
3. Commit the changes

---

## 📫 Support

Found a bug or need help? Open an issue on GitHub!

## 📄 License

MIT License - Free to use for personal and commercial projects!

---

Made with ❤️ - Ready to deploy in minutes!
