# Frontend Quickstart Guide

**Feature**: 1-frontend-ui  
**Date**: 2025-12-30  
**Branch**: `1-frontend-ui`

## Prerequisites

- **Node.js 20+** installed ([Download](https://nodejs.org))
- **Docker Desktop** installed (for backend + database) ([Download](https://docker.com))
- **Qwen Code** installed (for agentic development)
- **Git** (for version control)

---

## Development Setup

### 1. Start Backend Stack

From the repository root:

```bash
cd C:\Hackathon\Hackathon_Todo\Phase 2
docker-compose up -d
```

This starts:
- **Backend API** (FastAPI) on `http://localhost:8000`
- **PostgreSQL Database** (Neon) on `localhost:5432`

Verify services are running:

```bash
docker-compose ps
```

---

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

This installs:
- Next.js 16+ (App Router)
- React 19+
- TypeScript 5.x
- Tailwind CSS 3.x
- Better Auth
- Framer Motion
- Vitest + React Testing Library
- Playwright (E2E testing)

---

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Authentication (MUST match backend BETTER_AUTH_SECRET)
BETTER_AUTH_SECRET=your-32-character-cryptographically-secure-random-string

# Optional: Analytics, etc. (Phase III)
```

**Important**: The `BETTER_AUTH_SECRET` must be identical to the backend's secret for JWT verification to work.

---

### 4. Start Development Server

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

### 5. Verify Setup

1. Open `http://localhost:3000` in your browser
2. Click **"Sign Up"**
3. Create account with:
   - Email: `test@example.com`
   - Password: `password123`
4. You should be redirected to the dashboard
5. Click **"Add Todo"**
6. Create your first todo:
   - Title: "Complete project proposal"
   - Notes: "Include budget and timeline"
   - Due Date: Tomorrow
7. Click **"Save Todo"**
8. You should see the todo appear in your list with a success notification
9. Click the checkbox to mark it complete
10. You should see instant visual feedback (strikethrough, dimmed)

---

## Common Commands

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests (requires running app)
npm run test:e2e

# Build for production
npm run build

# Start production server (after build)
npm run start

# Lint code (ESLint)
npm run lint

# Fix lint errors
npm run lint:fix

# Format code (Prettier)
npm run format

# Check TypeScript types
npm run type-check

# Generate component documentation
npm run docs
```

---

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Landing page
│   │   ├── (auth)/             # Auth route group
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── layout.tsx
│   │   └── (dashboard)/        # Protected route group
│   │       ├── layout.tsx      # AuthGuard wrapper
│   │       └── page.tsx        # Todo dashboard
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ...
│   │   ├── auth/               # Auth components
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   └── todo/               # Todo components
│   │       ├── TodoList.tsx
│   │       ├── TodoItem.tsx
│   │       ├── TodoForm.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── api/                # API client
│   │   │   ├── client.ts       # Fetch wrapper with JWT
│   │   │   ├── auth.ts         # Auth API calls
│   │   │   └── todos.ts        # Todo API calls
│   │   └── hooks/              # Custom React hooks
│   │       ├── useAuth.ts
│   │       ├── useTodos.ts
│   │       └── useToast.ts
│   ├── types/
│   │   ├── todo.ts             # Todo entity types
│   │   ├── auth.ts             # Auth types
│   │   └── api.ts              # API response types
│   └── styles/
│       └── globals.css         # Tailwind + global styles
├── public/
│   └── images/
│       └── empty-state.svg     # Empty state illustration
├── tests/
│   ├── components/             # Component unit tests
│   └── e2e/                    # Playwright E2E tests
├── .env.local.example
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Troubleshooting

### API Calls Failing (Network Error)

**Problem**: Console shows `Failed to fetch` or `Network error`

**Solution**:
1. Ensure backend is running: `docker-compose ps`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local` matches backend URL
3. Verify backend is accessible: `curl http://localhost:8000`

---

### CORS Errors

**Problem**: Console shows `Access-Control-Allow-Origin` errors

**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` is exactly `http://localhost:8000` (no trailing slash)
2. Ensure backend CORS configuration allows `http://localhost:3000`
3. Restart both frontend and backend

---

### Authentication Not Working

**Problem**: Can't sign in, or signed out immediately after refresh

**Solution**:
1. Verify `BETTER_AUTH_SECRET` in `.env.local` matches backend's secret
2. Check browser console for 401 errors
3. Clear browser storage: `localStorage.clear()` in DevTools console
4. Try incognito mode to rule out cache issues

---

### Build Errors

**Problem**: `npm run build` fails with TypeScript errors

**Solution**:
1. Run `npm run type-check` to see all type errors
2. Fix type errors (no `any` types without justification)
3. Ensure all imports are correct (case-sensitive paths)

---

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port
PORT=3001 npm run dev
```

---

## Design Philosophy

This frontend prioritizes:

1. **Visual Excellence**: Every pixel is intentional, no placeholder UI
2. **Instant Feedback**: Optimistic updates, <100ms response time
3. **Accessibility**: WCAG 2.1 AA compliant (keyboard nav, screen readers, contrast)
4. **Performance**: Lighthouse 90+ score on mobile and desktop
5. **Simplicity**: No unnecessary complexity, YAGNI principle

---

## Why This UI Feels Premium

### Typography
- System fonts for instant loading, perfect platform-native rendering
- Consistent scale: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`
- Font weights: `font-medium` (500), `font-semibold` (600), `font-bold` (700)

### Spacing
- Consistent 4px grid (Tailwind scale: 1=4px, 2=8px, 3=12px, 4=16px, 6=24px)
- Generous padding: `p-4` (16px) for cards, `p-6` (24px) for modals
- Comfortable gaps: `gap-4` between list items, `gap-2` between buttons

### Depth
- Subtle shadows: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- Backdrop blur: `backdrop-blur-sm` on modal overlays
- Layering: Proper z-index hierarchy (modal > header > content)

### Motion
- Smooth 200-300ms transitions on all interactive elements
- Respects `prefers-reduced-motion` media query
- Micro-interactions: hover lifts, focus rings, loading spinners
- Layout animations for list reordering (framer-motion)

### Color
- Harmonious palette: `blue-600` primary, `green-500` success, `red-500` error
- Neutral grays: `gray-50` (bg), `gray-200` (border), `gray-700` (text)
- Consistent semantic colors across all components

### Whitespace
- Breathing room between sections: `py-8`, `py-12`
- Card padding: `p-4` or `p-6` minimum
- Modal content: `p-6` for comfortable reading

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

```bash
npm test
```

Tests cover:
- Component rendering (no crashes)
- User interactions (clicks, form submissions)
- Props validation
- Hook logic

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

Tests cover:
- Full user flows (register → add todo → complete → delete)
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Mobile responsiveness
- Accessibility (axe-core)

---

## Deployment (Future)

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Automatic deployments on git push to `main`.

### Docker Production

```bash
docker build -t todo-frontend .
docker run -p 3000:3000 todo-frontend
```

---

## Next Steps

After verifying setup:

1. **Review the specification**: `specs/1-frontend-ui/spec.md`
2. **Review the plan**: `specs/1-frontend-ui/plan.md`
3. **Run `/sp.tasks`**: Generate implementation tasks
4. **Start implementing**: Follow tasks in priority order (P1 → P2 → P3)

---

**Support**: For issues or questions, create a GitHub issue or ask in the team chat.

**Last Updated**: 2025-12-30
