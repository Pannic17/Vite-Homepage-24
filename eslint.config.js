import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  {ignores:['dist/**','**/*.local/**','.baseline-dist/**','docs/**','public/**','playwright-report/**','test-results/**','**/*-snapshots/**']},
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {files:['**/*.{js,mjs,vue}'], languageOptions:{ecmaVersion:'latest',sourceType:'module'}, rules:{
    'no-unused-vars':['error',{argsIgnorePattern:'^_',varsIgnorePattern:'^_',caughtErrors:'none'}],
    'vue/multi-word-component-names':'off',
  }},
  // Browser automation scripts contain callbacks evaluated in the page.
  {files:['src/**/*.{js,vue}','tests/e2e/**/*.js','scripts/*.mjs'],languageOptions:{globals:globals.browser}},
  {files:['*.js','scripts/**/*.mjs','tests/**/*.js'],languageOptions:{globals:globals.node}},
];
