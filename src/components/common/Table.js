import styled, { css } from 'styled-components';

export const Th = styled.th`
  padding: ${props => (props.large ? '1em 1em' : '0.5em 1em')};
`;

export const Td = styled.td`
  padding: ${props => (props.large ? '1em 1em' : '0.5em 1em')};
`;

export const FirstTd = styled.td`
  background: ${props => (props.selected ? 'orange' : 'none')};
  width: 5px;
`;

export const TrRow = styled.tr`
  ${props => {
    if (props.selected) {
      return css`
        background-color: #ebebeb;
      `;
    }
    return css`
      &:nth-of-type(2n + 1) {
        background-color: #fafafa;
      }
      &:nth-of-type(2n) {
        background-color: #ffffff;
      }
    `;
  }}
`;

export const Table = styled.table`
  width: 100%;
`;
