# 精确清理：删除 setup script 块中的重复 import type 行
# 并将 normal script 引用但 setup 定义的类型移到 normal script
import io
import os
import re

BASE = 'E:/My_Project/inspira-ui-components/packages/inspira-ui/src/components'
DIRS = [
    'breathing-text', 'float', 'interactive-grid-pattern', 'neon-border',
    'progressive-blur', 'ripple', 'sparkles-text', 'sparkles',
    'text-glitch', 'text-hover-effect', 'text-reveal', 'timeline',
    'multi-step-loader', 'direction-aware-hover', 'letter-swap',
    'text-highlight', 'underline-text', 'colourful-text', 'compare',
    'encrypted-text', 'morphing-text', 'animated-list',
]

for d in DIRS:
    sdir = os.path.join(BASE, d, 'src')
    if not os.path.isdir(sdir):
        continue
    for f in os.listdir(sdir):
        if not f.endswith('.vue'):
            continue
        fp = os.path.join(sdir, f)
        src = io.open(fp, encoding='utf-8').read()

        # 定位 setup script 块
        setup_tag = None
        for tag in ['<script lang="ts" setup>', '<script setup lang="ts">']:
            idx = src.find(tag)
            if idx >= 0:
                setup_tag = tag
                setup_start = idx
                break
        if setup_tag is None:
            continue

        # 在 setup 块之前找到 normal script 的结束
        # setup 块之前的内容 = normal script + 其它

        # 步骤 1: 删除 setup 块中的 import type 行
        setup_end = src.find('</script>', setup_start + len(setup_tag))
        setup_content = src[setup_start:setup_end + len('</script>')]

        # 找到 setup 块内的 import type 行并移除
        cleaned_setup = re.sub(
            r"import type \{[^}]+\} from '(?:vue|motion-v)';?\n?",
            '',
            setup_content,
        )
        if cleaned_setup != setup_content:
            src = src[:setup_start] + cleaned_setup + src[setup_end + len('</script>'):]

        # 步骤 2: 找 setup 块中定义但 normal script 引用的类型定义，移到 normal script 块
        # 例如 type StaggerOrigin = ... 在 setup 块中但 Props 里引用
        # 简化处理：找到 setup 块中的 type Xxx = 声明，如果 normal 块的 Props 引用了它，移到 normal 块
        # 先重新读取（因为可能已修改）
        src = io.open(fp, encoding='utf-8').read()

        normal_end = src.find(setup_tag)
        normal_part = src[:normal_end] if normal_end >= 0 else src
        setup_part2 = src[normal_end:] if normal_end >= 0 else ''

        # 找 setup 块中的 type 声明
        type_decls = re.findall(r'(?:^|\n)(type \w+ = [^\n]+)', setup_part2)
        for type_decl in type_decls:
            type_name = re.match(r'type (\w+)', type_decl).group(1)
            # 检查 normal script 是否引用了该类型
            if type_name in normal_part:
                # 从 setup 中移除定义
                setup_part2 = setup_part2.replace(type_decl + '\n', '')
                # 添加到 normal script 块
                # 找 normal script 块的 export interface 行前面插入
                src = src[:normal_end] + '\n'.join([
                    '', type_decl
                ]) + '\n' + src[normal_end:]

        if type_decls:
            io.open(fp, 'w', encoding='utf-8', newline='').write(src)

print('type-import-cleanup-done')
