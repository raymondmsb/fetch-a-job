/**
 * Canonical site identity — single source of truth for the public URL.
 *
 * Imported by:
 *   - `site/astro.config.ts` (drives `Astro.site`, the base path, sitemap base, canonical URLs)
 *   - `site/playwright.config.ts` (e2e base path)
 *   - `site/scripts/*-live.ts` (probe / perf / qa default targets)
 *   - `site/src/layouts/BaseLayout.astro` (siteOrigin defensive fallback)
 *   - `site/src/components/Masthead.astro` (build-SHA commit link)
 *
 * Surfaces that can't read TypeScript at build time keep the hostname
 * inline AND cross-reference this file with a comment, so a domain
 * migration is a single search-and-update operation. Current list:
 *   - `site/public/robots.txt` (Sitemap URL)
 *   - `.github/workflows/build-deploy.yml` (PAGES_BASE env)
 *   - `.github/workflows/release.yml` (PAGES_BASE env)
 *
 * The README is a content surface (badges, try-it URLs, dev hints) and
 * is not considered a duplicate of this constant — it's authored prose
 * that happens to reference the URL, like any external doc would.
 *
 * If the domain moves again, update this file plus the three surfaces
 * listed above. The grep `git grep raymondmsb.github.io` is the audit.
 */
export const SITE_ORIGIN = "https://raymondmsb.github.io" as const;

/**
 * Bare hostname (no scheme, no trailing slash). Useful for tag-templates
 * that build a URL piecewise, or for the CNAME-style host-only context.
 */
export const SITE_HOST = "raymondmsb.github.io" as const;

/**
 * Path prefix the site is served under, no trailing slash. Non-empty
 * because the deployment is a GitHub Pages *project* site
 * (`<user>.github.io/<repo>`) rather than an apex domain. Drives Astro's
 * `base`, which in turn populates `import.meta.env.BASE_URL` for the
 * runtime data fetches (manifest + slim-index chunks) and the Service
 * Worker scope. Set to `""` if the site ever moves to a bare domain.
 */
export const SITE_BASE_PATH = "/fetch-a-job" as const;

/**
 * Full public URL root, origin + base path, no trailing slash. This is
 * what external callers (live probes, release asset fetches, sitemap
 * consumers) should target.
 */
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}` as const;

/**
 * Canonical source-of-truth for the public GitHub repository URL.
 * Linked from the masthead's build-SHA chip and the global footer
 * "SOURCE" link. Imported anywhere the repo URL surfaces so a future
 * rename / fork lives in this file alone.
 */
export const REPO_URL = "https://github.com/raymondmsb/fetch-a-job" as const;
