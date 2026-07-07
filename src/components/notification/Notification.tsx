import React, { useEffect, useRef } from 'react';
import { Alert } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  .close {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    cursor: pointer;
  }
`;

interface NotificationProps {
  color: string;
  children: string;
  values?: Record<string, React.ReactNode>;
  onDismiss: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  children,
  color,
  values,
  onDismiss,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(onDismiss, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDismissFn = () => {
    clearTimeout(timerRef.current);
    onDismiss();
  };

  return (
    <StyledAlert color={color} toggle={onDismissFn} fade>
      <FormattedMessage id={children} values={values} />
    </StyledAlert>
  );
};

export default Notification;
