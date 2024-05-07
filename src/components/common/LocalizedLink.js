import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { WithIcons } from './Icon';

function LocalizedLink({ to, children, intl, translate, values, ...rest }) {
  return (
    <WithIcons component={Link} to={`/${intl.locale}/${to}`} {...rest}>
      {translate ? <FormattedMessage id={translate} values={values} /> : children}
    </WithIcons>
  );
}

export default injectIntl(LocalizedLink);
