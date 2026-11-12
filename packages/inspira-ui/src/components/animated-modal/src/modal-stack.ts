import { shallowReactive } from 'vue'
import type { AnimatedModalContext } from './context'

interface ModalLayer {
  modal: AnimatedModalContext
  overlay: HTMLElement
  panel: HTMLElement
  previousFocus: HTMLElement | null
  lockScroll: boolean
  zIndex: () => number
}

interface ModalStack {
  layers: ModalLayer[]
  inert: Set<Element>
  originalOverflow?: string
  observer?: MutationObserver
}

const stacks = new WeakMap<Document, ModalStack>()

function getStack(document: Document) {
  let stack = stacks.get(document)
  if (!stack) {
    stack = { layers: shallowReactive([]), inert: new Set() }
    stacks.set(document, stack)
  }
  return stack
}

function updateBackground(document: Document, stack: ModalStack) {
  const background = new Set<Element>()
  stack.observer?.disconnect()
  const Observer = document.defaultView?.MutationObserver
  if (Observer) stack.observer ??= new Observer(() => updateBackground(document, stack))

  let branch: Element | null = stack.layers[stack.layers.length - 1]?.overlay ?? null
  while (branch && branch !== document.body) {
    const parent: Element | null = branch.parentElement
    if (!parent) break
    stack.observer?.observe(parent, { childList: true })
    for (const sibling of parent.children) {
      if (sibling !== branch) background.add(sibling)
    }
    branch = parent
  }

  for (const element of stack.inert) {
    if (background.has(element)) continue
    element.removeAttribute('inert')
    stack.inert.delete(element)
  }
  for (const element of background) {
    if (element.hasAttribute('inert')) continue
    element.setAttribute('inert', '')
    stack.inert.add(element)
  }

  if (stack.layers.some((layer) => layer.lockScroll)) {
    stack.originalOverflow ??= document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else if (stack.originalOverflow !== undefined) {
    document.body.style.overflow = stack.originalOverflow
    stack.originalOverflow = undefined
  }
}

export function registerModal(layer: ModalLayer) {
  const document = layer.overlay.ownerDocument
  const activeStack = getStack(document)
  activeStack.layers.push(layer)
  updateBackground(document, activeStack)
  layer.panel.focus()

  return () => {
    const index = activeStack.layers.indexOf(layer)
    if (index === -1) return
    const wasTop = index === activeStack.layers.length - 1
    activeStack.layers.splice(index, 1)
    for (const remaining of activeStack.layers) {
      if (layer.overlay.contains(remaining.previousFocus)) remaining.previousFocus = layer.previousFocus
    }
    updateBackground(document, activeStack)
    if (!wasTop) return

    const target = layer.previousFocus
    if (target?.isConnected && !target.closest('[inert], [aria-hidden="true"]')) target.focus()
    const top = activeStack.layers[activeStack.layers.length - 1]
    if (top && !top.panel.contains(document.activeElement)) top.panel.focus()
  }
}

export function isTopModal(document: Document, modal: AnimatedModalContext) {
  const { layers } = getStack(document)
  const top = layers[layers.length - 1]
  return !top || top.modal === modal
}

export function modalZIndex(document: Document, modal: AnimatedModalContext, requested: number) {
  const { layers } = getStack(document)
  let zIndex = -Infinity
  for (const layer of layers) {
    zIndex = Math.max(zIndex + 1, layer.zIndex())
    if (layer.modal === modal) return zIndex
  }
  return requested
}
