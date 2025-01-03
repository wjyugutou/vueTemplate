import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

// export default defineConfig(({ mode }) => {
export default defineConfig(() => {
  // const env = loadEnv(mode, './env') as ImportMetaEnv

  return {
    envDir: './env',
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      Vue(),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
      // https://uvr.esm.is/
      VueRouter({
        exclude: ['src/pages/auth/**'],
        dts: './types/vue-router.d.ts',
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'pinia',
          '@vueuse/core',
          VueRouterAutoImports,
        ],
        dts: './types/auto-imports.d.ts',
        dirs: [
          './src/hooks',
          './src/store',
          './src/utils',
          './src/api',
        ],
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: './types/components.d.ts',
      }),

    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
        ],
      },
    },
  }
})
