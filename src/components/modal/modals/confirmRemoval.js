import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

import { addNotification } from '../../../ducks/notification';
import { removeEvent } from '../../../ducks/event';
import Icon from '../../common/Icon';

const Body = ({ values }) => (
  <div>
    <div>
      <strong>{values.name}</strong>
    </div>
    <div>
      <Icon name="calendar" />
      <FormattedDate value={values.start_time} />
      <span>
        klo <FormattedTime value={values.start_time} /> - <FormattedTime value={values.end_time} />
      </span>
    </div>
    <div>
      <Icon name="mapMarker" />
      <span>Placeholder text for an address</span>
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
      action: async (dispatch, values, apiAccessToken) => {
        await dispatch(removeEvent(values, apiAccessToken));
        await dispatch(
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
