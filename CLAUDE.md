# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun dev           # Start development server
bun run build     # Production build
bun start         # Start production server
bun lint          # Run ESLint
bun run format    # Format code with Prettier
```

## Architecture

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4

**Path Alias:** `~/` maps to `./src/`

### Key Architectural Patterns

**Navigation System:** Mouse wheel-based navigation between main routes (/, /blog, /books, /contact). `NavigationProvider` tracks navigation direction (up/down/fade), and `template.tsx` orchestrates Framer Motion page transitions with directional animations.

**Blog with MDX:** Blog posts are local MDX files in `/src/content/blog/`. Frontmatter includes title, publishedAt, readTime, thumbnail, summary. MDX components are defined in `/mdx-components.tsx` at project root.

**Responsive Layout:** Desktop-first design. `DesktopLayout` provides side navigation menu + main content area. Mobile shows a fallback message.

### Directory Structure

- `/src/app/` - Next.js App Router pages
- `/src/components/` - React components (blog, books, hero, menu, navigation)
- `/src/ui/` - Reusable UI primitives (button, separator, tinted-image)
- `/src/providers/` - React context providers (AppProviders, NavigationProvider)
- `/src/hooks/` - Custom hooks (useInViewport, usePreviousRoute)
- `/src/utils/` - Utilities including `mdx.ts` for reading blog posts
- `/src/content/blog/` - MDX blog posts
- `/src/content/books.json` - Static book data

### Adding a Blog Post

Create a new `.mdx` file in `/src/content/blog/` with frontmatter:

```mdx
---
title: "Post Title"
publishedAt: "2024-01-15"
readTime: 5
thumbnail: "/images/blog/thumbnail.jpg"
summary: "Brief description for listing cards"
---

Your content here...
```

### SVG Handling

Configured via SVGR in `next.config.mjs` (both Turbopack and webpack):
- Default imports: SVGs as React components
- `import url from './icon.svg?url'` for raw file URLs

## Code Style

- **No type assertions** (`as Type`) - use proper typing instead
- **No `any` type** - it breaks the type system
- **Comments**: Only add "why" comments when necessary. Never add "how" or "what" comments.
- **No margins**: Use padding and proper layout (flex gap, grid gap) instead of margins for spacing.

## Testing & Verification

### Playwright MCP

Use the Playwright MCP server to verify visual styling, fonts, and Tailwind classes in the browser:

- `mcp__playwright__browser_navigate` - Navigate to pages (e.g., `http://localhost:3000`)
- `mcp__playwright__browser_evaluate` - Execute JS to check computed styles, font loading status
- `mcp__playwright__browser_take_screenshot` - Capture screenshots for visual verification
- `mcp__playwright__browser_snapshot` - Get accessibility tree snapshot of page elements

Example verification workflow:
1. Start dev server with `bun dev`
2. Navigate to page with Playwright
3. Evaluate `document.fonts.check('16px Roboto')` to verify font loading
4. Check `getComputedStyle(element).fontFamily` to verify applied fonts
5. Take screenshot to visually confirm styling
