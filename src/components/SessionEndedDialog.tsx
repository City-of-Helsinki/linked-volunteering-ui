import { SessionEndedHandler } from 'hds-react';
import React from 'react';
import { useIntl } from 'react-intl';

const SessionEndedDialog = () => {
  const intl = useIntl();

  return (
    <SessionEndedHandler
      content={{
        title: intl.formatMessage({ id: 'site.login-prompt.title' }),
        text: intl.formatMessage({ id: 'site.login-prompt.body' }),
        buttonText: intl.formatMessage({ id: 'site.login-prompt.button-label' }),
        closeButtonLabelText: intl.formatMessage({ id: 'site.login-prompt.button-label' }),
      }}
    />
  );
};

export default SessionEndedDialog;
