import type { Options } from '@vitejs/plugin-vue'

// Mark component DOM even when it is rendered under a Teleport target.
// Native elements and Motion wrappers accept the marker as an HTML attribute.
export const vueOptions: Options = {
  template: {
    compilerOptions: {
      nodeTransforms: [
        (node, context) => {
          const filename = context.filename.replace(/\\/g, '/')
          if (!filename.includes('/packages/inspira-ui/src/components/')) return
          if (node.type !== 1 || node.tagType > 1) return
          if (node.tagType === 1 && !/^(component|Motion|motion\..+)$/.test(node.tag)) return

          node.props.push({
            type: 6,
            name: 'data-iu',
            value: undefined,
            nameLoc: node.loc,
            loc: node.loc,
          })
        },
      ],
    },
  },
}
