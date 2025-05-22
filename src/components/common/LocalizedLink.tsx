import React, { PropsWithChildren } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { IconProps, WithIcons } from './Icon';

type LocalizedLinkProps = {
  translate?: string;
  values?: Record<string, any>;
  append?: string | IconProps;
  prepend?: string | IconProps;
  to: string;
  id?: string;
  className?: string;
} & PropsWithChildren;

const LocalizedLink: React.FC<LocalizedLinkProps> = ({ to, children, translate, values, ...rest }) => {
  const { locale } = useIntl();

  return (
    <WithIcons component={Link} to={`/${locale}/${to}`} {...rest}>
      {translate ? <FormattedMessage id={translate} values={values} /> : children}
    </WithIcons>
  );
};

export default LocalizedLink;
