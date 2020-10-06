module.exports = {
  root: true,
  env: {
    node: true
  },
  // 使用插件的编码规则,使用哪种规则去执行代码检查
  /**
   * extends:使用 standard 需要安装相关依赖
   *  @vue/eslint-config-standard, eslint-plugin-standard, eslint-plugin-promise, eslint-plugin-import, eslint-plugin-node
   */
  extends: [
    /**
     * plugin:vue/essential 对应的是 eslint-plugin-vue
     * 官网: https://eslint.vuejs.org/
     * This plugin allows us to check the <template> and <script> of .vue files with ESLint.
     * Finds syntax errors.
     * Finds the wrong use of Vue.js Directives.
     * Finds the violation for Vue.js Style Guide
     */
    'plugin:vue/essential',
    /**
     * '@vue/standard 对应的包是: @vue/eslint-config-standard
     */
    '@vue/standard',
    /**
     * @vue/typescript/recommended 对应的包是: @vue/eslint-config-typescript
     */
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // 自定义编码校验规则
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: true
      }
    }]
  }
}
