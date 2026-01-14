import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import EventPage from '../EventPage';
import { createEvent } from '../../../../store/reducers/event';
import { useAppDispatch } from '../../../../store/hooks';
import useAuth from '../../../../hooks/useAuth';
import { addNotification } from '../../../../store/reducers/notifications';
import { Event } from '../../../../store/types';

const NewEventPageContainer = () => {
  const dispatch = useAppDispatch();
  const { getApiToken } = useAuth();
  const navigate = useNavigate();
  const intl = useIntl();

  const apiAccessToken = getApiToken();

  const handleSubmit = async (values: Event) => {
    await dispatch(createEvent({ event: values, apiAccessToken }));
    dispatch(
      addNotification({
        color: 'success',
        message: 'notification.form.event.created',
      })
    );

    navigate(`/${intl.locale}/event/submitted`);
  };

  return <EventPage handleSubmit={handleSubmit} pageType="new" />;
};

export default NewEventPageContainer;
