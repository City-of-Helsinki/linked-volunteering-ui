/* eslint-disable */
require('./bootstrap.scss');
const extractedTheme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./theme.scss');
/* eslint-enable */

const breakpoint = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

const maxWidth = Object.entries(breakpoint).reduce((acc, [size, pixels]) => ({
  ...acc,
  [size]: `${pixels / 16}em`
}));
console.debug(extractedTheme);

export default {
  ...extractedTheme,
  breakpoint,
  maxWidth,
  colors: {
    lightGray: '#f7f7f7'
  }
};
