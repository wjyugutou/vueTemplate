import {
  defineConfig,
  // presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives, // @apply
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [

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
