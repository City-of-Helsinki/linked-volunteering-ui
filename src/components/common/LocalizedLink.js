import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon, { StyledSvg } from './Icon';

const StyledLink = styled(Link)`
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

const LocalizedLink = ({ append, prepend, to, children, intl, id, values, className, ...rest }) => (
  <StyledLink className={className} to={`/${intl.locale}/${to}`} {...rest}>
    {prepend && <Icon name={prepend} />}
    {id ? <FormattedMessage id={id} values={values} /> : children}
    {append && <Icon name={append} />}
  </StyledLink>
);

export default injectIntl(LocalizedLink);
