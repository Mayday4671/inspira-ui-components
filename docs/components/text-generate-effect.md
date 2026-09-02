<script setup>
import Demo from '../examples/text-generate-effect/basic.vue'
import DemoSource from '../examples/text-generate-effect/basic.vue?raw'
</script>

# TextGenerateEffect 文本生成

逐词从模糊到清晰显现的文本生成效果。

## 基础用法

<DemoBlock :demo="Demo" :code="DemoSource" title="文本生成示例" />

## 属性

| 名称     | 说明                          | 类型      | 默认值 |
| -------- | ----------------------------- | --------- | ------ |
| words    | 要显示的文本                  | `string`  | —      |
| filter   | 是否启用模糊过渡              | `boolean` | `true` |
| duration | 每个词的过渡时长（秒）        | `number`  | `0.7`  |
| delay    | 首个词出现前的延迟（毫秒）    | `number`  | `0`    |
| class    | 根元素类名（合并）            | `string`  | —      |
| reducedMotion | 减少动效策略              | `'system' \| 'always' \| 'never'` | `system` |

## 实例方法

`restart()` 重新播放文本生成效果。
