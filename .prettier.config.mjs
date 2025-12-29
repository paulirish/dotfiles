/**
 * FYI "Prettier intentionally doesn’t support any kind of global configuration." so copy and adapt for each project.
 *
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 160,
  tabWidth: 2,
  singleQuote: true,
  // trailingComma: 'es5',
  bracketSpacing: false,
  arrowParens: 'avoid',
};

export default config;
