# Card Customization Guide

This guide explains how to customize the card content, manage pages, and deploy your gift card.

## Quick Start: Editing Card Content

All card content is stored in `client/src/card-data.ts`. This is the **only file you need to edit** to customize your card.

### Card Data Structure

Each card page has the following properties:

```typescript
{
  id: string;              // Unique identifier (e.g., 'page1', 'closing')
  title?: string;          // Optional title displayed at the top
  content: string;         // Main text content
  image?: string;          // Optional image path (e.g., '/images/bee-watercolor.png')
  backgroundColor?: string; // Optional Tailwind color class (e.g., 'bg-yellow-50')
}
```

### Example: Adding a New Page

Open `client/src/card-data.ts` and add a new object to the `cardData` array:

```typescript
{
  id: 'page-memories',
  title: 'Our Memories',
  content: 'From the first time we met to now, every moment with you has been special. These memories are the greatest gift.',
  backgroundColor: 'bg-rose-50',
}
```

### Example: Editing Existing Content

Find the page you want to edit in the `cardData` array and modify the `content` field:

```typescript
{
  id: 'page1',
  title: 'Like a Bee',
  content: 'Your new message here...',
  image: '/images/bee-watercolor.png',
  backgroundColor: 'bg-yellow-50',
}
```

### Example: Removing a Page

Simply delete the entire object from the `cardData` array. For example, to remove the "Dancer" page:

```typescript
// Remove this entire block:
{
  id: 'page3',
  title: 'Like a Dancer',
  content: "You move through life with rhythm and joy...",
  backgroundColor: 'bg-pink-50',
}
```

## Using Images

The following images are already generated and available:

- `/images/bee-watercolor.png` - Watercolor bee illustration
- `/images/iris-botanical.png` - Vintage iris botanical print
- `/images/antique-wax-seal.png` - Red wax seal with bee motif
- `/images/vintage-letter-texture.png` - Aged paper texture (used as background)
- `/images/botanical-border.png` - Decorative floral border

To use an image on a page, set the `image` property:

```typescript
{
  id: 'page1',
  title: 'Like a Bee',
  content: 'Your message...',
  image: '/images/bee-watercolor.png',
}
```

## Customizing Colors

Each card page can have a different background color. Use any Tailwind color class:

- `bg-amber-50` - Soft cream (default)
- `bg-yellow-50` - Light yellow
- `bg-purple-50` - Soft purple
- `bg-pink-50` - Light pink
- `bg-blue-50` - Soft blue
- `bg-green-50` - Soft green
- `bg-rose-50` - Light rose

Example:

```typescript
{
  id: 'page-special',
  title: 'A Special Moment',
  content: 'Your message...',
  backgroundColor: 'bg-rose-50',
}
```

## Countdown and Unlock Settings

The card is set to unlock at **11:00 PM, December 31, 2025 (Mexico City Time)**.

### To Change the Unlock Time

Edit `client/src/pages/CountdownPage.tsx`:

Find this line:
```typescript
const targetDate = new Date('2025-12-31T23:00:00').getTime();
```

Change the date/time to your desired unlock moment. Format: `YYYY-MM-DDTHH:MM:SS`

### Bypass Codes

Users can bypass the countdown by triple-clicking the wax seal and entering one of these codes:
- `bee`
- `iris`
- `dance`

To add more bypass codes, edit `client/src/pages/CountdownPage.tsx` and modify the condition:

```typescript
if (
  bypassCode.toLowerCase() === 'bee' ||
  bypassCode.toLowerCase() === 'iris' ||
  bypassCode.toLowerCase() === 'dance' ||
  bypassCode.toLowerCase() === 'your-new-code'  // Add here
) {
```

## Deployment to GitHub Pages

### Prerequisites

1. A GitHub account
2. Git installed on your computer
3. Node.js and pnpm installed

### Step-by-Step Deployment

1. **Create a GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Name it `aesthetic-card-gift` (or any name you prefer)
   - Do NOT initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Initialize Git in Your Project**

   ```bash
   cd /home/ubuntu/aesthetic-card-gift
   git init
   git add .
   git commit -m "Initial commit: aesthetic card gift"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aesthetic-card-gift.git
   git push -u origin main
   ```

3. **Build the Project**

   ```bash
   pnpm install
   pnpm build
   ```

4. **Deploy to GitHub Pages**

   The static build is in `dist/public/`. You can deploy this folder to GitHub Pages:

   **Option A: Using GitHub Pages Settings (Recommended)**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /docs
   - Copy the `dist/public` folder contents to a `docs` folder in your repo
   - Push to GitHub
   - Your site will be live at `https://YOUR_USERNAME.github.io/aesthetic-card-gift`

   **Option B: Using GitHub Actions**
   - Create `.github/workflows/deploy.yml` in your repo with deployment automation
   - This is more advanced but fully automates the build and deploy process

5. **Update Your Site**

   After making changes:
   ```bash
   pnpm build
   # Copy dist/public contents to docs folder
   git add .
   git commit -m "Update card content"
   git push
   ```

## Mobile Optimization

The card is fully optimized for mobile devices:

- **Responsive layout** - Adapts to all screen sizes
- **Touch gestures** - Swipe left/right to turn pages
- **Optimized typography** - Readable on small screens
- **Touch-friendly buttons** - Large, easy-to-tap controls

## Troubleshooting

### Card won't display

Make sure all image paths in `card-data.ts` are correct and the images exist in `client/public/images/`.

### Countdown not working

Check that the target date in `CountdownPage.tsx` is formatted correctly: `YYYY-MM-DDTHH:MM:SS`

### Bypass code not working

Make sure you're entering the code in lowercase. The code check is case-insensitive, but try:
- `bee`
- `iris`
- `dance`

### Images not loading after deployment

Ensure all image paths start with `/images/` (absolute path from root).

## Design Philosophy

This card follows the **Botanical Reverie** design philosophy:

- **Romantic naturalism** with organic, flowing forms
- **Pastel yellow palette** creating warmth and approachability
- **Antique aesthetic** suggesting timelessness and care
- **Handcrafted quality** with subtle imperfections
- **Botanical elements** (bees, flowers, iris) woven throughout

When customizing, try to maintain this aesthetic by:
- Using the provided color palette
- Keeping text warm and personal
- Using the botanical imagery thoughtfully
- Maintaining the elegant, unhurried pacing

## Need Help?

For more information about the design and features, see the main README.md file.
