# Wide Documentation Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the narrow VitePress document column with a responsive three-column workspace matching the approved reference layout.

**Architecture:** Keep VitePress DOM and behavior intact and change only theme-level layout constraints. A source contract test locks the key desktop widths, flexible content rule, and breakpoints; Chrome visual verification confirms the CSS against real rendered pages.

**Tech Stack:** VitePress 1.6, Vue 3, CSS, Vitest, Chrome.

---

### Task 1: Add a layout contract test

**Files:**
- Modify: `packages/inspira-ui/src/components/__tests__/docs-contract.spec.ts`
- Test: `packages/inspira-ui/src/components/__tests__/docs-contract.spec.ts`

- [ ] **Step 1: Write the failing layout assertions**

Read `docs/.vitepress/theme/custom.css` and assert it contains the approved rail variables and content behavior:

```ts
expect(css).toContain('--iu-doc-sidebar-width: 260px')
expect(css).toContain('--iu-doc-aside-width: 220px')
expect(css).toContain('.VPDoc.has-aside .content-container')
expect(css).toMatch(/max-width:\s*none/)
expect(css).toContain('@media (max-width: 1439px)')
expect(css).toContain('@media (max-width: 959px)')
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm --filter inspira-ui-components test --run src/components/__tests__/docs-contract.spec.ts`

Expected: FAIL because the rail variables and responsive rules do not exist.

- [ ] **Step 3: Commit the failing contract with the implementation**

The test and CSS form one reviewable layout change and will be committed together after GREEN.

### Task 2: Implement the responsive three-column layout

**Files:**
- Modify: `docs/.vitepress/theme/custom.css`
- Test: `packages/inspira-ui/src/components/__tests__/docs-contract.spec.ts`

- [ ] **Step 1: Define one set of layout tokens**

Add desktop rail and gutter variables:

```css
:root {
  --iu-doc-sidebar-width: 260px;
  --iu-doc-aside-width: 220px;
  --iu-doc-content-gutter: clamp(32px, 2.5vw, 48px);
  --vp-sidebar-width: var(--iu-doc-sidebar-width);
  --vp-layout-max-width: 100vw;
}
```

- [ ] **Step 2: Remove conflicting narrow content limits**

Make the VitePress content container flexible while preserving both rails:

```css
.VPDoc.has-aside .container,
.VPDoc.has-sidebar .container {
  max-width: none;
}

.VPDoc.has-aside .content,
.VPDoc.has-sidebar .content {
  max-width: none;
  padding-inline: var(--iu-doc-content-gutter);
}

.VPDoc.has-aside .content-container,
.VPDoc.has-sidebar .content-container {
  max-width: none;
}

.VPDoc .aside {
  width: var(--iu-doc-aside-width);
  padding-left: 24px;
}
```

- [ ] **Step 3: Add tablet and mobile fallbacks**

Use the approved breakpoints:

```css
@media (max-width: 1439px) {
  :root { --iu-doc-content-gutter: 32px; }
  .VPDoc .aside { display: none; }
}

@media (max-width: 959px) {
  :root { --iu-doc-content-gutter: 20px; }
  .VPDoc.has-aside .content,
  .VPDoc.has-sidebar .content { padding-inline: var(--iu-doc-content-gutter); }
}
```

- [ ] **Step 4: Run contract and build checks**

Run:

```bash
pnpm --filter inspira-ui-components test --run src/components/__tests__/docs-contract.spec.ts
pnpm typecheck
pnpm build:docs
```

Expected: all commands exit 0.

- [ ] **Step 5: Commit the layout**

```bash
git add docs/.vitepress/theme/custom.css packages/inspira-ui/src/components/__tests__/docs-contract.spec.ts
git commit -m "style: widen documentation workspace"
```

### Task 3: Browser verification and push

**Files:**
- Modify only files required by visual regressions

- [ ] **Step 1: Start VitePress and open a long component page**

Run `pnpm --filter docs dev --host 127.0.0.1`, then open Card3D and Quick Start in Chrome.

- [ ] **Step 2: Verify desktop and responsive widths**

Check at 2560px, 1440px, 1024px, and 390px. Confirm the desktop rails do not overlap, the middle column expands, the right outline hides below 1440px, and no page has horizontal scrolling.

- [ ] **Step 3: Verify content surfaces**

Expand a DemoBlock source panel and confirm Demo, code, API tables, and prose use the same wide content column.

- [ ] **Step 4: Run final regression**

Run:

```bash
pnpm --filter inspira-ui-components test --run
pnpm typecheck
pnpm build:docs
git diff --check
```

Expected: all commands exit 0; `.complexity-log.md` remains unstaged.

- [ ] **Step 5: Push main**

```bash
git push origin main
```
