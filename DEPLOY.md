# Deploy to Cloudflare Pages + Custom Domain

## ✅ Done (code ready)
- `wrangler.toml` — Workers/D1/KV config
- `worker.js` — Contact form API example
- `contact-form.html` — Drop-in form snippet

---

## 🔧 You do in dashboards (5 min)

### 1. Cloudflare Pages — Create Project
1. Go to https://dash.cloudflare.com → **Pages** → **Create a project** → **Connect to Git**
2. Select **GitHub** → Authorize → Pick `nagibmahmud/portfolio`
3. Build settings:
   - **Framework preset**: None
   - **Build command**: *(empty)*
   - **Build output directory**: `/`
   - **Root directory**: `/`
4. **Save and Deploy** → wait for build → you get `https://<project>.pages.dev`

### 2. Add Custom Domain
1. In your Pages project → **Custom domains** → **Set up a custom domain**
2. Enter: `nagib.online` → **Continue**
3. Cloudflare shows **2 DNS records** (copy them exactly):
   - Type: `CNAME` | Name: `www` | Target: `<project>.pages.dev` | Proxy: **On**
   - Type: `CNAME` | Name: `@` | Target: `<project>.pages.dev` | Proxy: **On**
   *(or A/AAAA records if shown instead)*

### 3. WordPress.com — Add DNS Records
1. Go to **WordPress.com → Domains → nagib.online → DNS Records**
2. **Delete existing A/CNAME records** for `@` and `www`
3. **Add the 2 records from Cloudflare** (exact values)
4. **Save** → wait 5–60 min for propagation

> **Better option**: In WordPress.com domain settings, switch **Nameservers** to Cloudflare's:
> - `ns1.cloudflare.com`
> - `ns2.cloudflare.com`
> Then manage all DNS in Cloudflare (free, instant, more control).

### 4. Verify
- Visit `https://nagib.online` → should show your portfolio
- Visit `https://www.nagib.online` → should redirect/work

---

## 🚀 Later: Enable Dynamic Features

### Contact Form (Workers)
1. In Pages project → **Functions** → **Create a function** → paste `worker.js` content
2. Deploy → API lives at `https://nagib.online/api/contact`
3. Add the form from `contact-form.html` to your `index.html`

### Database (D1)
1. Cloudflare dash → **D1** → **Create database** → `portfolio-db`
2. Run in D1 console:
   ```sql
   CREATE TABLE contacts (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );
   ```
3. Copy **Database ID** → paste into `wrangler.toml` → `database_id = "..."`
4. Redeploy Pages project

### KV / R2
- Similar: create in dash → copy IDs → update `wrangler.toml` → redeploy

---

## 📝 Files in your repo now
```
portfolio/
├── index.html          # Your site
├── styles.css
├── script.js
├── worker.js           # API endpoint (deploy as Pages Function)
├── wrangler.toml       # Config for D1/KV/R2
├── contact-form.html   # Form snippet to embed
└── ...other HTML files
```

---

## ✅ Next step for you
Run this, then do the 3 dashboard steps above:
```bash
cd C:\Users\nagib\Desktop\test\portfolio
git add .
git commit -m "Add Cloudflare Pages config + Worker example"
git push origin main
```

Then create the Pages project and add DNS. Let me know when DNS is added and I'll help verify.