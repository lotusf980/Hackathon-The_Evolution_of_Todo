# Research & Technical Decisions: Frontend UI

**Feature**: 1-frontend-ui  
**Date**: 2025-12-30  
**Spec**: [spec.md](./spec.md)

## Purpose

Document all technical decisions made during Phase 0 research to resolve `NEEDS CLARIFICATION` markers from the implementation plan.

---

## Decision 1: Font Strategy

**Question**: System fonts vs. Google Fonts import for premium typography?

### Decision
Use **system font stack** (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`) with optional Inter via `next/font/google` if visual audit recommends.

### Rationale
- **Performance**: System fonts load instantly (zero FOUT/FOIT, zero network requests)
- **Bundle Size**: 0KB impact vs. ~50KB for custom fonts
- **Rendering**: Modern system fonts (San Francisco on macOS, Segoe UI on Windows) are visually excellent and optimized for their platforms
- **Accessibility**: System fonts respect user OS preferences
- **Fallback**: Can add Inter later via `next/font/google` (automatic optimization, self-hosted)

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Inter via Google Fonts | Consistent across platforms, modern look | 50KB bundle, network request, FOUT risk | Rejected for MVP |
| Custom font hosting | Full control, no Google dependency | Added complexity, minimal visual gain | Rejected |
| System fonts only | Instant load, 0KB, platform-optimized | Slight visual variation across OS | **Selected** |

### Implementation
```css
/* tailwind.config.ts */
theme: {
  fontFamily: {
    sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  }
}
```

**Future Enhancement**: Add Inter via `next/font/google` in polish phase if visual audit recommends more premium feel.

---

## Decision 2: Modal Implementation

**Question**: Client-side overlay with portal vs. full-page route for modals?

### Decision
**Client-side modal overlay** with React Portal, backdrop blur, and glassmorphism effects.

### Rationale
- **UX**: Preserves page context, no navigation disruption
- **Performance**: No page reload, instant open/close
- **Premium Feel**: Backdrop blur (`backdrop-blur-sm`) creates depth and focus
- **Animation**: Smooth scale-in/fade animations (`animate-in zoom-in-95`)
- **Mobile**: Full-screen modal on mobile (`@media (max-width: 640px)`)
- **Accessibility**: Escape key closes, focus trap, proper ARIA labels

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Full-page route (/todos/new) | Simple routing, bookmarkable | Loses context, slower, breaks flow | Rejected |
| Dialog element | Native HTML, simple | Limited browser support, less customization | Rejected |
| Client-side portal | Premium feel, smooth, preserves state | More complex implementation | **Selected** |

### Implementation
```tsx
// Modal.tsx
export function Modal({ children, onClose }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal content with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full"
      >
        {children}
      </motion.div>
    </div>,
    document.body
  );
}
```

---

## Decision 3: Feedback Mechanism

**Question**: Custom toast component vs. simple alert banners for user feedback?

### Decision
**Custom Toast component** with auto-dismiss, positioned bottom-right (desktop) / bottom-center (mobile), with emerald success / rose error styling.

### Rationale
- **Non-blocking**: Auto-dismisses after 5 seconds, doesn't interrupt workflow
- **Professional**: Matches premium apps (Linear, Todoist, Notion)
- **Stacking**: Multiple toasts stack cleanly
- **Undo Option**: Can add undo button for destructive actions (delete)
- **Accessibility**: `aria-live="polite"` announces to screen readers

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Alert banners | Simple to implement | Intrusive, blocks content, ugly | Rejected |
| Browser alerts | Built-in | Terrible UX, blocking, unstyled | Rejected |
| Status bar messages | Subtle | Easily missed, not urgent enough | Rejected |
| Custom toast | Elegant, non-blocking, professional | More implementation work | **Selected** |

### Implementation
```tsx
// Toast.tsx
export function Toast({ message, type = 'success' }) {
  const styles = {
    success: 'bg-green-50 border-l-4 border-green-500 text-green-800',
    error: 'bg-red-50 border-l-4 border-red-500 text-red-800',
  };
  
  return (
    <div className={`fixed bottom-4 right-4 px-4 py-3 rounded shadow-lg ${styles[type]}`}>
      {message}
    </div>
  );
}

// Usage in components
toast.success('Todo created successfully!');
toast.error('Failed to delete todo');
```

---

## Decision 4: State Management

**Question**: React local state vs. global store (Redux/Zustand)?

### Decision
**React state with custom hooks** (`useTodos`, `useAuth`). No global store for MVP scope.

### Rationale
- **Scope**: ~15-20 components is manageable with prop drilling + hooks
- **Simplicity**: No boilerplate (actions, reducers, store setup)
- **React 19**: Excellent state primitives (useOptimistic, useTransition)
- **Performance**: No unnecessary re-renders from global store subscriptions
- **Can Migrate**: Zustand can be added later if complexity grows (Phase III)

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Redux Toolkit | Predictable, devtools, middleware | Overkill, lots of boilerplate | Rejected |
| Zustand | Simple API, minimal boilerplate | Extra dependency, not needed yet | Rejected |
| React Query | Caching, background sync, optimistic updates | Complexity for simple CRUD | Rejected |
| Custom hooks | Simple, full control, no dependencies | Manual caching, error handling | **Selected** |

### Implementation
```tsx
// hooks/useTodos.ts
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const createTodo = async (input: CreateTodoInput) => {
    // Optimistic update
    const newTodo: Todo = { id: 'temp', ...input, createdAt: new Date() };
    setTodos([newTodo, ...todos]);
    
    const result = await todosApi.create(input);
    if (result.error) {
      setTodos(todos); // rollback
      toast.error('Failed to create todo');
    }
  };

  return { todos, loading, createTodo, updateTodo, deleteTodo };
}
```

---

## Decision 5: API Client Strategy

**Question**: Custom fetch wrapper vs. Axios vs. TanStack Query?

### Decision
**Custom fetch wrapper** with automatic JWT injection, retry logic, and error handling.

### Rationale
- **Simple API**: CRUD operations don't need complex caching
- **Full Control**: JWT handling, retry logic, timeout exactly as needed
- **Bundle Size**: ~100 lines vs. 1000+ for library
- **Learning**: Demonstrates understanding of HTTP, auth, error handling
- **Migration Path**: Can swap in TanStack Query in Phase III if needed

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Axios | Mature, interceptors, cancel | Extra dependency, 13KB | Rejected |
| TanStack Query | Caching, background sync, optimistic updates | Complexity, learning curve | Rejected for MVP |
| SWR | Simpler than React Query | Still adds complexity | Rejected |
| Custom fetch | Full control, minimal, educational | Manual implementation | **Selected** |

### Implementation
```tsx
// api/client.ts
class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const token = this.getAuth();
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...config,
        signal: AbortSignal.timeout(10000), // 10s timeout
      });

      if (response.status === 401) {
        window.location.href = '/sign-in';
        throw new Error('Unauthorized');
      }

      const data = await response.json();
      return response.ok ? { data } : { error: { status: response.status, message: data.message } };
    } catch (error) {
      return { error: { status: 500, message: 'Network error' } };
    }
  }
}
```

---

## Decision 6: Optimistic Updates

**Question**: Wait for API response vs. optimistic UI updates?

### Decision
**Optimistic UI updates** for all mutations (create, update, delete, complete) with rollback on error.

### Rationale
- **Performance**: Instant feedback (<100ms) feels magical
- **Premium UX**: Expected in modern apps (Linear, Notion, Todoist)
- **Perception**: Users perceive app as faster even if API is slow
- **Error Handling**: Rollback maintains data integrity
- **Toast Confirmations**: Success/error messages keep user informed

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Wait for API | Simple, always accurate | Feels slow, loading spinners | Rejected |
| Optimistic + rollback | Instant feedback, feels premium | More complex, must handle rollback | **Selected** |

### Implementation
```tsx
// handleComplete with optimistic update
const handleComplete = async (todoId: string, completed: boolean) => {
  const previousTodos = todos;
  
  // Optimistic update
  setTodos(todos.map(t => t.id === todoId ? { ...t, completed } : t));
  
  try {
    await todosApi.toggleComplete(todoId, completed);
    toast.success('Todo updated');
  } catch (error) {
    // Rollback on error
    setTodos(previousTodos);
    toast.error('Failed to update todo');
  }
};
```

---

## Decision 7: Micro-Interactions & Animations

**Question**: CSS transitions only vs. animation library (framer-motion)?

### Decision
**Hybrid approach**: Tailwind CSS transitions for simple hover/focus, `framer-motion` for complex animations (modals, list reordering).

### Rationale
- **Tailwind**: Perfect for simple transitions (hover, focus, disabled states)
- **Framer Motion**: Layout animations, gestures, complex sequences
- **Performance**: Both are optimized, GPU-accelerated
- **Accessibility**: `prefers-reduced-motion` support built-in
- **Professional**: Subtle animations elevate perceived quality

### Alternatives Considered

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| CSS only | No dependencies, simple | Limited control, hard to coordinate | Rejected |
| framer-motion | Powerful, declarative, gestures | Extra dependency (~15KB) | **Selected for complex** |
| GSAP | Most powerful, timeline control | Overkill, large bundle | Rejected |
| No animations | Fastest, simplest | Feels dead, not premium | Rejected |

### Implementation
```tsx
// Simple Tailwind transition (Button hover)
<button className="transition-all duration-200 hover:scale-105 hover:shadow-md">
  Add Todo
</button>

// Framer Motion (Modal enter)
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {children}
</motion.div>

// Layout animation (TodoList reordering)
<motion.ul layout className="space-y-3">
  {todos.map(todo => (
    <motion.li key={todo.id} layout className="...">
      <TodoItem todo={todo} />
    </motion.li>
  ))}
</motion.ul>
```

---

## Summary of Decisions

| Decision | Choice | Impact |
|----------|--------|--------|
| Font Strategy | System fonts | 0KB bundle, instant load |
| Modal Implementation | Client-side portal | Premium feel, smooth UX |
| Feedback Mechanism | Custom toast | Non-blocking, professional |
| State Management | Custom hooks | Simple, no boilerplate |
| API Client | Custom fetch wrapper | Full control, minimal |
| Optimistic Updates | Yes, with rollback | Instant feedback |
| Animations | Tailwind + framer-motion | Subtle, professional |

All decisions align with constitution principles:
- ✅ Spec-first (documented before implementation)
- ✅ Security (JWT handling, auth guards)
- ✅ Type safety (TypeScript interfaces)
- ✅ Performance (optimistic updates, instant feedback)
- ✅ Maintainability (simple architecture, no over-engineering)

---

**Status**: ✅ COMPLETE - All `NEEDS CLARIFICATION` markers resolved  
**Next Phase**: Phase 1 (Data Model, API Contracts, Quickstart)
