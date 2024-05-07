import React from 'react';
import styled from 'styled-components';
import Notification from './Notification';

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 1.5rem;
`;

export default ({ notifications, dismissNotification }) => {
  return (
    <NotificationWrapper>
      {notifications.entrySeq().map(([key, { message, color, values }]) => (
        <Notification
          key={key}
          onDismiss={() => dismissNotification(key)}
          color={color}
          values={values}
        >
          {message}
        </Notification>
      ))}
    </NotificationWrapper>
  );
};
