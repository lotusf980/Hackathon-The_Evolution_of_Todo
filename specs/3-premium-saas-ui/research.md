# Research & Technical Decisions: Premium SaaS UI

**Feature**: 3-premium-saas-ui  
**Date**: 2025-12-30  
**Spec**: [spec.md](./spec.md)

## Purpose

Document all technical decisions made during Phase 0 research to resolve `NEEDS CLARIFICATION` markers from the implementation plan.

---

## Decision 1: Component Library

**Question**: ShadCN UI vs Radix vs Headless UI?

### Decision
Use **ShadCN UI**

### Rationale
- Copy-paste components (full control over code)
- Built on Radix UI primitives (accessible)
- Tailwind CSS native (perfect fit)
- Fully customizable (no black-box components)
- Active maintenance and community

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Radix UI | Lower-level, more control | More customization needed, less opinionated | Rejected |
| Headless UI | Good, Tailwind integration | Less component variety | Rejected |
| Material UI | Complete, well-documented | Heavy bundle, different design language | Rejected |
| ShadCN UI | Copy-paste, accessible, Tailwind-native | Newer (but stable) | **Selected** |

---

## Decision 2: Animation Library

**Question**: Framer Motion vs React Spring vs CSS?

### Decision
Use **Framer Motion 11.x**

### Rationale
- Declarative API (easy to use)
- Layout animations (automatic)
- Gestures support (hover, tap, drag)
- Reduced motion support (built-in)
- Performance optimized (GPU accelerated)

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| React Spring | More control, physics-based | Steeper learning curve | Rejected |
| CSS transitions | Simple, no dependency | Limited, no layout animations | Rejected |
| GSAP | Most powerful, timeline control | Overkill, larger bundle | Rejected |
| Framer Motion | Declarative, React-native, performant | Slightly larger than CSS | **Selected** |

---

## Decision 3: Icon Library

**Question**: Lucide vs Heroicons vs Feather?

### Decision
Use **Lucide React**

### Rationale
- Consistent stroke width (2px)
- Comprehensive icon set (1000+ icons)
- Tree-shakeable (small bundle)
- ShadCN default (seamless integration)

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Heroicons | Good, Tailwind integration | Smaller icon set | Rejected |
| Feather Icons | Simple, clean | Less maintained, smaller set | Rejected |
| FontAwesome | Huge library | Heavy, overkill for this scope | Rejected |
| Lucide React | Consistent, comprehensive, tree-shakeable | Newer (but stable) | **Selected** |

---

## Decision 4: Design Tokens

**Question**: CSS Variables vs TypeScript vs Tailwind Config?

### Decision
Use **CSS Variables + Tailwind Config**

### Rationale
- CSS variables: Runtime theming, dark mode support
- Tailwind config: Type safety, autocomplete
- Combined: Best of both worlds

### Implementation

```css
/* variables.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
    }
  }
}
```

---

## Decision 5: Layout Architecture

**Question**: Fixed Sidebar vs Top Navigation?

### Decision
Use **Fixed Left Sidebar** (collapsible)

### Rationale
- SaaS standard pattern (familiar to users)
- Better for deep navigation hierarchies
- Collapsible for more content space
- Mobile-responsive with drawer

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Top Navigation | Simple, familiar | Less scalable, harder to organize | Rejected |
| Hybrid (Top + Side) | Flexible | More complex, overkill for scope | Rejected |
| Fixed Sidebar | SaaS standard, scalable | Takes horizontal space | **Selected** |

---

## Decision 6: Dark Mode

**Question**: System Preference vs Manual Toggle?

### Decision
Use **System Preference + Manual Override**

### Rationale
- Respects user OS preference (good UX)
- Manual toggle for flexibility
- Stored in localStorage (persists)

### Implementation

```ts
const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

useEffect(() => {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  
  if (theme === 'system') {
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    root.classList.add(system)
  } else {
    root.classList.add(theme)
  }
}, [theme])
```

---

## Summary of Decisions

| Decision | Choice | Impact |
|----------|--------|--------|
| Component Library | ShadCN UI | Accessible, customizable, Tailwind-native |
| Animation Library | Framer Motion | Declarative, performant, reduced motion support |
| Icon Library | Lucide React | Consistent, comprehensive, tree-shakeable |
| Design Tokens | CSS Variables + Tailwind | Runtime theming, type safety |
| Layout Architecture | Fixed Sidebar | SaaS standard, scalable navigation |
| Dark Mode | System + Manual | Best UX, user control |

All decisions align with constitution principles:
- ✅ Spec-first (documented before implementation)
- ✅ Type safety (TypeScript, fully typed components)
- ✅ Performance (60fps animations, tree-shaking)
- ✅ Maintainability (documented design system, modular components)
- ✅ Accessibility (ShadCN built on Radix, reduced motion support)

---

**Status**: ✅ COMPLETE - All `NEEDS CLARIFICATION` markers resolved  
**Next Phase**: Phase 1 (Design System, Component Catalog, Quickstart)
