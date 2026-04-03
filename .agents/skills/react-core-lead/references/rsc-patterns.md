# RSC Patterns Reference

## Table of Contents
1. [Server vs Client Boundary Decision Tree](#1-server-vs-client-boundary-decision-tree)
2. [Data Fetching Patterns](#2-data-fetching-patterns)
3. [Server Actions](#3-server-actions)
4. [Common Mistakes](#4-common-mistakes)
5. [Composition Patterns](#5-composition-patterns)

---

## 1. Server vs Client Boundary Decision Tree

```
Does the component need:
├── onClick, onChange, or other event handlers? → Client Component
├── useState or useReducer? → Client Component
├── useEffect? → Client Component
├── Browser APIs (window, document, localStorage)? → Client Component
├── Class components or context providers with state? → Client Component
└── None of the above? → Server Component (default)
```

**Rule:** Push `"use client"` as deep in the tree as possible. Wrap only the interactive leaf, not the whole subtree.

---

## 2. Data Fetching Patterns

### Server Component (preferred for server-origin data)
```tsx
// app/users/page.tsx — Server Component, zero client JS
async function UsersPage() {
  const users = await db.users.findMany(); // direct DB access
  return <UserList users={users} />;
}
```

### Parallel fetching (avoid waterfall)
```tsx
async function Dashboard() {
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts(),
  ]);
  return <DashboardUI user={user} posts={posts} />;
}
```

### Streaming with Suspense
```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent />
      </Suspense>
      <FastComponent /> {/* renders immediately */}
    </>
  );
}
```

---

## 3. Server Actions

```tsx
// actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  await db.posts.create({ data: { title } });
  revalidatePath('/posts');
}

// PostForm.tsx
'use client';
import { createPost } from './actions';

export function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}
```

**Key rules for Server Actions:**
- Always validate input server-side; never trust client data.
- Use `revalidatePath` or `revalidateTag` to invalidate cache after mutations.
- Server Actions can be called from Client Components or `<form action={...}>`.

---

## 4. Common Mistakes

| Mistake | Fix |
|---|---|
| `"use client"` at root layout | Push boundary to leaf interactive components |
| Fetching in Client Component when data is server-only | Move fetch to Server Component, pass as prop |
| Passing non-serializable objects across boundary | Only JSON-serializable data crosses Server→Client |
| Using `useEffect` for data that could be fetched on server | Fetch on server; pass as prop or use RSC cache |
| Server Component importing a Client-only package | Move the import inside a Client Component |

---

## 5. Composition Patterns

### Server Component wrapping Client Component (correct)
```tsx
// ServerParent.tsx (Server)
import { ClientChild } from './ClientChild';

export async function ServerParent() {
  const data = await fetchData();
  return <ClientChild data={data} />;
}
```

### Passing Server Components as children to Client Components (correct)
```tsx
// Layout.tsx (Server)
import { Modal } from './Modal'; // Client Component

export default function Layout({ children }) {
  return <Modal>{children}</Modal>; // children are Server-rendered
}
```

### Context providers — always Client Components
```tsx
'use client';
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
```
