# Aesthetic Card Gift 🎁

A beautiful, interactive digital gift card experience with countdown timer, sealed wax aesthetic, and multi-page card interaction. Built with React, Tailwind CSS, and optimized for mobile devices.

## ✨ Features

- **Countdown Timer** - Displays days, hours, minutes, and seconds until December 31, 2025 at 11:00 PM (Mexico City time)
- **Sealed Wax Card** - Animated wax seal with dripping effect during countdown
- **Interactive Card** - Multi-page experience with smooth page-turning animations
- **Bypass Mechanism** - Hidden but discoverable unlock codes (`bee`, `iris`, `dance`)
- **Mobile Optimized** - Full touch support with swipe gestures for page navigation
- **Botanical Aesthetic** - Warm pastel yellows with antique design elements
- **Customizable Content** - Easy-to-edit card pages with custom backgrounds
- **Responsive Design** - Works beautifully on phones, tablets, and desktops

## 🎨 Design Philosophy

**Botanical Reverie** - A romantic naturalism aesthetic featuring:
- Warm pastel yellow color palette
- Antique letter and wax seal imagery
- Organic, flowing layouts
- Handcrafted typography (Playfair Display, Lora, Cormorant Garamond)
- Subtle animations and transitions
- Botanical decorative elements (bees, iris flowers)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm (or npm)
- Git

### Installation

```bash
# Clone the repository (or download the files)
git clone https://github.com/YOUR_USERNAME/aesthetic-card-gift.git
cd aesthetic-card-gift

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` in your browser.

### Customizing the Card

Edit `client/src/card-data.ts` to personalize the card content:

```typescript
export const cardData: CardPage[] = [
  {
    id: 'cover',
    title: 'Your Title Here',
    content: 'Your message here',
    backgroundColor: 'bg-amber-50',
  },
  // Add more pages...
];
```

Each page supports:
- `title` - Page heading (optional)
- `content` - Main text
- `image` - Path to image (optional, e.g., `/images/bee-watercolor.png`)
- `backgroundColor` - Tailwind color class (e.g., `bg-pink-50`, `bg-blue-50`)

## 🚀 Deploying to GitHub Pages

**CRITICAL: Always build with the `GITHUB_PAGES=true` environment variable!** This ensures all assets load correctly on GitHub Pages.

```bash
# Step 1: Build for GitHub Pages
GITHUB_PAGES=true pnpm build

# Step 2: Copy to docs folder
mkdir -p docs
cp -r dist/public/* docs/

# Step 3: Commit and push
git add docs/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Then enable GitHub Pages in your repository settings:
1. Go to Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main"
4. Folder: "/docs"
5. Click Save

Your site will be live at: `https://YOUR_USERNAME.github.io/aesthetic-card-gift`

**⚠️ Important:** If images don't load after deployment, make sure you:
1. Built with `GITHUB_PAGES=true`
2. Copied files to the `docs/` folder
3. Enabled GitHub Pages in settings

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and alternatives (Netlify, Vercel, Firebase).**

## 📝 Customization Guide

### Changing the Countdown Date/Time

Edit `client/src/pages/Home.tsx`:

```typescript
const targetDate = new Date('2025-12-31T23:00:00').getTime();
```

Change the date/time as needed. The timezone is set to Mexico City (UTC-6).

### Changing Bypass Codes

Edit `client/src/pages/CountdownPage.tsx`:

```typescript
if (
  bypassCode.toLowerCase() === 'your-code-1' ||
  bypassCode.toLowerCase() === 'your-code-2' ||
  bypassCode.toLowerCase() === 'your-code-3'
) {
  setIsUnlocked(true);
  onUnlock();
}
```

### Adding Custom Images

1. Place images in `client/public/images/`
2. Reference them in `card-data.ts`:
   ```typescript
   image: '/images/your-image.png'
   ```

### Changing Colors

The site uses Tailwind CSS color classes. Common options:
- `bg-amber-50`, `bg-yellow-50` - Warm yellows
- `bg-pink-50`, `bg-purple-50` - Soft pastels
- `bg-blue-50`, `bg-green-50` - Cool tones

Edit the `backgroundColor` field in `card-data.ts`.

**See [CARD_CUSTOMIZATION.md](./CARD_CUSTOMIZATION.md) for detailed customization instructions.**

## 📱 User Interactions

### Before Countdown Ends

1. **View Countdown** - See days, hours, minutes, seconds until unlock
2. **Triple-Click Wax Seal** - Reveals bypass input
3. **Enter Bypass Code** - Use `bee`, `iris`, or `dance` to unlock early

### After Countdown Ends (or Bypass Used)

1. **Click "Open Card"** - Opens the sealed card
2. **Navigate Pages** - Use arrow buttons or swipe left/right on mobile
3. **View Progress** - Progress bar shows current page
4. **Close Card** - Click "✕ Close Card" button to reseal
5. **Triple-Click Card** - Resets countdown for testing

## 🛠️ Development

### Project Structure

```
aesthetic-card-gift/
├── client/
│   ├── public/
│   │   └── images/          # Your images go here
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Utility functions (includes asset path helper)
│   │   ├── card-data.ts     # Card content (EDIT THIS!)
│   │   ├── App.tsx          # Main app component
│   │   ├── index.css        # Global styles
│   │   └── main.tsx         # Entry point
│   └── index.html
├── vite.config.ts           # Vite configuration
├── package.json
├── DEPLOYMENT.md            # Deployment guide
├── CARD_CUSTOMIZATION.md    # Customization guide
└── README.md                # This file
```

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build locally
pnpm format     # Format code with Prettier
pnpm check      # Check TypeScript types
```

### Building for Different Platforms

```bash
# GitHub Pages (with subdirectory) - ALWAYS USE THIS FOR GITHUB PAGES
GITHUB_PAGES=true pnpm build

# Regular hosting (root domain)
pnpm build

# Netlify / Vercel
GITHUB_PAGES=true pnpm build
```

## 🎯 Key Technologies

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS
- **TypeScript** - Type safety
- **Wouter** - Client-side routing
- **shadcn/ui** - UI components

## 📦 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🔒 Privacy & Security

- ✅ Static website - no backend or database
- ✅ No user data collection
- ✅ No tracking (unless you add analytics)
- ✅ Safe to share the link publicly
- ✅ All logic runs in the browser

## 🐛 Troubleshooting

### Images not loading after deployment (404 errors)
This is the most common issue! Make sure you:
1. Built with `GITHUB_PAGES=true pnpm build`
2. Copied files to the `docs/` folder
3. Enabled GitHub Pages in repository settings
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

See [DEPLOYMENT.md](./DEPLOYMENT.md#images-not-loading-after-deployment-404-errors) for more details.

### Countdown shows wrong time
The countdown is set to Mexico City time (UTC-6). Adjust the timezone offset in `Home.tsx` if needed.

### Bypass codes not working
Triple-click the wax seal (not single/double-click) and enter codes in lowercase: `bee`, `iris`, `dance`.

### Build errors
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
GITHUB_PAGES=true pnpm build
```

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide for GitHub Pages, Netlify, Vercel, and Firebase
- **[CARD_CUSTOMIZATION.md](./CARD_CUSTOMIZATION.md)** - Detailed customization instructions
- **[ideas.md](./ideas.md)** - Design philosophy and aesthetic choices

## 🎁 Gift Customization Ideas

The card includes pages themed around:
- **Bee** - Kindness and sweetness
- **Iris** - Beauty and resilience
- **Dancer** - Joy and rhythm
- **Runner** - Determination and courage
- **Café** - Warmth and comfort

Customize each page to reflect your special person's unique qualities!

## 📄 License

This project is open source and available for personal use.

## 🙏 Credits

- **Design:** Botanical Reverie aesthetic
- **Typography:** Playfair Display, Lora, Cormorant Garamond
- **Imagery:** Custom-generated botanical illustrations
- **Framework:** React + Vite + Tailwind CSS

---

## 🚀 Next Steps

1. **Customize the card** - Edit `client/src/card-data.ts` with your personal messages
2. **Test locally** - Run `pnpm dev` and verify everything works
3. **Deploy** - Follow [DEPLOYMENT.md](./DEPLOYMENT.md) to publish your gift
   - **Remember:** Always build with `GITHUB_PAGES=true` for GitHub Pages!
4. **Share** - Send the link to your special person!

---

**Made with ❤️ for someone special**
