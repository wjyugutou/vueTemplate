import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig, loadEnv } from 'vite'

// export default defineConfig(() => {
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './env') as ImportMetaEnv

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
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      // https://uvr.esm.is/
      VueRouter({
        exclude: ['src/pages/auth/**'],
        dts: './types/vue-router.d.ts',
      }),
      // ⚠️ Vue must be placed after VueRouter()
      Vue(),
      // https://tailwind.org.cn/
      tailwindcss(),
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
