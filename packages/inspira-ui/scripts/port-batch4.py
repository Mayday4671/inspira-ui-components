# 批次 4 移植：cn 路径修正 + Nuxt auto-import 补齐（vue/vueuse/motion-v/motion-dom）
import os, re, io

BASE = 'E:/My_Project/inspira-ui-components/packages/inspira-ui/src/components'
BATCH4 = ['glow-border', 'glowing-effect', 'animated-circular-progressbar', 'animated-tabs',
          'images-slider', 'confetti', 'container-scroll', 'file-tree', 'dock', 'link-preview',
          'book', 'lamp-effect', 'iphone-mockup', 'balance-slider', 'animated-testimonials',
          'card-stack', 'images-badge', 'highlight-text', 'animate-grid']

VUE_CORE = {'ref','computed','reactive','watch','watchEffect','watchPostEffect','onMounted','onUnmounted',
            'onBeforeUnmount','onBeforeMount','nextTick','toRefs','toRef','unref','useSlots','useAttrs',
            'useTemplateRef','useId','defineEmits','withDefaults','onBeforeUpdate','onUpdated','shallowRef','mergeProps'}
VUEUSE = {'useIntervalFn','useResizeObserver','useEventListener','useTimeoutFn','useRafFn','useMediaQuery','useDebounceFn','useThrottleFn','useVModel'}
MOTION_V = {'Motion','useInView','useAnimate','useMotionValue','useSpring','useTransform','useScroll','useAnimationFrame','useMotionTemplate','useVelocity','useMotionValueEvent','AnimatePresence','useAnimationControls','stagger','useTime','useReducedMotion'}
MOTION_DOM = {'animate'}

def imports_needed(src):
    need_vue, need_vueuse, need_mv, need_md = set(), set(), set(), set()
    # 只扫描 script 区（第一个 <script 到最后一个 </script>）
    scripts = ' '.join(re.findall(r'<script[^>]*>([\s\S]*?)</script>', src))
    # 去掉 import 语句本身与字符串，避免误判（宽松处理足够）
    body = re.sub(r"^import[^\n]*$", '', scripts, flags=re.MULTILINE)
    for name in VUE_CORE:
        if re.search(r'\b' + name + r'\b', body): need_vue.add(name)
    for name in VUEUSE:
        if re.search(r'\b' + name + r'\b', body): need_vueuse.add(name)
    for name in MOTION_V:
        if re.search(r'\b' + name + r'\b', body): need_mv.add(name)
    for name in MOTION_DOM:
        if re.search(r'\b' + name + r'\b', body): need_md.add(name)
    # defineProps/withDefaults/defineEmits/defineOptions 是编译器宏，不需要导入
    need_vue -= {'defineProps','defineEmits','defineOptions','withDefaults','defineModel','defineExpose'}
    return need_vue, need_vueuse, need_mv, need_md

def ensure_imports(src):
    need_vue, need_vueuse, need_mv, need_md = imports_needed(src)
    inserts = []
    if need_vue:
        # 已有的 vue import 合并
        m = re.search(r"import \{([^}]*)\} from ['\"]vue['\"]", src)
        have = set(re.findall(r'\w+', m.group(1))) if m else set()
        miss = need_vue - have
        if miss:
            names = ', '.join(sorted(miss))
            if m:
                src = src.replace(m.group(0), "import { " + ', '.join(sorted(have | miss)) + " } from 'vue'")
            else:
                inserts.append("import { " + names + " } from 'vue'")
    if need_vueuse:
        inserts.append("import { " + ', '.join(sorted(need_vueuse)) + " } from '@vueuse/core'")
    if need_mv:
        inserts.append("import { " + ', '.join(sorted(need_mv)) + " } from 'motion-v'")
    if need_md:
        inserts.append("import { " + ', '.join(sorted(need_md)) + " } from 'motion-dom'")
    if inserts:
        # 插到第一个 <script...> 开标签后
        m = re.search(r'(<script[^>]*>\n)', src)
        src = src.replace(m.group(1), m.group(1) + '\n'.join(inserts) + '\n', 1)
    return src

for d in BATCH4:
    sdir = os.path.join(BASE, d, 'src')
    for f in os.listdir(sdir):
        if not f.endswith('.vue'): continue
        fp = os.path.join(sdir, f)
        src = io.open(fp, encoding='utf-8').read()
        orig = src
        # 1) cn 路径
        src = src.replace("from '@inspira-ui/plugins'", "from '../../../utils'")
        # 2) auto-import 补齐
        src = ensure_imports(src)
        if src != orig:
            io.open(fp, 'w', encoding='utf-8', newline='').write(src)
            print(f'fixed: {d}/{f}')
print('port-batch4-done')
