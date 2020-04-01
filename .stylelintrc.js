module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-airbnb',
    'stylelint-config-recess-order',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
}