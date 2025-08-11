# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Next.js 15 application with TypeScript and Chakra UI v3. All commands use npm:

- **Development**: `npm run dev` (uses --turbopack for faster builds)
- **Production build**: `npm run build`
- **Production start**: `npm start`
- **Linting**: `npm run lint` (runs ESLint and Prettier in parallel)
- **Auto-fix**: `npm run fix` (formats with Prettier, then fixes ESLint issues)

The linting setup uses `npm-run-all` to run multiple linters in parallel for efficiency.

## Architecture Overview

This is a Japanese sign language dance group website ("手話ダンス教室 スマイル") with the following structure:

### Content Management
- **CMS**: microCMS headless CMS integration via `microCMSClient.ts`
- **API Keys**: Uses environment variables `MICROCMS_SERVICE_DOMAIN` and `MICROCMS_API_KEY`
- **Images**: Remote images from `images.microcms-assets.io` are configured in Next.js config

### UI Framework
- **Chakra UI v3**: Modern component library with `defaultSystem`
- **Theme**: Forced to light mode (`forcedTheme="light"`)
- **Components**: Located in `src/components/ui/` and `src/components/layout/`
- **Styling**: Uses Chakra's responsive design system

### Routing Structure
- **App Router**: Next.js 15 app directory structure
- **Key Pages**:
  - `/` - Homepage with main visual
  - `/blogs` - Blog listing with pagination (12 posts per page)
  - `/blogs/[id]` - Individual blog posts
  - `/contact` - Contact form
  - `/thanks` - Thank you page

### Data Fetching
- Server-side rendering for blog content via microCMS API
- Pagination with `PAGE_SIZE = 12` constant
- Type-safe API responses with TypeScript interfaces

## Code Conventions

### Git Commits
Follow Angular commit convention as defined in `.cursorrules`:
- Format: `prefix: message` (under 50 chars including prefix)
- Prefixes: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- Use English and imperative mood
- No periods at the end

### File Organization
- `src/app/` - Next.js app router pages and layouts
- `src/components/ui/` - Reusable UI components
- `src/components/layout/` - Layout components (header, footer)
- `src/lib/` - Utility libraries and configurations
- `public/` - Static assets organized by category

### TypeScript Configuration
- Strict mode enabled
- Path aliases: `@/*` maps to `./src/*`
- ESNext target with modern module resolution