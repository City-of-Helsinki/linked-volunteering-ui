import React from 'react';
import { addNotification } from '../../../ducks/notification';
import Icon from '../../common/Icon';

const Body = ({ values }) => (
  <div>
    <div>
      <strong>{values.name}</strong>
    </div>
    <div>
      <Icon name="calendar" inline width="1em" height="1em" />
      <span>{values.startDate}</span>
      <span>
        klo {values.starttime} - {values.endtime}
      </span>
    </div>
    <div>
      <Icon name="mapMarker" inline width="1em" height="1em" />
      <span>Töölönranta</span>
    </div>
  </div>
);

export default {
  header: 'modal.confirm_removal.header',
  Body,
  footer: [
    {
      intl: 'modal.confirm_removal.footer.button1.text',
      color: 'primary',
      action: (dispatch, values) => {
        dispatch(
          addNotification({
            color: 'info',
            message: 'notification.manage_events.remove',
            values
          })
        );
      }
    },
    {
      intl: 'modal.confirm_removal.footer.button2.text',
      color: 'secondary'
    }
  ]
};
