import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const projectRoot = resolve(process.cwd(), '../..')
const docsRoot = resolve(projectRoot, 'docs')
const registryPath = resolve(docsRoot, 'src/data/registry.ts')
const libComponentsRoot = resolve(projectRoot, 'packages/inspira-ui/src/components')

/**
 * 新文档站（design-reference 高保真 SPA）信息架构合约：
 * 1) 注册表与组件库真实导出一一对应（不虚构、不遗漏文档级组件）
 * 2) 每个注册项都有详情路由能力与真实演示（ComponentDemo 覆盖全部 slug）
 * 3) 示例代码一律 import 真实包名与产物 CSS
 * 4) 壳层满足滚动条零混乱与响应式断点
 */

async function readImportNames(): Promise<string[]> {
  const entries = await readdir(libComponentsRoot, { withFileTypes: true })
  const names: string[] = []
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const indexFile = resolve(libComponentsRoot, entry.name, 'index.ts')
    try {
      await stat(indexFile)
    } catch {
      continue
    }
    const source = await readFile(indexFile, 'utf8')
    for (const match of source.matchAll(/export const (Iu[A-Za-z0-9]+)\s*=/g)) {
      names.push(match[1]!)
    }
  }
  return names.sort()
}

/** 文档级组件 = 注册表条目（组合子组件不单列详情页） */
const EXPECTED_DOCS = [
  'IuShimmerButton',
  'IuInteractiveHoverButton',
  'IuRainbowButton',
  'IuGradientButton',
  'IuRippleButton',
  'IuCard3D',
  'IuCardSpotlight',
  'IuFlipCard',
  'IuGlareCard',
  'IuBentoGrid',
  'IuNumberTicker',
  'IuTypewriterText',
  'IuFlipWords',
  'IuTextGenerateEffect',
  'IuBlurReveal',
  'IuDialog',
  'IuAnimatedModal',
  'IuAnimatedTooltip',
  'IuMarquee',
  'IuStatistic',
  'IuAuroraBackground',
  'IuPatternBackground',
  'IuLetterPullup',
  'IuSpinningText',
  'IuBoxReveal',
  'IuLineShadowText',
  'IuHyperText',
  'IuEncryptedText',
  'IuMorphingText',
  'IuFocus',
  'IuColourfulText',
  'IuLetterSwap',
  'IuTextHighlight',
  'IuUnderlineText',
  'IuBorderBeam',
  'IuMeteors',
  'IuFlickeringGrid',
  'IuCompare',
  'IuLens',
  'IuAnimatedList',
  // —— 批次 3：扩展组件 ——
  'IuFloat',
  'IuSparkles',
  'IuSparklesText',
  'IuTextGlitch',
  'IuTextHoverEffect',
  'IuTextReveal',
  'IuRadiantText',
  'IuBreathingText',
  'IuRipple',
  'IuInteractiveGridPattern',
  'IuProgressiveBlur',
  'IuMultiStepLoader',
  'IuDirectionAwareHover',
  'IuNeonBorder',
  'IuFloatingCard',
  'IuContainerTextFlip',
  'IuIInput',
  'IuTimeline',
  'IuTracingBeam',
  // —— 批次 4：扩展组件 ——
  'IuGlowBorder',
  'IuGlowingEffect',
  'IuAnimatedCircularProgressBar',
  'IuAnimatedTabs',
  'IuImagesSlider',
  'IuConfetti',
  'IuContainerScroll',
  'IuTree',
  'IuDock',
  'IuLinkPreview',
  'IuBook',
  'IuLampEffect',
  'IuIPhone15ProMockup',
  'IuBalanceSlider',
  'IuAnimatedTestimonials',
  'IuCardStack',
  'IuImagesBadge',
  'IuHighlightText',
  'IuAnimateGrid',
  // —— 批次 5：扩展组件 ——
  'IuSmoothCursor',
  'IuWavyBackground',
  'IuVortex',
  'IuStarsBackground',
  'IuBlackHoleBackground',
  'IuFallingStarsBg',
  'IuSilkBackground',
  'IuSingularityBackground',
  'IuThunderstormBackground',
  'IuStractiumBackground',
  'IuSnowfallBg',
  'IuScrewText',
  'IuVariableText',
  'IuVariableLetterText',
  'IuScrollSwapText',
  'IuScratchToReveal',
  'IuMediaText',
  'IuPathMarquee',
  'IuVanishingInput',
  'IuSVGMask',
  'IuScales',
  'IuText3d',
  // —— 批次 6：扩展组件 ——
  'IuAnimatedBeam',
  'IuAppleCardCarousel',
  'IuCubeCarousel',
  'IuDesignTestimonials',
  'IuFeyCards',
  'IuFileUpload',
  'IuLogoOrigami',
  'IuSpringCalendar',
  'IuWarpBackground',
  'IuGlobe',
  'IuColorPicker',
  'IuTestimonialSlider',
  'IuMorphingTabs',
  'IuAnimatedLogoCloud',
  'IuIconLogoCloud',
  'IuStaticLogoCloud',
  'IuPhotoGallery',
  'IuExpandableGallery',
  'IuCircularGallery',
  'IuSafariMockup',
  'IuTextRevealCard',
  'IuTextScrollReveal',
  'IuVideoText',
  'IuHaloSearch',
  'IuParallaxFloat',
  'IuOrbit',
  'IuSleekLineCursor',
].sort()

describe('documentation information architecture (SPA redesign)', () => {
  it('registry entries exist as real exports in the library', async () => {
    const exported = await readImportNames()
    const registry = await readFile(registryPath, 'utf8')
    const listed = [...registry.matchAll(/importName: '(Iu[A-Za-z0-9]+)'/g)].map((m) => m[1]!).sort()
    // 注册表不得虚构：每个条目都必须是库的真实导出
    for (const name of listed) {
      expect(exported, `${name} 已注册但组件库未导出`).toContain(name)
    }
    // 文档级清单与合约基准一致（22 个）
    expect(listed).toEqual(EXPECTED_DOCS)
  })

  it('every registered component has a live demo binding', async () => {
    const registry = await readFile(registryPath, 'utf8')
    const demo = await readFile(resolve(docsRoot, 'src/components/ComponentDemo.vue'), 'utf8')
    const slugs = [...registry.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1]!)
    expect(slugs.length).toBe(EXPECTED_DOCS.length)
    for (const slug of slugs) {
      expect(demo, `ComponentDemo 缺少 ${slug} 的真实组件演示`).toContain(`'${slug}'`)
    }
  })

  it('generated demo code always imports the real package and compiled css', async () => {
    const registry = await readFile(registryPath, 'utf8')
    expect(registry).toContain("from 'inspira-ui-components'")
    expect(registry).toContain('dist/index.css')
    // 禁止编造不存在的安装命令
    expect(registry).not.toMatch(/npm install (?!inspira-ui-components)/)
  })

  it('keeps the shell free of nested visible scrollbars and horizontal overflow guards', async () => {
    const css = await readFile(resolve(docsRoot, 'src/styles/docs.css'), 'utf8')
    // 侧栏可滚动但滚动条隐藏（原型规则）
    expect(css).toMatch(/\.sidebar\s*{[^}]*scrollbar-width:\s*none/)
    // 响应式断点与原型一致
    expect(css).toContain('@media (max-width: 1250px)')
    expect(css).toContain('@media (max-width: 1020px)')
    expect(css).toContain('@media (max-width: 760px)')
    expect(css).toContain('@media (max-width: 480px)')
    expect(css).toContain('prefers-reduced-motion')
    // 页面主滚动归属 html/body，main 不做独立滚动宿主
    expect(css).not.toMatch(/\.doc-main\s*{[^}]*overflow-y:\s*(auto|scroll)/)
    expect(css).not.toMatch(/\.toc\s*{[^}]*overflow-y:\s*(auto|scroll)/)
  })

  it('routes cover home, guide, themes, catalog and every component slug', async () => {
    const router = await readFile(resolve(docsRoot, 'src/router.ts'), 'utf8')
    for (const path of ['/home', '/guide', '/themes', '/components', '/component/:slug']) {
      expect(router).toContain(`'${path}'`)
    }
    // 未知 slug 回到总览，不渲染虚构页面
    expect(router).toContain('getComponent')
  })

  it('header keeps truthful version and repository metadata', async () => {
    const registry = await readFile(registryPath, 'utf8')
    expect(registry).toContain("export const REPO_URL = 'https://github.com/Mayday4671/inspira-ui-components'")
    // 版本号来自库的真实导出，不硬编码虚构
    expect(registry).toContain("export { version as packageVersion } from 'inspira-ui-components'")
    const header = await readFile(resolve(docsRoot, 'src/components/AppHeader.vue'), 'utf8')
    expect(header).toContain('packageVersion')
  })
})
