import React from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  notificationsSelector,
  dismissNotification,
} from '../../store/reducers/notifications';

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 1.5rem;
`;

const NofiticationComponent = () => {
  const notifications = useAppSelector(notificationsSelector);
  const dispatch = useAppDispatch();

  return (
    <NotificationWrapper>
      {Object.keys(notifications).map((key) => {
        const { message, color, values } = notifications[key];

        return (
          <Notification
            key={key}
            onDismiss={() => dispatch(dismissNotification(key))}
            color={color}
            values={values as Record<string, React.ReactNode>}
          >
            {message}
          </Notification>
        );
      })}
    </NotificationWrapper>
  );
};

export default NofiticationComponent;
