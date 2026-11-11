# 批次 5：cn 路径（含双引号）+ Nuxt auto-import 补齐 + 同模块导入合并（一次到位）
import os, re, io

BASE = 'E:/My_Project/inspira-ui-components/packages/inspira-ui/src/components'
BATCH = ["animated-beam","apple-card-carousel","cube-carousel","design-testimonials","fey-cards","file-upload","logo-origami","spring-calendar","warp-background","globe","color-picker","testimonial-slider","morphing-tabs","logo-cloud","photo-gallery","expandable-gallery","circular-gallery","safari-mockup","text-reveal-card","text-scroll-reveal","video-text","halo-search","parallax-float","orbit","sleek-line-cursor"]

VUE_CORE = {'ref','computed','reactive','watch','watchEffect','watchPostEffect','onMounted','onUnmounted',
            'onBeforeUnmount','onBeforeMount','onScopeDispose','nextTick','toRefs','toRef','unref','useSlots','useAttrs',
            'useTemplateRef','useId','shallowRef','mergeProps','markRaw','defineAsyncComponent','h'}
VUEUSE = {'useIntervalFn','useResizeObserver','useEventListener','useTimeoutFn','useRafFn','useMediaQuery',
          'useDebounceFn','useThrottleFn','useVModel','useMouse','useMouseInElement','useElementBounding',
          'useWindowSize','useScroll','useDevicePixelRatio','useSwipe','onKeyStroke','useTransition','useNow','useTimestamp'}
MOTION_V = {'Motion','AnimatePresence','useInView','useAnimate','useMotionValue','useSpring','useTransform',
            'useScroll','useAnimationFrame','useMotionTemplate','useVelocity','useMotionValueEvent',
            'useAnimationControls','stagger','useTime','useReducedMotion','useMotionValueEvent'}

# 词边界精确扫描，跳过字符串与注释内容
def strip_noisy(code):
    code = re.sub(r'`[^`]*`', '', code)       # 模板串
    code = re.sub(r"'[^'\n]*'", '', code)     # 单引号串
    code = re.sub(r'"[^"\n]*"', '', code)     # 双引号串
    code = re.sub(r'//[^\n]*', '', code)
    return code

def analyze(src):
    scripts = ' '.join(re.findall(r'<script[^>]*>([\s\S]*?)</script>', src))
    body = re.sub(r'^import[\s\S]*?;[^\S\n]*\n', '', scripts, flags=re.MULTILINE)
    body = strip_noisy(body)
    need = {'vue': set(), '@vueuse/core': set(), 'motion-v': set()}
    for name in VUE_CORE:
        if re.search(r'(?<![.\w])' + name + r'\b', body): need['vue'].add(name)
    for name in VUEUSE:
        if re.search(r'(?<![.\w])' + name + r'\b', body): need['@vueuse/core'].add(name)
    for name in MOTION_V:
        if re.search(r'(?<![.\w])' + name + r'\b', body): need['motion-v'].add(name)
    need['vue'] -= {'defineProps','defineEmits','defineOptions','withDefaults','defineModel','defineExpose'}
    return need

for d in BATCH:
    sdir = os.path.join(BASE, d, 'src')
    for f in os.listdir(sdir):
        if not f.endswith(('.vue', '.ts')) or f.endswith('.d.ts'): continue
        fp = os.path.join(sdir, f)
        src = io.open(fp, encoding='utf-8').read()
        orig = src
        # cn 路径（两种引号）
        src = src.replace("from '@inspira-ui/plugins'", "from '../../../utils'").replace('from "@inspira-ui/plugins"', "from '../../../utils'")
        # 补齐缺失导入（先看已有合并集合）
        need = analyze(src)
        have = {m: set() for m in need}
        for m in re.finditer(r"import \{([^}]*)\} from ['\"](vue|@vueuse/core|motion-v)['\"]", src, re.DOTALL):
            have[m.group(2)] |= {x.strip() for x in m.group(1).split(',') if x.strip()}
        inserts = []
        for mod, names in need.items():
            miss = names - have[mod]
            if miss:
                inserts.append(f"import {{ {', '.join(sorted(miss))} }} from '{mod}'")
        if inserts:
            m = re.search(r'<script[^>]*>\n', src)
            src = src[:m.end()] + '\n'.join(inserts) + '\n' + src[m.end():]
        if src != orig:
            io.open(fp, 'w', encoding='utf-8', newline='').write(src)
            print('fixed:', f'{d}/{f}')
print("port-batch6-done")
