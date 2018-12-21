import React from 'react';
import { injectIntl } from 'react-intl';

const IntlComponent = ({ Component, id, values, intl: { formatMessage }, ...rest }) => (
  <Component {...rest}>{formatMessage({ id }, values)}</Component>
);

export default injectIntl(IntlComponent);
