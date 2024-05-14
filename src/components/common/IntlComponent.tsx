import React from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';

interface IntlComponentProps extends WrappedComponentProps {
  Component: React.ElementType;
  id: string;
  values?: any;
  href?: string;
  onClick?: Function;
  lang?: string;
}

const IntlComponent: React.FC<IntlComponentProps> = ({ Component, id, values, intl, ...rest }) => {
  return <Component {...rest}>{intl.formatMessage({ id }, values)}</Component>;
};

export default injectIntl(IntlComponent);
