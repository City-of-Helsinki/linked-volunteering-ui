import bootstrapTheme from './bootstrap.module.scss';

const breakpoint = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const maxWidth = Object.entries(breakpoint).map(([size, pixels]) => ({
  [size]: `${pixels / 16}em`,
}));

export default {
  ...bootstrapTheme,
  breakpoint,
  maxWidth,
  colors: {
    lightGray: '#f7f7f7',
  },
};
