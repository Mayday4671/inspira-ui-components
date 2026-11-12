import { mount, flushPromises } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import { h } from 'vue'
import WorldMap from '../world-map/src/WorldMap.vue'
import FileUpload from '../file-upload/src/FileUpload.vue'
import HaloSearch from '../halo-search/src/HaloSearch.vue'
import AnimatedTestimonials from '../animated-testimonials/src/AnimatedTestimonials.vue'
import AppleCard from '../apple-card-carousel/src/AppleCard.vue'
import AppleCardCarousel from '../apple-card-carousel/src/AppleCardCarousel.vue'
import ColorPicker from '../color-picker/src/ColorPicker.vue'
import Compare from '../compare/src/Compare.vue'
import Tree from '../file-tree/src/Tree.vue'
import Folder from '../file-tree/src/Folder.vue'
import FileItem from '../file-tree/src/File.vue'
import SpringCalendar from '../spring-calendar/src/SpringCalendar.vue'
import TestimonialSlider from '../testimonial-slider/src/TestimonialSlider.vue'
import LinkPreview from '../link-preview/src/LinkPreview.vue'
import GithubGlobe from '../github-globe/src/GithubGlobe.vue'
import ShaderToy from '../shader-toy/src/ShaderToy.vue'
import Spline from '../spline/src/Spline.vue'

const renderer = vi.hoisted(() => ({
  setSize: vi.fn(),
  setPixelRatio: vi.fn(),
  render: vi.fn(),
  dispose: vi.fn(),
  forceContextLoss: vi.fn(),
}))

const globeLifecycle = vi.hoisted(() => ({
  pauseAnimation: vi.fn(),
  resumeAnimation: vi.fn(),
  _destructor: vi.fn(),
}))

vi.mock('three', async (importOriginal) => ({
  ...await importOriginal<typeof import('three')>(),
  WebGLRenderer: class {
    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
      return { ...renderer, domElement: canvas }
    }
  },
}))

vi.mock('three-globe', async () => {
  const { Group, MeshPhongMaterial } = await import('three')
  return {
    default: class extends Group {
      constructor() {
        super()
        return new Proxy(Object.assign(this, globeLifecycle), {
          get(target, key, receiver) {
            if (key === 'globeMaterial') return () => new MeshPhongMaterial()
            return key in target ? Reflect.get(target, key, receiver) : (() => receiver)
          },
        })
      }
    },
  }
})

const spline = vi.hoisted(() => ({
  create: vi.fn(),
  load: vi.fn(),
  dispose: vi.fn(),
  addEventListener: vi.fn(),
}))

vi.mock('@splinetool/runtime', () => ({
  Application: class {
    constructor(canvas: HTMLCanvasElement) {
      spline.create(canvas)
      return spline
    }
  },
}))

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

const image = 'https://example.com/portrait.png'

it('renders native map images in a Vue app without global components', () => {
  const wrapper = mount(WorldMap, { props: { mapColor: '#888', mapBgColor: '#fff' } })
  try {
    expect(wrapper.find('img[alt="world map"]').attributes('src')?.slice(0, 25)).toMatch(/^data:image\/svg\+xml/)
  } finally {
    wrapper.unmount()
  }
})

it('renders upload and search icons and accepts a selected file', async () => {
  const upload = mount(FileUpload)
  const search = mount(HaloSearch)
  try {
    expect(upload.get('svg[aria-hidden="true"] path').attributes('d')).toBeTruthy()
    expect(search.get('svg[aria-hidden="true"] path').attributes('d')).toBeTruthy()

    const input = upload.get('input')
    const click = vi.spyOn(input.element, 'click')
    await upload.get('[role="button"]').trigger('keydown', { key: 'Enter' })
    expect(click).toHaveBeenCalledOnce()
    const file = new File(['sample'], 'sample.txt', { type: 'text/plain' })
    Object.defineProperty(input.element, 'files', { value: [file] })
    await input.trigger('change')
    expect(upload.emitted('onChange')).toEqual([[[file]]])
    expect(upload.text()).toContain(file.name)
  } finally {
    upload.unmount()
    search.unmount()
  }
})

it('renders LinkPreview navigation as a native link', async () => {
  const wrapper = mount(LinkPreview, { props: { url: '/guide', isStatic: true, imageSrc: image }, slots: {
    default: 'Guide',
  } })
  try {
    const link = wrapper.get('a[href="/guide"]')
    expect(link.text()).toBe('Guide')
    await link.trigger('mouseenter')
    expect(wrapper.get('img').attributes('src')).toBe(image)
    await link.trigger('mouseleave')
    expect(wrapper.find('img').exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})

it.each([
  ['animated testimonials', () => mount(AnimatedTestimonials, { props: {
    testimonials: [{ quote: 'Quote', name: 'Name', designation: 'Role', image }],
  } }), 2, 1],
  ['testimonial slider', () => mount(TestimonialSlider, { props: {
    testimonials: [{ quote: 'Quote', name: 'Name', role: 'Role', img: image }],
    autoRotate: false,
  } }), 2, 1],
  ['apple card carousel', () => mount(AppleCardCarousel, { slots: {
    default: () => h(AppleCard, { index: 0, card: { src: image, title: 'Title', category: 'Category' } }),
  } }), 2, 1],
  ['file tree', () => mount(Tree, { props: {
    elements: [], initialSelectedId: '', initialExpandedItems: [],
  }, slots: {
    default: () => [h(Folder, { id: 'folder', name: 'Folder' }), h(FileItem, { id: 'file', name: 'File' })],
  } }), 2, 0],
  ['color picker', () => mount(ColorPicker, { props: { open: true } }), 3, 0],
  ['compare', () => mount(Compare), 1, 0],
  ['spring calendar', () => mount(SpringCalendar, { props: {
    calendarData: [{ month: 'Nov', date: 12, day: 'Thursday', events: [] }],
  } }), 1, 0],
] as const)('renders %s assets without unresolved Vue components', (_, create, icons, images) => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const wrapper = create()
  try {
    expect(wrapper.findAll('svg[aria-hidden="true"]')).toHaveLength(icons)
    expect(wrapper.findAll('img')).toHaveLength(images)
    expect(warn.mock.calls.flat().join('\n')).not.toContain('Failed to resolve component')
  } finally {
    wrapper.unmount()
  }
})

it('falls back gracefully when the globe cannot create a WebGL context', async () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  const wrapper = mount(GithubGlobe)
  try {
    await flushPromises()
    expect(wrapper.get('canvas').attributes('aria-label')).toMatch(/unavailable/i)
    expect(renderer.render).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})

it('keeps the shader container available without trying to use a missing WebGL2 context', () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  const wrapper = mount(ShaderToy, { props: { shaderCode: 'void mainImage(out vec4 c, in vec2 f) { c = vec4(1.); }' } })
  try {
    expect(wrapper.emitted('error')).toEqual([['WebGL 2 not supported']])
    expect(wrapper.find('canvas').exists()).toBe(false)
    expect(error).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})

it('pauses the globe on context loss, resumes on restoration and disposes on each unmount', async () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as WebGL2RenderingContext)
  const add = vi.spyOn(window, 'addEventListener')
  const remove = vi.spyOn(window, 'removeEventListener')
  const request = vi.fn().mockReturnValue(1)
  const cancel = vi.fn()
  vi.stubGlobal('requestAnimationFrame', request)
  vi.stubGlobal('cancelAnimationFrame', cancel)

  for (let mountCount = 1; mountCount <= 2; mountCount++) {
    const wrapper = mount(GithubGlobe)
    try {
      await vi.dynamicImportSettled()
      await flushPromises()
      const canvas = wrapper.get('canvas')
      const loss = new Event('webglcontextlost', { cancelable: true })
      canvas.element.dispatchEvent(loss)
      expect(loss.defaultPrevented).toBe(true)
      expect(globeLifecycle.pauseAnimation).toHaveBeenCalledTimes(mountCount)
      expect(cancel).toHaveBeenCalledWith(1)

      await canvas.trigger('webglcontextrestored')
      expect(globeLifecycle.resumeAnimation).toHaveBeenCalledTimes(mountCount)
      expect(request).toHaveBeenCalledTimes(mountCount * 2)
    } finally {
      wrapper.unmount()
    }
    const resize = add.mock.calls.filter(([type]) => type === 'resize').pop()
    expect(resize).toBeDefined()
    expect(remove.mock.calls.some(([type, handler]) => type === 'resize' && handler === resize?.[1])).toBe(true)
    expect(globeLifecycle._destructor).toHaveBeenCalledTimes(mountCount)
    expect(renderer.dispose).toHaveBeenCalledTimes(mountCount * 2)
    expect(renderer.forceContextLoss).toHaveBeenCalledTimes(mountCount)
  }
})

it('skips Spline initialization when unmounted during the import', async () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as WebGL2RenderingContext)
  const wrapper = mount(Spline, { props: { scene: 'scene.splinecode' } })
  wrapper.unmount()
  await vi.dynamicImportSettled()
  expect(spline.create).not.toHaveBeenCalled()
})

it('aborts a pending Spline load and suppresses callbacks on unmount', async () => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as WebGL2RenderingContext)
  let finishLoad: () => void = () => {}
  spline.load.mockImplementationOnce(() => new Promise<void>((resolve) => { finishLoad = resolve }))
  const onLoad = vi.fn()
  const wrapper = mount(Spline, { props: { scene: 'scene.splinecode', onLoad } })
  try {
    await vi.dynamicImportSettled()
    expect(spline.load).toHaveBeenCalledWith('scene.splinecode', undefined, { signal: expect.any(AbortSignal) })
  } finally {
    wrapper.unmount()
    finishLoad()
  }
  await flushPromises()
  expect(spline.load.mock.calls[0][2].signal.aborted).toBe(true)
  expect(spline.dispose).toHaveBeenCalledOnce()
  expect(spline.addEventListener).not.toHaveBeenCalled()
  expect(onLoad).not.toHaveBeenCalled()
})

it('shows Spline fallback and emits an error when the runtime cannot initialize', async () => {
  const error = new Error('WebGL unavailable')
  spline.create.mockImplementationOnce(() => { throw error })
  const wrapper = mount(Spline, { props: { scene: 'scene.splinecode' } })
  try {
    await vi.dynamicImportSettled()
    expect(wrapper.get('[role="status"]').text()).toBe('3D scene unavailable')
    expect(wrapper.emitted('error')).toEqual([[error]])
    expect(spline.load).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})
