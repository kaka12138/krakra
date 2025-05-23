import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';


export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // TypeScript配置
  tseslint.configs.recommended,
  tseslint.configs.stylistic,

  // Vue3配置
  pluginVue.configs['flat/essential'],
  pluginVue.configs['flat/strongly-recommended'],
  pluginVue.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
  },

  // 自定义规则
  {
    rules: {
      // 错误预防
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': 'off', // 由TypeScript处理
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Vue相关规则
      'vue/multi-word-component-names': 'warn',
      'vue/no-unused-components': 'warn',
      'vue/require-default-prop': 'warn',
      'vue/attributes-order': ['warn', {
        'order': [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      }],
      'vue/html-indent': ['warn', 2],
      'vue/max-attributes-per-line': ['warn', {
        'singleline': 3,
        'multiline': 1,
      }],

      // 格式规则
      'indent': ['warn', 2],
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-trailing-spaces': 'warn',
      'eol-last': 'warn',
    },
  },

  // 环境特定规则覆盖
  {
    files: ['**/*.{spec,test}.{ts,js}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'warn',
    },
  },
]);
