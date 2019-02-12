import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { addNotification } from '../../../../ducks/notification';
import { getNeighborhoods } from '../../../../ducks/neighborhood';
import { getAddress } from '../../../../ducks/geo';
import { submitEvent } from '../../../../ducks/event';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

export default compose(
  withProps(props => ({
    pageType: 'new',
    locale: props.match.params.locale
  })),
  connect(
    state => ({
      neighborhoods: state.neighborhood.neighborhoods,
      selectedAddress: state.geo.selectedAddress,
      accessToken: state.auth.apiAccessToken
    }),
    { getAddress, getNeighborhoods, addNotification, submitEvent }
  ),
  withHandlers({
    onSubmit: ({
      history,
      locale,
      accessToken,
      addNotification: notify,
      submitEvent: submit
    }) => async values => {
      await submit(values, accessToken);
      await notify({ color: 'success', message: 'notification.form.event.created' });
      history.push(`/${locale}/event/submitted`);
    }
  }),
  injectIntl,
  withEventForm
)(EventPage);
