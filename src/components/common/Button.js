import React from 'react';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Icon, { StyledSvg } from './Icon';

const StyledButton = styled(Button)`
  white-space: nowrap;
  ${StyledSvg} {
    &:first-child {
      margin-right: 0.4em;
    }
    &:last-child {
      margin-left: 0.4em;
    }
  }
`;

export default ({ append, prepend, children, translate, intl, values, className, ...rest }) => (
  <StyledButton className={className} {...rest}>
    {prepend && <Icon name={prepend} />}
    {translate ? <FormattedMessage id={translate} values={values} /> : children}
    {append && <Icon name={append} />}
  </StyledButton>
);
