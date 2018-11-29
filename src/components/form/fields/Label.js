// @flow
import React from 'react';
import { Label } from 'reactstrap';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';

const StyledLabel = styled(Label)`
  ${props =>
    props.required &&
    css`
      &::after {
        content: '*';
        margin-left: 0.25ch;
      }
    `};
`;

type Props = {
  htmlFor: string,
  required: boolean,
  children: string
};

export default ({ htmlFor, required, children }: Props) => (
  <StyledLabel htmlFor={htmlFor} required={required}>
    <FormattedMessage id={children} />
  </StyledLabel>
);
