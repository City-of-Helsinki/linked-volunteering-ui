import React from 'react';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { WithIcons } from './Icon';

export default (props) => {
  const { translate, values, children, ...rest } = props;
  return (
    <WithIcons component={Button} {...rest}>
      {translate ? <FormattedMessage id={translate} values={values} /> : children}
    </WithIcons>
  );
};
