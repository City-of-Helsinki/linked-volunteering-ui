import React from 'react';
import { Label } from 'reactstrap';
import styled, { css } from 'styled-components';

const StyledLabel = styled(Label)`
  font-weight: 600;

  ${props =>
    props.required &&
    css`
      &::after {
        content: '*';
        margin-left: 0.25ch;
      }
    `};
`;

export default ({ htmlFor, required, children }) => (
  <StyledLabel htmlFor={htmlFor} required={required}>
    {children}
  </StyledLabel>
);
