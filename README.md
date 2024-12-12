# Node 版本

## Node >= 18

# 插件

路由 [unplugin-vue-router](https://uvr.esm.is/)
自动导入方法/hooks [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
自动注册组件 [unplugin-vue-components](https://github.com/antfu/vite-plugin-components)

# ENV
env 类型 写在 `types/vite-env.d.ts`
```ts
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}
```
