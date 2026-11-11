# 批次 4：把 <script setup> 中的顶层 interface/type 声明移到前置普通 script 块并导出（解决 dts TS4023）
import io, os, re

BASE = 'E:/My_Project/inspira-ui-components/packages/inspira-ui/src/components'
FILES = [
    'fluid-cursor/src/FluidCursor.vue',
    'html-ascii/src/HtmlAscii.vue',
    'html-blaze/src/HtmlBlaze.vue',
    'html-chromatic/src/HtmlChromatic.vue',
    'html-cloth/src/HtmlCloth.vue',
    'html-drag/src/HtmlDrag.vue',
    'html-in-canvas/src/HtmlInCanvas.vue',
    'html-liquid/src/HtmlLiquid.vue',
    'image-trail-cursor/src/ImageTrailCursor.vue',
    'liquid-glass/src/LiquidGlass.vue',
    'liquid-logo/src/LiquidLogo.vue',
    'particle-image/src/ParticleImage.vue',
    'particles-bg/src/ParticlesBg.vue',
]

def find_block(src, start_tag):
    i = src.find(start_tag)
    if i < 0: return None
    open_end = i + len(start_tag)
    j = src.find('</script>', open_end)
    return (i, open_end, j)

for rel in FILES:
    fp = os.path.join(BASE, rel)
    src = io.open(fp, encoding='utf-8').read()
    if re.search(r'<script lang="ts">', src):
        print(f'{rel}: already has normal script, skip')
        continue
    # 定位 setup 块（任意属性顺序）
    m = re.search(r'<script[^>]*\bsetup\b[^>]*>', src)
    if not m:
        print(f'{rel}: no setup block?!')
        continue
    setup_open = m.group(0)
    setup_start = m.end()
    setup_end = src.find('</script>', setup_start)
    setup_body = src[setup_start:setup_end]

    # 提取顶层 interface/type 声明（花括号配平）
    decls = []
    type_imports = []
    rest_lines = []
    lines = setup_body.split('\n')
    i = 0
    while i < len(lines):
        ln = lines[i]
        stripped = ln.strip()
        m2 = re.match(r'(export\s+)?(interface\s+(\w+[^{]*)\{|type\s+(\w+)\s*=)', stripped)
        if m2 and not stripped.startswith(('*','//')):
            # 收集到块结束（interface 用花括号配平；type 以行数启发：分号结尾或空行）
            block = [ln]
            if '{' in stripped:
                depth = stripped.count('{') - stripped.count('}')
                while depth > 0 and i + 1 < len(lines):
                    i += 1
                    block.append(lines[i])
                    depth += lines[i].count('{') - lines[i].count('}')
            else:
                while i + 1 < len(lines) and not lines[i].rstrip().endswith((';', '}', '`')):
                    i += 1
                    block.append(lines[i])
            decls.append('\n'.join(block))
        elif re.match(r'import\s+type\s', stripped) or re.match(r'import\s+\{[^}]*\}\s*from\s*[\'"][^\'"]*[\'"]\s*;', stripped) and ' type ' in stripped:
            type_imports.append(ln)
        else:
            rest_lines.append(ln)
        i += 1

    if not decls:
        print(f'{rel}: no top-level type decls found, skip')
        continue

    # 组装普通 script 块：类型导入 + 导出的声明
    exported = []
    for d in decls:
        if d.lstrip().startswith('export'):
            exported.append(d)
        else:
            exported.append('export ' + d.lstrip())
    normal = '<script lang="ts">\n' + '\n'.join(type_imports) + '\n\n' + '\n\n'.join(exported) + '\n</script>\n\n'

    new_setup_body = '\n'.join(rest_lines)
    new_src = src[:setup_start] + new_setup_body + src[setup_end:]
    # 插入普通块
    new_src = new_src.replace(setup_open, normal + setup_open, 1)
    io.open(fp, 'w', encoding='utf-8', newline='').write(new_src)
    print(f'{rel}: moved {len(decls)} decl(s), {len(type_imports)} type import(s)')
print('extract-batch7a-done')
