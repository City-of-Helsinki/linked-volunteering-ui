import React from 'react';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';

import Icon from '../../common/Icon';
import { removeEvent } from '../../../store/reducers/event';
import { addNotification } from '../../../store/reducers/notifications';
import { Event } from '../../../store/types';

function Body({ values }: { readonly values: Partial<Event> }) {
  return (
    <div>
      <div>
        <strong>{values.name}</strong>
      </div>
      <div>
        <Icon name='calendar' />
        <FormattedDate value={values.start_time} />
        <span>
          {' '}
          <FormattedMessage tagName='span' id='modal.confirm_removal.body.time.at' />{' '}
          <FormattedTime value={values.start_time} /> - <FormattedTime value={values.end_time} />
        </span>
      </div>
      <div>
        <Icon name='mapMarker' />
        {values.maintenance_location ? (
          <span>{values.maintenance_location}</span>
        ) : (
          <FormattedMessage tagName='span' id='modal.confirm_removal.body.location.text' />
        )}
      </div>
    </div>
  );
}

export default {
  header: 'modal.confirm_removal.header',
  Body,
  footer: [
    {
      intl: 'modal.confirm_removal.footer.button1.text',
      color: 'primary',
      action: async (dispatch: any, meta: { event: Event; apiAccessToken: string | undefined }) => {
        const { event, apiAccessToken } = meta;

        dispatch(removeEvent({ event, apiAccessToken }));

        dispatch(
          addNotification({
            color: 'info',
            message: 'notification.manage_events.remove',
            values: event,
          }),
        );
      },
    },
    {
      intl: 'modal.confirm_removal.footer.button2.text',
      color: 'secondary',
    },
  ],
};
