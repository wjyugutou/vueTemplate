import type { EditableTreeNode } from 'unplugin-vue-router'
import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import Compression from 'vite-plugin-compression'

/**
 * mode: 'development' | 'production'
 */
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
        dts: './types/vue-router.d.ts',
        extendRoute(r) {
          function getRouteInfo(route: EditableTreeNode) {
            console.log({
              parent: {
                path: route.parent?.path,
                name: route.parent?.name,
                meta: route.parent?.meta,
                component: route.parent?.component,
              },
              path: route.path,
              name: route.name,
              meta: route.meta,
              component: route.component,
            })
            if (route.children) {
              route.children.forEach(getRouteInfo)
            }
          }
          getRouteInfo(r)
        },
      }),
      // ⚠️ Vue must be placed after VueRouter()
      Vue(),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
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

      // gzip
      env.VITE_BUILD_GZIP === 'true' && mode === 'production' && Compression({
        verbose: true, // 输出压缩日志
        disable: false, // 是否禁用压缩
        threshold: 10240, // 对超过10KB的文件进行压缩
        algorithm: 'gzip', // 使用gzip压缩
        ext: '.gz', // 压缩后文件的扩展名
        deleteOriginFile: false,
      }),
    ],
  }
})
