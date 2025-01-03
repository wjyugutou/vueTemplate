import {
  defineConfig,
  // presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives, // @apply
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      'primary': 'var(--color-primary)',
      'primary-hover': 'var(--color-primary-hover)',
    },
  },
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['btn', 'text-white px-2 py-1 rounded inline-block bg-primary hover:bg-primary-hover cursor-pointer'],
  ],
  presets: [
    presetUno(),
    // presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
