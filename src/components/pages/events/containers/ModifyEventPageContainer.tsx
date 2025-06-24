import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

import EventPage from '../EventPage';
import { useAppDispatch } from '../../../../store/hooks';
import useAuth from '../../../../hooks/useAuth';
import { modifyEvent } from '../../../../store/reducers/event';
import { addNotification } from '../../../../store/reducers/notifications';
import { Event } from '../../../../store/types';

const ModifyEventPageContainer = () => {
  const dispatch = useAppDispatch();
  const { getApiToken } = useAuth();
  const navigate = useNavigate();
  const intl = useIntl();

  const apiAccessToken = getApiToken();

  const handleSubmit = async (values: Event) => {
    await dispatch(modifyEvent({ event: values, apiAccessToken }));
    dispatch(
      addNotification({
        color: 'success',
        message: 'notification.form.event.modified',
      })
    );

    navigate(`/${intl.locale}/admin/events/manage`);
  };

  return <EventPage handleSubmit={handleSubmit} pageType="modify" />;
};

export default ModifyEventPageContainer;
