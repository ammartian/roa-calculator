# Agent Guidelines for ROA Calculator

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript 5+ with strict mode
- **Styling**: Tailwind CSS v4 with shadcn/ui
- **UI Components**: shadcn/ui + Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist (Sans + Mono) via next/font

## Code Style Guidelines

### TypeScript

- Enable strict mode - all code must be type-safe
- Use explicit return types for exported functions
- Prefer interfaces over type aliases for object shapes
- Use `type` for unions, mapped types, and utility types
- Avoid `any` - use `unknown` with type guards when needed

### Imports

- Use path alias `@/*` for project imports (configured in tsconfig.json)
- Group imports: React/Next → third-party → local (@/*)
- Use named imports for tree-shaking: `import { Button } from "@/components/ui/button"`
- Import types separately: `import type { Metadata } from "next"`

### Component Patterns

- Use function declarations for components: `function Button({ ... })`
- Props interface named with component name: `interface ButtonProps`
- Client components: mark with `"use client"` at the top
- Server components: default, no directive needed
- Use `React.ComponentProps<"element">` for HTML prop extension
- Compose with `asChild` pattern for polymorphic components

### Naming Conventions

- Components: PascalCase (e.g., `Calculator.tsx`)
- Utilities: camelCase (e.g., `cn.ts`)
- Constants: UPPER_SNAKE_CASE for true constants
- Files match default export name
- Boolean props: use positive naming (e.g., `isOpen`, not `isClosed`)

### Styling

- Use Tailwind CSS utility classes
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Leverage shadcn/ui design tokens: `--color-primary`, `--radius`, etc.
- Support dark mode via `dark:` variants
- Use CSS variables for theming (defined in globals.css)

### Error Handling

- Validate user inputs with proper sanitization
- Use early returns for guard clauses
- Handle edge cases (division by zero, NaN checks)
- Type-safe error handling with explicit checks

### Performance

- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to children
- Leverage React Server Components where possible
- Lazy load heavy components with `next/dynamic`

### Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Support keyboard navigation
- Maintain focus management
- Test with screen readers

## Project Structure

```
app/                    # Next.js App Router
├── components/         # Page-specific components
├── page.tsx           # Home page
├── layout.tsx         # Root layout
└── globals.css        # Global styles
components/ui/         # shadcn/ui components
lib/                   # Utilities
├── utils.ts          # cn() helper
└── currencies.ts     # Currency data
public/                # Static assets
```

## Testing

No test framework configured. To add tests:
- Jest: `npm install --save-dev jest @testing-library/react`
- Vitest: `npm install --save-dev vitest @testing-library/react`

Run single test: `npm test -- --testNamePattern="pattern"`

## Environment

- Node.js 18+ required
- No environment variables needed currently
- Static export compatible (no API routes)

## Common Tasks

```bash
# Add shadcn component
npx shadcn add button

# Install dependency
npm install <package>

# Type check
npx tsc --noEmit
```
