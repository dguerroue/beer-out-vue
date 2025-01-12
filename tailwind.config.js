import tailwindFormsPlugin from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#fefde8',
          '100': '#fffec2',
          '200': '#fffa87',
          '300': '#ffef43',
          '400': '#ffde0a',
          '500': '#efc603',
          '600': '#ce9a00',
          '700': '#a46e04',
          '800': '#88550b',
          '900': '#734610',
          '950': '#432405',
        },
      }
    },
  },
  plugins: [
    /**
     * add initial state to class, allow to override it
     * src: https://dev.to/saifobeidat/override-tailwind-classes-of-a-reusable-vue-component-without-using-props-660
     */
    function ({ addVariant }) {
      addVariant("initial", "html :where(&)");
    },
    tailwindFormsPlugin,
  ],
}

