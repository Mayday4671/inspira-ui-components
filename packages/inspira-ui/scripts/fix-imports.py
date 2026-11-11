# 批次 3：自动检测并补齐 Nuxt auto-import 缺失的 vue API 导入
import os
import re

BASE = 'E:/My_Project/inspira-ui-components/packages/inspira-ui/src/components'
BATCH3 = [
    'float', 'sparkles', 'sparkles-text', 'text-glitch', 'text-hover-effect',
    'text-reveal', 'radiant-text', 'breathing-text', 'ripple',
    'interactive-grid-pattern', 'progressive-blur', 'multi-step-loader',
    'direction-aware-hover', 'neon-border', 'floating-card',
    'container-text-flip', 'input', 'timeline', 'tracing-beam',
]

VUE_APIS = [
    'ref', 'computed', 'watch', 'watchEffect', 'onMounted', 'onUnmounted',
    'onBeforeUnmount', 'nextTick', 'toRefs', 'useSlots', 'useAttrs',
    'useTemplateRef', 'useId', 'useIntervalFn', 'useResizeObserver',
    'useAnimationControls', 'useInView', 'useAnimate', 'stagger',
]
VUE_CORE = {'ref', 'computed', 'watch', 'watchEffect', 'onMounted', 'onUnmounted',
            'onBeforeUnmount', 'nextTick', 'toRefs', 'useSlots', 'useAttrs',
            'useTemplateRef', 'useId'}
VUEUSE = {'useIntervalFn', 'useResizeObserver', 'useAnimationControls'}
MOTION_V = {'useInView', 'useAnimate', 'stagger'}

changed = 0
for d in BATCH3:
    sdir = os.path.join(BASE, d, 'src')
    if not os.path.isdir(sdir):
        continue
    for f in os.listdir(sdir):
        if not f.endswith('.vue'):
            continue
        fp = os.path.join(sdir, f)
        src = open(fp, encoding='utf-8').read()

        # 检测缺失的 Vue API
        missing = []
        for api in VUE_APIS:
            # 查找调用（非导入）
            if re.search(r'(?<![\w\'"])\b' + api + r'\s*[(\[]', src) or re.search(r'\b' + api + r'\b(?!\s*[,;}])(?!\s*\))', src.split('<template')[0]):
                if "import {" not in src or not re.search(r'\b' + api + r'\b', re.search(r"import \{([^}]+)\} from 'vue'", src) or ''):
                    if api not in src.split('import ')[0]:  # 不在已有 import 中
                        # 更准确：检查 import 行
                        vue_import_match = re.search(r"import \{([^}]+)\} from ['\"]vue['\"]", src)
                        if vue_import_match:
                            imported = [x.strip() for x in vue_import_match.group(1).split(',')]
                            if api not in imported:
                                missing.append(api)
                        elif re.search(r"import \{([^}]+)\} from ['\"]@vueuse/core['\"]", src):
                            vueuse_match = re.search(r"import \{([^}]+)\} from ['\"]@vueuse/core['\"]", src)
                            imported = [x.strip() for x in vueuse_match.group(1).split(',')]
                            if api in VUEUSE and api not in imported:
                                missing.append(api)
                        else:
                            missing.append(api)
                        if api in MOTION_V:
                            mv_match = re.search(r"import \{([^}]+)\} from ['\"]motion-v['\"]", src)
                            if mv_match:
                                imported = [x.strip() for x in mv_match.group(1).split(',')]
                                if api not in imported:
                                    pass  # motion-v 的 API 在 Motion 组件本身
                            else:
                                pass

        if not missing:
            continue

        # 分离 Vue 核心 API 和 VueUse API
        vue_core_needed = sorted(set(a for a in missing if a in VUE_CORE))
        vueuse_needed = sorted(set(a for a in missing if a in VUEUSE))

        lines_to_add = []
        if vue_core_needed:
            lines_to_add.append("import { " + ', '.join(vue_core_needed) + " } from 'vue'")
        if vueuse_needed:
            lines_to_add.append("import { " + ', '.join(vueuse_needed) + " } from '@vueuse/core'")

        add_text = '\n'.join(lines_to_add) + '\n'

        # 在第一个 import 行之前插入
        first_import = src.find('import ')
        if first_import >= 0:
            # 找到第一个 import 行的开头
            line_start = src.rfind('\n', 0, first_import) + 1
            src = src[:line_start] + add_text + src[line_start:]
        else:
            src = add_text + src

        open(fp, 'w', encoding='utf-8', newline='').write(src)
        changed += 1
        print(f'{d}/{f}: added {add_text.strip()}')

print(f'fixed {changed} files')
