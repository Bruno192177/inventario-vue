import { defineConfig } from 'eslint-define-config'
import vue from 'eslint-plugin-vue'
import js from '@eslint/js'
import globals from 'globals'

export default defineConfig([
  {
    name: 'core',
    ignores: [
      'dist',
      'dist-ssr',
      'coverage',
    ],
  },

  {
    files: ['**/*.{js,jsx,mjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },

    plugins: {
      vue,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...vue.configs['vue3-essential'].rules,
    },
  },

  // Opcional: no formatear con eslint (si usas Prettier)
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
])