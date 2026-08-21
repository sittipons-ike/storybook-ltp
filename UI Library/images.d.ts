/**
 * Image imports resolve to URLs.
 *
 * Page artwork is imported rather than served from a static directory, so a missing file
 * is a build error instead of a broken image at runtime, and a page's assets travel with
 * the page when it moves. Vite already does the resolving; TypeScript needs telling.
 */
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
