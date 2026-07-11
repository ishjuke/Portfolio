// Reuse the Open Graph image as the Twitter/X card image.
// Next.js picks this up automatically from app/twitter-image.tsx.
export const runtime = "edge";
export { default, alt, size, contentType } from "./opengraph-image";