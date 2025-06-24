import styled, { css } from 'styled-components';
import theme from '../config/theme';

const { breakpoint } = theme;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const breakpoints: any = Object.entries(breakpoint).reduce(
  (acc, [size, pixels]) => ({
    ...acc,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [size]: (args: any) => css`
      @media (min-width: ${pixels / 16}em) {
        ${css(args)};
      }
    `,
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
