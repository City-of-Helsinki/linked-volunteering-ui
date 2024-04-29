/* eslint-disable */
const theme = require('./bootstrap.scss');

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

export default {
  ...theme,
  breakpoint,
  maxWidth,
  colors: {
    lightGray: '#f7f7f7'
  }
};
