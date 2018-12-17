// @flow
import React, { type Node } from 'react';
import { injectIntl, type IntlShape } from 'react-intl';

type Props = {
  Component: () => Node,
  id: string,
  values?: {},
  intl: IntlShape
};

const IntlComponent = ({ Component, id, values, intl: { formatMessage }, ...rest }: Props) => {
  return <Component {...rest}>{formatMessage({ id }, values)}</Component>;
};

export default injectIntl(IntlComponent);
