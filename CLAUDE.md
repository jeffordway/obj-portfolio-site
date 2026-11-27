# jeffordway.com

Jeff Ordway's personal portfolio site. Jeff owns it personally (not a company).

## Working with Jeff

- Jeff is a beginner coder. Explain what you are doing in plain words, one step at a time.
- Lead with the answer and keep replies short. No em dashes.
- Say plainly what you tested and what you did not. Never report something as working unless you ran it.
- Ask before deleting files, changing hosting or environment settings, or pushing to `main`.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- Sanity for content (project pages, skills). The Studio is embedded at `/studio`.
- Resend sends the contact form email.
- Hosted on Vercel. Vercel builds a preview for each pushed branch and deploys `main` to production.
- Package manager: pnpm

## Commands

- `pnpm dev`: run the site locally
- `pnpm test`: run the Jest tests
- `pnpm build`: production build. Run this before pushing.
- `pnpm lint`: currently broken (the ESLint config crashes). Fixing it is on the to-do list.

## Where things are

- `src/app/(site)/`: the pages (home, about, contact, projects, privacy-policy, terms)
- `src/app/api/contact/`: contact form endpoint
- `src/app/api/revalidate/`: Sanity webhook that refreshes content. It must reject requests without a valid signature.
- `src/components/layouts/HeroBackground.tsx`: the full-screen hero background (coded animation, video, or image)
- `src/lib/gridAnimation.ts`: the home page background, a grid with pulses of light, drawn on a canvas. `src/lib/meshAnimation.ts` is an alternative look.
- `src/components/ui/background/`: React wrappers for the animations, and the pause button
- `src/lib/site.ts`: navigation links, social links, core values

## Rules for this site

1. **The Privacy Policy must stay true.** If you add anything that collects data or sets cookies (analytics, a newsletter, ads, accounts), update `src/app/(site)/privacy-policy/page.tsx` in the same change. Right now the site sets no tracking cookies, so it needs no cookie banner.
2. **No debug or test API routes in production.** Never add an endpoint that shows environment values, echoes signatures, or skips a signature check.
3. **Secrets live in environment variables only.** Never commit `.env` files. Never use a `NEXT_PUBLIC_` name for a secret.
4. **Keep it fast.** No large media in the repo. Resize photos to 2000px at most before adding them. Request Sanity images with a `width()` and `auto("format")`, never the full original.
5. **Motion must be pausable.** Any background that keeps moving needs the pause button (`BackgroundMotionToggle`) and must respect the reduced-motion setting.
6. **Only show work Jeff owns or has written permission to show.**
7. Comment code so a beginner can follow it.
