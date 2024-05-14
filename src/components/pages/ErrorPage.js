import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';

import PageMeta from './PageMeta';

function ErrorPage(props) {
  const { addNotification } = props;
  const navigate = useNavigate();
  useEffect(() => {
    addNotification({ color: 'danger', message: 'notification.error.restricted_area' });
    navigate('/');
  }, [addNotification, navigate]);

  // eslint-disable-next-line class-methods-use-this
  return (
    <div>
      <PageMeta title="site.page.error.page_title" />
      <FormattedMessage tagName="h1" id="site.page.error.heading" href="/" />
      <FormattedMessage tagName="p" id="site.page.error.default_message" />
      <FormattedMessage tagName="a" id="site.page.error.to_home_page" href="/" />
    </div>
  );
}
export default ErrorPage;
