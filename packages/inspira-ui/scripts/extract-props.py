# 为新批次组件自动拆分 Props 接口到普通 <script lang="ts"> 块（解决 dts TS4023）
# 原理：<script setup> 中的 interface 无法被 dts 命名导出；移入前置普通 script 块并加 export
import os
import re
import io

BASE = 'E:/My_Project/inspira-ui-components/packages/inspira-ui/src/components'
TARGETS = [
    'animated-list', 'border-beam', 'box-reveal', 'colourful-text', 'compare',
    'encrypted-text', 'flickering-grid', 'focus', 'lens', 'letter-pullup',
    'letter-swap', 'line-shadow-text', 'morphing-text', 'spinning-text',
    'text-highlight', 'underline-text',
]

# 各组件 Props 接口依赖的外部类型（人工核对）
TYPE_IMPORTS = {
    'animated-list': [],
    'border-beam': ["import type { HTMLAttributes } from 'vue'"],
    'box-reveal': ["import type { HTMLAttributes } from 'vue'"],
    'colourful-text': [],
    'compare': [],
    'encrypted-text': [],
    'flickering-grid': [],
    'focus': [],
    'lens': [],
    'letter-pullup': [],
    'letter-swap': ["import type { Transition } from 'motion-v'", "import type { HTMLAttributes } from 'vue'"],
    'line-shadow-text': [],
    'morphing-text': [],
    'spinning-text': ["import type { Transition, Variant } from 'motion-v'"],
    'text-highlight': [],
    'underline-text': [],
}

for slug in TARGETS:
    vue_path = None
    src_dir = os.path.join(BASE, slug, 'src')
    for f in os.listdir(src_dir):
        if f.endswith('.vue'):
            vue_path = os.path.join(src_dir, f)
            break
    if not vue_path:
        print(f'{slug}: no vue file, skip')
        continue

    src = io.open(vue_path, encoding='utf-8').read()
    # 已有普通 script 块的跳过
    if re.search(r'<script lang="ts">', src):
        print(f'{slug}: already has normal script, skip')
        continue

    # 找 interface XxxProps 块（含前导注释行）
    m = re.search(r'((?:^//[^\n]*\n)*)^(interface \w+Props\s*(?:extends [\w\s,]+?)?\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\})', src, re.MULTILINE | re.DOTALL)
    if not m:
        print(f'{slug}: no Props interface found, skip')
        continue

    comment = m.group(1) or ''
    iface = m.group(2)
    iface_name = re.match(r'interface (\w+)', iface).group(1)

    imports = TYPE_IMPORTS.get(slug, [])
    import_lines = '\n'.join(imports)

    normal_script = f'<script lang="ts">\n{import_lines}\n\n{comment}export {iface}\n</script>\n'

    # 从 setup script 中移除 interface（及注释）
    src = src.replace(m.group(0), '', 1)
    # 在 <script setup> 前插入普通 script 块
    src = src.replace('<script lang="ts" setup>', normal_script + '\n<script lang="ts" setup>', 1)

    io.open(vue_path, 'w', encoding='utf-8', newline='\n').write(src)
    print(f'{slug}: interface {iface_name} extracted')
