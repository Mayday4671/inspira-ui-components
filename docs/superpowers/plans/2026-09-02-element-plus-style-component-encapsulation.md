# Element Plus Style Component Encapsulation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve every existing component API while adding concise Element Plus-style props, events, exposes, data-driven quick modes, and documentation examples without presentation-only CSS or markup.

**Architecture:** Extend the existing Vue SFCs instead of replacing their animation internals. Shared button and motion contracts live in focused TypeScript modules; compound components remain available while top-level components gain data-driven shortcuts. VitePress DemoBlock owns demo-stage layout and surface styling so source snippets stay business-focused.

**Tech Stack:** Vue 3.5, TypeScript 5.9, Vite 7, Vitest, Vue Test Utils, happy-dom, VitePress 1.6, Tailwind CSS 4.

---

### Task 1: Add a component test harness and documentation contract tests

**Files:**
- Modify: `packages/inspira-ui/package.json`
- Modify: `packages/inspira-ui/vite.config.ts`
- Create: `packages/inspira-ui/src/components/__tests__/legacy-contract.spec.ts`
- Create: `packages/inspira-ui/src/components/__tests__/docs-contract.spec.ts`

- [ ] **Step 1: Add a failing legacy export and documentation contract test**

  Import every current `Iu*` export and assert it remains defined. Scan `docs/examples/**/basic.vue` and assert recommended examples contain neither `<style` nor `class="demo-`.

- [ ] **Step 2: Run the test and verify RED**

  Run: `pnpm --filter inspira-ui test --run`

  Expected: failure because the test script/dependencies are absent and current basic examples contain presentation CSS.

- [ ] **Step 3: Install and configure the minimum test runtime**

  Add `vitest`, `@vue/test-utils`, and `happy-dom` as package dev dependencies, add `"test": "vitest"`, and configure:

  ```ts
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.spec.ts'],
  }
  ```

- [ ] **Step 4: Run only the legacy export assertions**

  Run: `pnpm --filter inspira-ui test --run src/components/__tests__/legacy-contract.spec.ts`

  Expected: PASS, proving the compatibility baseline is captured.

- [ ] **Step 5: Commit the harness**

  ```bash
  git add packages/inspira-ui/package.json packages/inspira-ui/vite.config.ts pnpm-lock.yaml packages/inspira-ui/src/components/__tests__
  git commit -m "test: add component API contract harness"
  ```

### Task 2: Implement the shared button public contract

**Files:**
- Modify: `packages/inspira-ui/src/components/button-shared.ts`
- Modify: `packages/inspira-ui/src/components/interactive-hover-button/src/interactive-hover-button.ts`
- Modify: `packages/inspira-ui/src/components/interactive-hover-button/src/interactive-hover-button.vue`
- Modify: `packages/inspira-ui/src/components/rainbow-button/src/rainbow-button.ts`
- Modify: `packages/inspira-ui/src/components/rainbow-button/src/rainbow-button.vue`
- Modify: `packages/inspira-ui/src/components/ripple-button/src/ripple-button.ts`
- Modify: `packages/inspira-ui/src/components/ripple-button/src/ripple-button.vue`
- Modify: `packages/inspira-ui/src/components/gradient-button/src/gradient-button.ts`
- Modify: `packages/inspira-ui/src/components/gradient-button/src/gradient-button.vue`
- Modify: `packages/inspira-ui/src/components/shimmer-button/src/shimmer-button.ts`
- Modify: `packages/inspira-ui/src/components/shimmer-button/src/shimmer-button.vue`
- Create: `packages/inspira-ui/src/components/__tests__/button-contract.spec.ts`
- Modify: five button documentation examples and pages

- [ ] **Step 1: Write failing behavior tests**

  For each button, mount the component and assert `tag`, `nativeType`, `autofocus`, `loadingText`, and `ariaLabel` render correctly; assert disabled/loading suppress `click`; assert `focus()`, `blur()`, and exposed `ref` operate on the root element. Verify RainbowButton keeps `is` precedence over `tag`.

- [ ] **Step 2: Run tests and verify RED**

  Run: `pnpm --filter inspira-ui test --run src/components/__tests__/button-contract.spec.ts`

  Expected: FAIL because the shared contract and exposes do not exist.

- [ ] **Step 3: Add shared types and helpers**

  Extend `IuButtonBaseProps` with the new optional fields, export `IuButtonExposes`, and add a helper that returns native button attributes only when the selected tag is `button`.

- [ ] **Step 4: Update the five SFC roots**

  Render `<component :is="resolvedTag">`, intercept clicks before emitting, expose the root/focus/blur API, add focus-visible ring classes, and render `loadingText` without replacing the default slot when it is absent.

- [ ] **Step 5: Verify GREEN and update concise examples**

  Run the button contract test, typecheck, and ensure each recommended example uses only the button component tags and props.

- [ ] **Step 6: Commit button contracts**

  ```bash
  git add packages/inspira-ui/src/components docs/examples docs/components pnpm-lock.yaml
  git commit -m "feat: add Element Plus style button contracts"
  ```

### Task 3: Add high-level card APIs without removing slots

**Files:**
- Modify: Card3D, CardSpotlight, FlipCard, GlareCard, and BentoGrid type/SFC files
- Create: `packages/inspira-ui/src/components/__tests__/card-quick-mode.spec.ts`
- Modify: `docs/examples/card-3d/quick.vue`
- Modify: `docs/examples/card-spotlight/basic.vue`
- Modify: `docs/examples/flip-card/basic.vue`
- Modify: `docs/examples/glare-card/basic.vue`
- Modify: `docs/examples/bento-grid/basic.vue`
- Modify: `docs/components/card-3d.md`
- Modify: `docs/components/card-spotlight.md`
- Modify: `docs/components/flip-card.md`
- Modify: `docs/components/glare-card.md`
- Modify: `docs/components/bento-grid.md`

- [ ] **Step 1: Write failing quick-mode and compatibility tests**

  Assert each card renders its documented title/description/image/action fields without a slot; assert named/default slots override generated content; assert disabled links do not navigate or emit action events.

- [ ] **Step 2: Verify RED**

  Run: `pnpm --filter inspira-ui test --run src/components/__tests__/card-quick-mode.spec.ts`

- [ ] **Step 3: Implement exact fields from the approved design**

  Add the approved per-component fields, generate semantic `<img alt>`, headings, descriptions, and action links internally, and retain every current slot and compound export.

- [ ] **Step 4: Replace recommended examples with one-tag usage**

  Use props for content, dimensions, images, CTA, and navigation. Keep existing compound examples under an explicitly titled advanced section.

- [ ] **Step 5: Verify and commit**

  Run the card tests and typecheck, then commit with `feat: add card quick-mode APIs`.

### Task 4: Add data-driven collection APIs

**Files:**
- Modify: AnimatedTooltip, Marquee, and BentoGrid type/SFC files
- Create: `packages/inspira-ui/src/components/__tests__/collection-quick-mode.spec.ts`
- Modify: `docs/examples/animated-tooltip/basic.vue`
- Modify: `docs/examples/marquee/basic.vue`
- Modify: `docs/examples/bento-grid/basic.vue`
- Modify: `docs/components/animated-tooltip.md`
- Modify: `docs/components/marquee.md`
- Modify: `docs/components/bento-grid.md`

- [ ] **Step 1: Write failing data/slot precedence tests**

  Assert AnimatedTooltip emits the clicked item and uses meaningful alt text; Marquee renders string/object items; BentoGrid renders `BentoGridDataItem[]`; default slots override `items`; empty arrays render safely.

- [ ] **Step 2: Verify RED**

  Run: `pnpm --filter inspira-ui test --run src/components/__tests__/collection-quick-mode.spec.ts`

- [ ] **Step 3: Implement typed data modes**

  Add exported item types, stable-key resolution, internal default item markup, click events, span classes/styles, and disabled navigation behavior while preserving existing slots.

- [ ] **Step 4: Remove loops and presentation CSS from recommended docs examples**

  Move demo data to `<script setup>` arrays and render one top-level component tag.

- [ ] **Step 5: Verify and commit**

  Run collection tests and typecheck, then commit with `feat: add data-driven collection APIs`.

### Task 5: Complete Dialog events, exposes, and accessibility

**Files:**
- Modify: `packages/inspira-ui/src/components/dialog/src/dialog-types.ts`
- Modify: `packages/inspira-ui/src/components/dialog/src/dialog.vue`
- Create: `packages/inspira-ui/src/components/__tests__/dialog-contract.spec.ts`
- Modify: `docs/examples/dialog/*` and `docs/components/dialog.md`

- [ ] **Step 1: Write failing tests for the public lifecycle**

  Assert open/opened/close/closed order, confirm/cancel payloads, async `beforeClose(done)`, destroy-on-close, Escape behavior, focus restoration, and exposed methods.

- [ ] **Step 2: Verify RED**

  Run: `pnpm --filter inspira-ui test --run src/components/__tests__/dialog-contract.spec.ts`

- [ ] **Step 3: Implement lifecycle state and ARIA wiring**

  Keep current async-confirm semantics, add guarded closing, transition callbacks, title/description ids, keyboard handling, focus entry/restoration, and the approved exposes.

- [ ] **Step 4: Update documentation and verify GREEN**

  Keep the recommended example to `v-model`, content props, and handlers; document Props, Events, Slots, and Exposes separately.

- [ ] **Step 5: Commit**

  Commit with `feat: complete dialog public lifecycle`.

### Task 6: Add motion events and reduced-motion behavior

**Files:**
- Create: `packages/inspira-ui/src/components/motion-shared.ts`
- Modify: NumberTicker, Statistic, TypewriterText, FlipWords, TextGenerateEffect, BlurReveal, AuroraBackground, and PatternBackground files
- Create: `packages/inspira-ui/src/components/__tests__/motion-contract.spec.ts`
- Modify: `docs/examples/number-ticker/basic.vue`
- Modify: `docs/examples/number-ticker/interactive.vue`
- Modify: `docs/examples/statistic/basic.vue`
- Modify: `docs/examples/typewriter-text/basic.vue`
- Modify: `docs/examples/flip-words/basic.vue`
- Modify: `docs/examples/text-generate-effect/basic.vue`
- Modify: `docs/examples/blur-reveal/basic.vue`
- Modify: `docs/examples/aurora-background/basic.vue`
- Modify: `docs/examples/pattern-background/basic.vue`
- Modify: `docs/components/number-ticker.md`
- Modify: `docs/components/statistic.md`
- Modify: `docs/components/typewriter-text.md`
- Modify: `docs/components/flip-words.md`
- Modify: `docs/components/text-generate-effect.md`
- Modify: `docs/components/blur-reveal.md`
- Modify: `docs/components/aurora-background.md`
- Modify: `docs/components/pattern-background.md`

- [ ] **Step 1: Write failing reduced-motion and lifecycle tests**

  Mock `matchMedia`, assert `system/always/never` resolution, final content without animation, lifecycle events, and the exact exposed replay methods from the design.

- [ ] **Step 2: Verify RED**

  Run: `pnpm --filter inspira-ui test --run src/components/__tests__/motion-contract.spec.ts`

- [ ] **Step 3: Implement the shared policy and component lifecycles**

  Export `ReducedMotionMode`, centralize media-query resolution, short-circuit animations to final state, and add only the approved events/exposes. Background components receive pause controls and decorative ARIA defaults.

- [ ] **Step 4: Simplify recommended examples and verify GREEN**

  Remove typography/layout CSS from basic examples; DemoBlock supplies the presentation surface.

- [ ] **Step 5: Commit**

  Commit with `feat: add accessible motion contracts`.

### Task 7: Move all demo presentation into DemoBlock

**Files:**
- Modify: `docs/demo/demo-block.vue`
- Modify: the 28 existing `.vue` files under `docs/examples/` enumerated by `rg --files docs/examples -g '*.vue'`
- Modify: the 22 existing `.md` files under `docs/components/` enumerated by `rg --files docs/components -g '*.md'`
- Update: `packages/inspira-ui/src/components/__tests__/docs-contract.spec.ts`

- [ ] **Step 1: Extend the failing docs contract**

  Assert every recommended example is style-free and contains no presentation-only wrapper; allow explicit advanced slot examples through a documented `advanced` marker.

- [ ] **Step 2: Add DemoBlock layout/surface props**

  Implement `row/column/center/grid`, `default/light/dark/checker`, minimum height, accessible toolbar labels, visible focus states, and optional external actions only when URLs exist.

- [ ] **Step 3: Rewrite the examples that still fail the documentation contract**

  Replace presentation wrappers with DemoBlock props and component quick APIs. Retain wrappers only when they represent actual slot content, and label those examples advanced.

- [ ] **Step 4: Verify GREEN and commit**

  Run docs contract tests and `pnpm build:docs`, then commit with `docs: present concise component usage`.

### Task 8: Repair the VitePress information architecture

**Files:**
- Modify: `docs/.vitepress/config.mts`
- Modify: `docs/.vitepress/theme/custom.css`
- Create: `docs/components/index.md`
- Modify: `docs/demo/home-hero.vue`
- Modify: `packages/inspira-ui/package.json`

- [ ] **Step 1: Write failing config assertions**

  Assert search is nested under `themeConfig`, the component nav points to the overview, the displayed version equals the package version, and configured external links are non-placeholder values.

- [ ] **Step 2: Verify RED**

  Run the docs contract test and confirm the misplaced search/direct Dialog link fail.

- [ ] **Step 3: Implement truthful navigation**

  Move search into `themeConfig`, add version text, create the categorized overview, point Components to it, and omit unavailable remote/repository/Playground links rather than retaining the upstream repository.

- [ ] **Step 4: Add global focus-visible styling and improve demo contrast**

  Cover navigation, home actions/cards, sidebar controls, and DemoBlock controls. Give light/dark component examples explicit surfaces.

- [ ] **Step 5: Verify and commit**

  Run docs tests/build, then commit with `docs: align navigation with component platform`.

### Task 9: Full regression and browser verification

**Files:**
- Modify only files required by failures found during verification

- [ ] **Step 1: Run automated verification**

  ```bash
  pnpm --filter inspira-ui test --run
  pnpm typecheck
  pnpm build
  pnpm build:playground
  pnpm build:docs
  ```

  Expected: every command exits 0 with no TypeScript or Vite build errors.

- [ ] **Step 2: Run dist-consumer verification**

  Run `pnpm dev:dist`, open the Playground in Chrome, and confirm the public package output—not workspace source—renders the updated APIs.

- [ ] **Step 3: Inspect the documentation in Chrome**

  Check homepage, component overview, one button, one card, one collection, Dialog, and one motion component in light/dark modes. Verify search, keyboard focus, code expansion/copy, concise displayed source, and absence of contrast regressions.

- [ ] **Step 4: Review the final diff and commit fixes**

  Confirm `.complexity-log.md` remains untouched, run `git diff --check`, and commit only task-related files.
