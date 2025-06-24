import React, { PropsWithChildren } from 'react';
import { Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { IconProps, WithIcons } from './Icon';

type ButtonComponentProps = {
  translate?: string;
  values?: Record<string, string | number | boolean | Date | React.ReactNode>;
  append?: string | IconProps;
  prepend?: string | IconProps;
  color?: string;
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
} & PropsWithChildren;

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  translate,
  values,
  append,
  prepend,
  children,
  ...rest
}) => {
  return (
    <WithIcons component={Button} append={append} prepend={prepend} {...rest}>
      {translate ? (
        <FormattedMessage id={translate} values={values} />
      ) : (
        children
      )}
    </WithIcons>
  );
};

export default ButtonComponent;
