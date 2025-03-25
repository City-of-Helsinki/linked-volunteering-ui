import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { Label } from 'reactstrap';
import styled, { css } from 'styled-components';

const StyledLabel = styled(Label)<{ required: boolean; className: string }>`
  font-weight: 600;

  ${(props) =>
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

type LabelProps = {
  htmlFor: string;
  required?: boolean;
  srOnly?: boolean;
} & PropsWithChildren;

const LabelComponent: React.FC<LabelProps> = ({ children, htmlFor, required, srOnly = false }) => {
  return (
    <StyledLabel className={classNames(srOnly && 'srOnly')} htmlFor={htmlFor} required={required}>
      {children}
    </StyledLabel>
  );
};

export default LabelComponent;
