// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { dismissNotification } from '../../../ducks/notification';
import Notifications from '../Notifications';
import type { Store } from '../../../types/redux';

export default compose(
  connect(
    (state: Store) => ({
      notifications: state.notification.notifications
    }),
    { dismissNotification }
  )
)(Notifications);
