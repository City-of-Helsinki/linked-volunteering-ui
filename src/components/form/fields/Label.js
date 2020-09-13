import classNames from 'classnames';
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
  &.srOnly {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default props => {
  const { children, htmlFor, required, srOnly = false } = props;

  return (
    <StyledLabel className={classNames(srOnly && 'srOnly')} htmlFor={htmlFor} required={required}>
      {children}
    </StyledLabel>
  );
};
