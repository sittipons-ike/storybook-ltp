/**
 * Vite injects `import.meta.env` at build time. `foundations/asset.ts` reads BASE_URL from
 * it to resolve static files against wherever the build is mounted, so TypeScript has to
 * know the shape — `vite/client` carries the full set, but declaring only what is used
 * keeps the dependency at a type reference rather than the whole client library.
 */
interface ImportMetaEnv {
  /** Where this build is mounted: `/` in dev, `--base` in CI. Always ends in a slash. */
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
