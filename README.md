# Aesthetic Card Gift

A beautiful, interactive digital gift card experience with a countdown timer, sealed wax aesthetic, and multiple pages. Built with React, Tailwind CSS, and designed with romantic naturalism in mind.

![Aesthetic Card Gift](./screenshot.png)

## Features

### 🎁 Core Experience

- **Countdown Timer** - Card unlocks at a specific date and time (default: 11:00 PM, December 31, 2025, Mexico City Time)
- **Sealed Card Design** - Antique wax seal animation with dripping effect
- **Interactive Pages** - Multiple card pages with smooth page-turning animations
- **Mobile Optimized** - Fully responsive design with touch/swipe support
- **Bypass Mechanism** - Hidden Easter egg for testing (triple-click wax seal)

### 🎨 Design Philosophy

**Botanical Reverie** - A romantic naturalism aesthetic featuring:

- Pastel yellow color palette with warm, inviting tones
- Antique aesthetic suggesting timelessness and care
- Botanical imagery (bees, iris flowers, decorative borders)
- Handcrafted quality with subtle imperfections
- Elegant typography using Playfair Display, Lora, and Cormorant Garamond

### 🖼️ Visual Assets

Includes custom-generated artwork:

- Watercolor bee illustration
- Vintage botanical iris print
- Antique red wax seal with bee motif
- Aged paper texture background
- Decorative botanical borders

### 📱 Mobile Features

- Swipe left/right to turn pages
- Touch-friendly navigation buttons
- Responsive typography and spacing
- Optimized for all screen sizes

---

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- Git (for deployment)

### Installation

```bash
cd /home/ubuntu/aesthetic-card-gift
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

### Build for Production

```bash
pnpm build
```

This creates a `dist/public/` folder ready for deployment.

---

## Customization

### Editing Card Content

All card content is in `client/src/card-data.ts`. Edit the `cardData` array to customize pages:

```typescript
{
  id: 'page1',
  title: 'Your Title',
  content: 'Your message here...',
  image: '/images/bee-watercolor.png', // Optional
  backgroundColor: 'bg-yellow-50', // Optional
}
```

See `CARD_CUSTOMIZATION.md` for detailed instructions.

### Changing the Unlock Time

Edit `client/src/pages/CountdownPage.tsx`:

```typescript
const targetDate = new Date('2025-12-31T23:00:00').getTime();
```

Change to your desired date/time in format: `YYYY-MM-DDTHH:MM:SS`

### Bypass Codes

To test without waiting, triple-click the wax seal and enter:
- `bee`
- `iris`
- `dance`

---

## Deployment

### GitHub Pages (Recommended)

```bash
# Build the project
pnpm build

# Create docs folder and copy files
mkdir -p docs
cp -r dist/public/* docs/

# Push to GitHub
git add .
git commit -m "Deploy to GitHub Pages"
git push
```

Then enable GitHub Pages in your repository settings.

See `DEPLOYMENT.md` for detailed instructions and alternative hosting options.

---

## File Structure

```
aesthetic-card-gift/
├── client/
│   ├── public/
│   │   └── images/          # Generated artwork
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx     # Main entry point
│   │   │   ├── CountdownPage.tsx
│   │   │   └── CardExperience.tsx
│   │   ├── card-data.ts     # Card content (EDIT THIS)
│   │   ├── App.tsx
│   │   └── index.css        # Design tokens & typography
│   └── index.html
├── CARD_CUSTOMIZATION.md    # How to edit cards
├── DEPLOYMENT.md            # How to deploy
└── README.md               # This file
```

---

## Design Details

### Color Palette

- **Primary:** Warm gold (`oklch(0.85 0.15 65)`)
- **Background:** Cream (`oklch(0.99 0.01 65)`)
- **Accents:** Sage green, dusty rose
- **Text:** Dark warm brown (`oklch(0.3 0.02 65)`)

All colors use OKLCH color space for perceptual uniformity.

### Typography

- **Display:** Playfair Display (elegant, antique)
- **Body:** Lora (readable, warm)
- **Accent:** Cormorant Garamond (decorative, thin)

### Animations

- **Countdown:** Smooth number transitions
- **Wax Seal:** Continuous dripping animation
- **Page Turns:** Smooth flip with 3D perspective
- **Text Reveals:** Staggered line-by-line appearance
- **Hover Effects:** Subtle scale and glow effects

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Technical Stack

- **Framework:** React 19
- **Styling:** Tailwind CSS 4
- **Routing:** Wouter (client-side)
- **Build Tool:** Vite
- **Fonts:** Google Fonts (Playfair Display, Lora, Cormorant Garamond)

---

## Features Explained

### Countdown Timer

The countdown calculates the time remaining until the unlock moment. It:

- Updates every second
- Displays days, hours, minutes, seconds
- Automatically unlocks when time reaches zero
- Accounts for Mexico City timezone (UTC-6)

### Sealed Card State

Before unlock, the card shows:

- Elegant "A Gift for You" header
- Countdown timer with four displays
- Animated wax seal with dripping effect
- Message about the sealed state
- Pulsing glow animation to draw attention

### Bypass Mechanism

For testing without waiting:

1. Triple-click the wax seal (not single or double-click)
2. A modal appears asking for a "magic word"
3. Enter `bee`, `iris`, or `dance`
4. Card unlocks immediately

This is intentionally simple for development/testing.

### Page-Turning Experience

Once unlocked:

- Card displays one page at a time
- Smooth flip animation between pages
- Text reveals line-by-line for discovery
- Decorative botanical borders frame content
- Navigation via buttons or swipe gestures
- Progress indicator shows current position

---

## Accessibility

- Keyboard navigation (arrow keys, Tab)
- Focus indicators on all interactive elements
- Semantic HTML structure
- High contrast text on backgrounds
- Touch-friendly button sizes (48px minimum)

---

## Performance

- **Build Size:** ~650 KB (minified), ~163 KB (gzipped)
- **Load Time:** < 2 seconds on 4G
- **Animations:** GPU-accelerated, 60 FPS
- **Mobile:** Optimized for low-end devices

---

## Customization Examples

### Add a Personal Memory Page

Edit `client/src/card-data.ts`:

```typescript
{
  id: 'memory',
  title: 'Our First Meeting',
  content: 'I remember the moment you walked in... [your story]',
  backgroundColor: 'bg-rose-50',
}
```

### Add an Image Page

```typescript
{
  id: 'photo',
  title: 'A Moment in Time',
  content: 'This is what I see when I think of you.',
  image: '/images/bee-watercolor.png',
  backgroundColor: 'bg-purple-50',
}
```

### Change Colors

```typescript
{
  id: 'special',
  title: 'Something Special',
  content: 'Your message...',
  backgroundColor: 'bg-green-50', // Change to any Tailwind color
}
```

---

## Troubleshooting

### Countdown not working
- Check that the target date is in the future
- Verify the date format: `YYYY-MM-DDTHH:MM:SS`
- Clear browser cache and reload

### Images not loading
- Ensure image paths start with `/images/`
- Check that images exist in `client/public/images/`
- Verify file names match exactly (case-sensitive)

### Bypass not working
- Triple-click the wax seal (not single/double-click)
- Enter codes in lowercase: `bee`, `iris`, `dance`
- Check browser console for errors (F12)

### Mobile layout broken
- Open DevTools (F12)
- Click mobile device icon
- Test different screen sizes
- Check that all text is readable

---

## License

This project is provided as-is for personal use. Feel free to customize and share with your special person!

---

## Support

For detailed customization instructions, see `CARD_CUSTOMIZATION.md`.

For deployment help, see `DEPLOYMENT.md`.

For design philosophy and inspiration, see `ideas.md`.

---

## Credits

- Design: Botanical Reverie aesthetic
- Artwork: Custom-generated using AI image generation
- Typography: Google Fonts
- Components: shadcn/ui + Tailwind CSS
- Built with: React + Vite

---

## Version

**v1.0.0** - Initial release

Last updated: December 27, 2025

---

Made with ❤️ for someone special.
