## 项目背景

本项目是一个vue3的前端项目，使用vite作为构建工具，使用pinia作为状态管理工具，使用unplugin-vue-router作为路由管理工具，使用unocss作为样式管理工具。

## 项目技术栈包括：
- Vue 3
- TypeScript
- Composition API (`setup` 语法)
- VueUse
- Alova（轻量级请求库）使用`adapterFetch`
- Pinia（状态管理）

## 参考资料

- [Vue.js](https://v3.cn.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.esm.dev/)
- [unplugin-vue-router](https://uvr.esm.is/)
- [unocss](https://unocss.com/)
- [vueuse](https://vueuse.org/)
- [alova](https://alova.dev/)

## 代码风格

### 1. 语法规范
- 使用 Vue 3 的 Composition API 和 `setup` 语法。
- 使用 TypeScript 类型注解。
- 组件文件名使用 PascalCase，如 `UserList.vue`。
- 变量和函数命名使用 camelCase。
- 使用eslint规则格式化代码
- eslint规则使用 eslint.config.mjs 文件中的配置
- 避免使用`any` 类型，尽量使用 `unknown` 或 `never`。
- 确保所有异步操作都使用 `async/await`。
- 生成代码时，尽量注释代码，使用esnext的语法。
- api目录下的api函数命名使用驼峰命名,请求方式 + 模块 + Api,例如:getListAlarmApi

### 2. 组件结构
- 组件文件名使用 PascalCase，如 `UserList.vue`。
- 每个组件应包含 `<template>`、`<script setup>` 和 `<style>` 部分。
- 使用 `defineProps` 和 `defineEmits` 定义组件的 props 和事件。

## git提交信息格式
- 使用中文
- 提交信息包括三个部分:Header,Body 和 Footer。
- 其中,Header 是必需的,Body 和 Footer 可以省略。
  - Header
    Header部分只有一行,包括俩个字段:type（必需）和subject（必需）。
    其中,type用于说明 commit 的类别,可以使用如下类别:
    - feat: 新功能（feature）
    - fix: 修补bug
    - doc: 文档（documentation）
    - style: 格式（不影响代码运行的变动）
    - refactor: 重构（即不是新增功能,也不是修改bug的代码变动）
    - test: 增加测试
    - chore: 构建过程或辅助工具的变动
    - build: 构造工具的或者外部依赖的改动,例如webpack,npm
  - subject
    subject是 commit 目的的简短描述。
    - 以动词开头,使用第一人称现在时,比如change,而不是changed或changes
    - 第一个字母小写
    - 结尾不加句号（。）
  - Body
    Body 部分是对本次 commit 的详细描述,可以分成多行。下面是一个范例。

```markdown
    feat: 添加了分享功能

    - 添加分享到微博功能
    - 添加分享到微信功能
    - 添加分享到朋友圈功能

    Issue #1, #2
    Close #1
```
