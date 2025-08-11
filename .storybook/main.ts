import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-jest"
  ],
  framework: "@storybook/nextjs",
  "staticDirs": [
    "..\\public"
  ]
};
export default config;