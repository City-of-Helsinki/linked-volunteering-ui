import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import PageMeta from './PageMeta';
import { useAppDispatch } from '../../store/hooks';
import { addNotification } from '../../store/reducers/notifications';

const ErrorPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      addNotification({
        color: 'danger',
        message: 'notification.error.restricted_area',
      })
    );
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageMeta title="site.page.error.page_title" />
      <FormattedMessage tagName="h1" id="site.page.error.heading" />
      <FormattedMessage tagName="p" id="site.page.error.default_message" />
      <FormattedMessage tagName="a" id="site.page.error.to_home_page" />
    </div>
  );
};
export default ErrorPage;
