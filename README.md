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
  // 本身变量
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
  // color schema storage key
  readonly VITE_COLOR_SCHEMA_STORAGE_KEY: string
}
```

# 代码风格
使用 eslint + @antfu/eslint-config

# 请求
请求使用alova + fetchAdapter

# 样式
使用unocss
