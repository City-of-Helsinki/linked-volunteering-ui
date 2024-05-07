import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import PageMeta from './PageMeta';

class ErrorPage extends PureComponent {
  componentDidMount() {
    const { history, addNotification } = this.props;
    addNotification({ color: 'danger', message: 'notification.error.restricted_area' });
    history.push('/');
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <PageMeta title="site.page.error.page_title" />
        <FormattedMessage tagName="h1" id="site.page.error.heading" href="/" />
        <FormattedMessage tagName="p" id="site.page.error.default_message" />
        <FormattedMessage tagName="a" id="site.page.error.to_home_page" href="/" />
      </div>
    );
  }
}
export default ErrorPage;
