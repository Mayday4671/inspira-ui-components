<script setup>
import Demo from '../examples/typewriter-text/basic.vue'
import DemoSource from '../examples/typewriter-text/basic.vue?raw'
</script>

# TypewriterText 打字机文本

逐字打出文本的打字机效果，支持多段轮播与自定义光标。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="打字机示例" />

## 属性

| 名称                    | 说明                                       | 类型        | 默认值   |
| ----------------------- | ------------------------------------------ | ----------- | -------- |
| text                    | 文本；传数组则多段轮播                     | `string \| string[]` | —        |
| as                      | 渲染的标签                                 | `string`    | `div`    |
| speed                   | 打字速度（毫秒/字符）                      | `number`    | `50`     |
| initialDelay            | 首次开始前延迟（毫秒）                     | `number`    | `0`      |
| waitTime                | 打完一段后的停留时间（毫秒）               | `number`    | `2000`   |
| deleteSpeed             | 删除速度（毫秒/字符）                      | `number`    | `30`     |
| loop                    | 多段文本是否循环                           | `boolean`   | `true`   |
| showCursor              | 是否显示光标                               | `boolean`   | `true`   |
| hideCursorOnType        | 打字过程中隐藏光标                         | `boolean`   | `false`  |
| cursorChar              | 光标字符                                   | `string`    | `\|`     |
| cursorClass             | 光标类名                                   | `string`    | `ml-1`   |
| cursorAnimationVariants | 光标动画（motion-v variants）              | `object`    | 闪烁动画 |
| class                   | 根元素类名（合并）                         | `string`    | —        |
| reducedMotion           | 减少动效策略                               | `'system' \| 'always' \| 'never'` | `system` |

## 实例方法

`play()`、`pause()`、`restart()` 用于控制播放。
