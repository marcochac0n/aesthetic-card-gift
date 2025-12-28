/**
 * Asset Path Utility
 * 
 * Handles asset paths correctly for both local development and GitHub Pages deployment.
 * When deployed to GitHub Pages with a subdirectory, the base path needs to be prepended.
 */

export function getAssetPath(path: string): string {
  // Get the base path from the Vite environment
  const base = import.meta.env.BASE_URL || '/';
  
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combine base with path
  return `${base}${cleanPath}`;
}
