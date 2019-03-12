import styled, { css } from 'styled-components';
import theme from '../config/theme';

const { breakpoint } = theme;

const breakpoints = Object.entries(breakpoint).reduce(
  (acc, [size, pixels]) => ({
    ...acc,
    [size]: (...args) => css`
      @media (min-width: ${pixels / 16}em) {
        ${css(...args)};
      }
    `
  }),
  {}
);

export const ShowOnTablet = styled.div`
  display: none;
  ${breakpoints.md`
    display:initial;
  `}
`;

export default breakpoints;
