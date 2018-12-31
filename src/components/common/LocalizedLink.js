import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const LocalizedLink = ({ to, children, intl, className, ...rest }) => (
  <Link className={className} to={`/${intl.locale}/${to}`} {...rest}>
    {children}
  </Link>
);

export default injectIntl(LocalizedLink);
