import React from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';

interface IntlComponentProps extends WrappedComponentProps {
  Component: React.ElementType;
  id: string;
  values?: Record<string, React.ReactNode>;
  href?: string;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  lang?: string;
  type?: string;
  color?: string;
  sm?: { size: number; offset: number };
}

const IntlComponent: React.FC<IntlComponentProps> = ({
  Component,
  id,
  values,
  intl,
  ...rest
}) => {
  return <Component {...rest}>{intl.formatMessage({ id }, values)}</Component>;
};

export default injectIntl(IntlComponent);
