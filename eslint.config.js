import pluginVue from 'eslint-plugin-vue'
import pluginTailwindCSS from 'eslint-plugin-tailwindcss'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import pluginCypress from 'eslint-plugin-cypress/flat'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}'
    ],
  },
  ...vueTsEslintConfig(),
  ...pluginVue.configs['flat/recommended'],
  ...pluginTailwindCSS.configs['flat/recommended'],
  {
    rules: {
      // typescript-eslint
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      // vue
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": 3
        }
      }],
      // tailwindcss
      'tailwindcss/no-custom-classname': 'off',
    }
  },
]
