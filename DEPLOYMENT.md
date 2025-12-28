# Deployment Guide

This guide covers how to deploy your aesthetic card gift to GitHub Pages or other free hosting platforms.

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
cd /home/ubuntu/aesthetic-card-gift
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

### Step 3: Build the Project

```bash
pnpm install
pnpm build
```

This creates a `dist/public/` folder with your built website.

### Step 4: Deploy to GitHub Pages

#### Option A: Using GitHub Pages Settings (Recommended for Beginners)

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select "main"
   - Folder: Select "/docs"
5. Click "Save"

Now you need to copy your built files to a `docs` folder:

```bash
# From your project root
mkdir -p docs
cp -r dist/public/* docs/
git add docs/
git commit -m "Deploy to GitHub Pages"
git push
```

Your site will be live at: `https://YOUR_USERNAME.github.io/aesthetic-card-gift`

#### Option B: Using a Custom Domain

If you have a custom domain:

1. Follow Option A steps 1-4
2. In GitHub Pages settings, add your custom domain
3. Follow your domain registrar's instructions to point DNS to GitHub Pages

#### Option C: Using GitHub Actions (Advanced)

Create a `.github/workflows/deploy.yml` file:

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
      - run: pnpm build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/public
```

This automatically builds and deploys whenever you push to main.

---

## Alternative Hosting Options

### Netlify (Free)

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Build command: `pnpm build`
6. Publish directory: `dist/public`
7. Click "Deploy"

Your site will be live at a Netlify subdomain (you can add a custom domain).

### Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects the build settings
6. Click "Deploy"

Your site will be live immediately.

### Firebase Hosting (Free)

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
pnpm build
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
- [ ] All images load correctly
- [ ] Text is readable on all screen sizes
- [ ] No console errors (open DevTools: F12)

### Testing the Countdown

To test the countdown without waiting until December 31:

1. Edit `client/src/pages/CountdownPage.tsx`
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
# Then:
pnpm build
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

### Images not loading after deployment

**Problem:** Images show as broken on the deployed site.

**Solution:** Ensure all image paths in your code start with `/images/` (absolute path from root). Check that images are in `client/public/images/`.

### Countdown shows wrong time

**Problem:** The countdown doesn't match your timezone.

**Solution:** The countdown is set to Mexico City time (UTC-6). If you need a different timezone, edit `CountdownPage.tsx` and adjust the `mexicoCityOffset` calculation.

### Bypass codes not working

**Problem:** Entering bypass codes doesn't unlock the card.

**Solution:** 
- Make sure you're triple-clicking the wax seal (not single or double-click)
- Try entering codes in lowercase: `bee`, `iris`, `dance`
- Check that you haven't modified the bypass code logic in `CountdownPage.tsx`

### Build fails with "Cannot find module"

**Problem:** Build fails with module not found error.

**Solution:** 
```bash
pnpm install
pnpm build
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

**Solution:** This is normal for the first deployment. Subsequent deployments are faster. If it takes more than 10 minutes, check:
- GitHub Actions logs (if using GitHub Actions)
- Netlify/Vercel build logs
- Check for any build errors

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
3. **Deploy** - Follow the deployment steps above
4. **Share** - Send the link to your special person!

---

## Need Help?

For more information about customizing your card, see `CARD_CUSTOMIZATION.md`.

For design details, see the main `README.md`.
