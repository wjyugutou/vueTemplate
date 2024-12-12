import antfu from '@antfu/eslint-config'

export default antfu({
  toml: false,
  yaml: false,
  test: false,
  jsx: false,
  unocss: true,
}, [
  {
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['*.vue'],
    rules: {
      // 关闭，可使 对象/数组 自由换行
      'antfu/consistent-list-newline': 'off',
      // vue template标签不自动换行
      'vue/singleline-html-element-content-newline': [0],
      // 组件名称 书写方式 自动修复为PascalCase
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
        // 为false检查全部组件，true 检查注册组件（对unplugin-vue-components无效），
          registeredComponentsOnly: false,
          ignores: [],
        },
      ],
    },
  },
  {
    files: ['tsconfig.json', 'tsconfig.*.json'],
    rules: {
      // tsconfig.json中的key值排序
      'sort-keys': 'off',
    },
  },
])
