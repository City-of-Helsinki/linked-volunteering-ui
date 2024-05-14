import { compose } from 'recompose';
import { connect } from 'react-redux';

import { dismissNotification } from '../../../ducks/notification';
import Notifications from '../Notifications';

export default compose(
  connect(
    (state) => ({
      notifications: state.notification.notifications,
    }),
    { dismissNotification },
  ),
)(Notifications);
