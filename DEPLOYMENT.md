# Deployment Guide: Aesthetic Card Gift

This guide covers how to deploy your aesthetic card gift website to GitHub Pages or other free hosting platforms.

## Table of Contents

1. [GitHub Pages Deployment](#github-pages-deployment)
2. [Alternative Hosting Options](#alternative-hosting-options)
3. [Testing Before Deployment](#testing-before-deployment)
4. [Troubleshooting](#troubleshooting)

---

## GitHub Pages Deployment

GitHub Pages is a free hosting service that works perfectly for this static website.

### Prerequisites

- GitHub account (free)
- Git installed on your computer
- Basic command-line knowledge

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository: `aesthetic-card-gift` (or any name you prefer)
3. **Important:** Do NOT initialize with README, .gitignore, or license
4. Click "Create repository"
5. Copy the repository URL (you'll need it in the next step)

### Step 2: Initialize Git and Push Your Code

Open your terminal and navigate to your project directory:

```bash
cd /path/to/aesthetic-card-gift
```

Initialize Git and push your code:

```bash
git init
git add .
git commit -m "Initial commit: aesthetic card gift"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aesthetic-card-gift.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Build the Project for GitHub Pages

The key to making this work on GitHub Pages is setting the `GITHUB_PAGES` environment variable during the build. This configures the correct base path for your subdirectory deployment.

```bash
# Install dependencies
pnpm install

# Build with GitHub Pages configuration
GITHUB_PAGES=true pnpm build
```

**On Windows (PowerShell):**
```powershell
$env:GITHUB_PAGES='true'
pnpm build
```

**On Windows (Command Prompt):**
```cmd
set GITHUB_PAGES=true
pnpm build
```

This creates a `dist/public/` folder with your built website, with all asset paths correctly configured for subdirectory deployment.

### Step 4: Deploy to GitHub Pages

#### Option A: Using GitHub Pages Settings (Recommended)

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select "main"
   - Folder: Select "/docs"
5. Click "Save"

Now copy your built files to a `docs` folder:

```bash
# From your project root
mkdir -p docs
cp -r dist/public/* docs/
git add docs/
git commit -m "Deploy to GitHub Pages"
git push
```

Your site will be live at: `https://YOUR_USERNAME.github.io/aesthetic-card-gift`

**Important:** The `GITHUB_PAGES=true` build step is crucial! Without it, assets won't load correctly on GitHub Pages.

#### Option B: Using a Custom Domain

If you have a custom domain:

1. Follow Option A steps 1-5
2. In GitHub Pages settings, add your custom domain
3. Follow your domain registrar's instructions to point DNS to GitHub Pages
4. GitHub will automatically create a CNAME file

#### Option C: Using GitHub Actions (Advanced)

For automatic deployments, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: GITHUB_PAGES=true pnpm build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

This automatically builds and deploys whenever you push to main, with the correct GitHub Pages configuration.

---

## Alternative Hosting Options

### Netlify (Free)

Netlify is a great alternative with automatic deployments.

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - **Build command:** `GITHUB_PAGES=true pnpm build`
   - **Publish directory:** `dist/public`
6. Click "Deploy"

Your site will be live at a Netlify subdomain.

### Vercel (Free)

Vercel is optimized for React and Vite projects.

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   - **Build Command:** `GITHUB_PAGES=true pnpm build`
   - **Output Directory:** `dist/public`
6. Click "Deploy"

Your site will be live immediately.

### Firebase Hosting (Free)

Firebase offers free static hosting with global CDN.

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Go to [firebase.google.com](https://firebase.google.com)
3. Create a new project
4. Run `firebase init hosting`
5. Select your project
6. Public directory: `dist/public`
7. Run `firebase deploy`

---

## Testing Before Deployment

### Local Testing

Before deploying, test your site locally:

```bash
# Development server (with hot reload)
pnpm dev

# Production build preview
GITHUB_PAGES=true pnpm build
pnpm preview
```

Open `http://localhost:3000` in your browser.

### Test Checklist

- [ ] Countdown displays correctly
- [ ] Wax seal animation works smoothly
- [ ] Triple-click on wax seal reveals bypass input
- [ ] Bypass codes work (`bee`, `iris`, `dance`)
- [ ] Card pages turn smoothly
- [ ] Navigation buttons work (previous/next)
- [ ] Page indicators work
- [ ] Swipe gestures work on mobile
- [ ] **All images load correctly** (this is critical for GitHub Pages!)
- [ ] Text is readable on all screen sizes
- [ ] No console errors (open DevTools: F12)
- [ ] Close button works and reseals the card
- [ ] Triple-click on card resets countdown

### Testing the Countdown

To test the countdown without waiting until December 31:

1. Edit `client/src/pages/Home.tsx`
2. Change the target date to a time in the near future:
   ```typescript
   const targetDate = new Date('2025-01-05T15:30:00').getTime();
   ```
3. Save and refresh your browser
4. The countdown should update

Remember to change it back before deploying!

### Testing the Bypass

1. Triple-click on the wax seal
2. Enter `bee`, `iris`, or `dance`
3. The card should unlock

---

## Updating Your Site After Deployment

### If Using GitHub Pages

After making changes:

```bash
# Make your changes to card-data.ts or other files
# Then rebuild with GitHub Pages configuration:
GITHUB_PAGES=true pnpm build
cp -r dist/public/* docs/
git add .
git commit -m "Update card content"
git push
```

Your site will update within a few minutes.

### If Using Netlify or Vercel

Simply push to GitHub and the site auto-deploys:

```bash
git add .
git commit -m "Update card content"
git push
```

---

## Troubleshooting

### Images not loading after deployment (404 errors)

**Problem:** Images show as broken on the deployed site, or console shows 404 errors for image files.

**Solution:** This is the most common issue! Make sure you:

1. **Built with the correct environment variable:**
   ```bash
   GITHUB_PAGES=true pnpm build
   ```
   Without this, asset paths won't be configured correctly for subdirectory deployment.

2. **Deployed the correct folder:**
   - For GitHub Pages: Copy `dist/public/*` to the `docs/` folder
   - For Netlify/Vercel: Set publish directory to `dist/public`

3. **All images are in the correct location:**
   - Check that images are in `client/public/images/`
   - Verify filenames match exactly (case-sensitive on Linux/Mac)

4. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open DevTools (F12) → Application → Clear Storage → Clear All

### Countdown shows wrong time

**Problem:** The countdown doesn't match your timezone.

**Solution:** The countdown is set to Mexico City time (UTC-6). If you need a different timezone:

1. Edit `client/src/pages/Home.tsx`
2. Find the line with `mexicoCityOffset = -6 * 60 * 60 * 1000`
3. Change `-6` to your timezone offset (e.g., `-5` for EST, `-8` for PST)
4. Rebuild and redeploy

### Bypass codes not working

**Problem:** Entering bypass codes doesn't unlock the card.

**Solution:** 
- Make sure you're triple-clicking the wax seal (not single or double-click)
- Try entering codes in lowercase: `bee`, `iris`, `dance`
- Check browser console (F12) for any JavaScript errors

### Build fails with "Cannot find module"

**Problem:** Build fails with module not found error.

**Solution:** 
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
GITHUB_PAGES=true pnpm build
```

### Site looks different on mobile

**Problem:** Layout breaks on small screens.

**Solution:** The site is designed to be mobile-responsive. If you see issues:
1. Open DevTools (F12)
2. Click the mobile device icon
3. Test different screen sizes
4. Check that all elements are readable

### Deployment takes too long

**Problem:** GitHub Pages or Netlify deployment is slow.

**Solution:** This is normal for the first deployment. Subsequent deployments are faster. If it takes more than 10 minutes:
- Check GitHub Actions logs (if using GitHub Actions)
- Check Netlify/Vercel build logs
- Look for any build errors in the logs

### "Cannot find base path" or similar error

**Problem:** You see errors about base paths or assets.

**Solution:** This happens when the `GITHUB_PAGES=true` build step was skipped. Rebuild with:
```bash
GITHUB_PAGES=true pnpm build
```

---

## Security & Privacy

This is a static website with no backend or database, so:

- ✅ No user data is collected
- ✅ No tracking (unless you add analytics)
- ✅ No passwords or sensitive information
- ✅ Safe to share the link with anyone

The countdown and bypass mechanism are all client-side (in the browser), so they cannot be "hacked" in a traditional sense. The bypass codes are intentionally simple for testing purposes.

---

## Next Steps

1. **Customize your card** - Edit `client/src/card-data.ts` to personalize the content
2. **Test locally** - Run `pnpm dev` and verify everything works
3. **Build for deployment** - Run `GITHUB_PAGES=true pnpm build`
4. **Deploy** - Follow the deployment steps above
5. **Share** - Send the link to your special person!

---

## Need Help?

For more information about customizing your card, see `CARD_CUSTOMIZATION.md`.

For design details, see the main `README.md`.

**Key Takeaway:** Always remember to build with `GITHUB_PAGES=true` before deploying to GitHub Pages. This is what makes all the assets load correctly!
