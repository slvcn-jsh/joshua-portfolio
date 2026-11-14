# Release status

Owner authorization: public GitHub repository and Vercel deployment after QA,
explicitly confirmed on 2026-11-14.

- Local implementation: complete, including the Behind the interface interactions.
- GitHub: public repository at https://github.com/slvcn-jsh/joshua-portfolio, default branch `main`.
- Vercel: production deployment is READY in the owner's `joshua-salvacions-projects` scope.
- Public website: https://joshua-portfolio-phi-lemon.vercel.app (anonymous access verified).
- Production `SITE_URL`: persisted as a production-only Vercel Config variable using the public origin above. Production indexing and sitemap are enabled; preview builds remain noindex.
- Live checks: nine routes, canonical URLs, nine-entry sitemap, robots, all configured security headers, genuine 404 responses, immutable assets and the unchanged resume SHA-256 passed.
- Live browser checks: 18 page/viewport combinations (390 and 1440px), both walkthroughs, annotations, modal/Escape/focus, Barion challenge, mobile navigation and real PDF download passed with no browser/CSP errors.
- GitHub Actions: the initial quality workflow passed clean install, lint/build/static checks, SEO mode checks and dependency audit.
- Automatic GitHub-to-Vercel deployment: not established. Both CLI connection attempts failed; the owner was asked to connect the repository through the project's Git settings. Direct authenticated CLI deployment works and was used for this release.

Production deployment verified: `dpl_7hcFMmTvxXMRmVfJmJEAbDUoZFWU`.
Application implementation commit: `255409b`; subsequent release-documentation and QA scripts do not change the application UI.

## Updating the live site

Until the Git integration is confirmed, pushing to GitHub does **not** update Vercel automatically. After reviewing and passing `npm run check` and `npm run check:seo`, push the commit and run:

```sh
npx vercel deploy --prod --yes --scope joshua-salvacions-projects
node scripts/check-deployment.mjs https://joshua-portfolio-phi-lemon.vercel.app
```

The local `.vercel/` link and `.env.local` credential file are ignored by Git; `.vercelignore` excludes local environment files, browser artifacts and build caches from upload. Do not publish or copy their credentials.

No application repository was modified. No domains were purchased, and no account
plan or unrelated account settings were changed.
