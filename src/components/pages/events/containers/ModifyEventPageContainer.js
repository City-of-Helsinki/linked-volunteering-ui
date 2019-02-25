import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { getNeighborhoods } from '../../../../ducks/neighborhood';
import { renderIfAuthenticated } from '../../../../utils/container';
import { addNotification } from '../../../../ducks/notification';
import { getGeoData } from '../../../../ducks/geo';
import { modifyEvent } from '../../../../ducks/event';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

export default compose(
  renderIfAuthenticated,
  withProps(props => ({
    pageType: 'modify',
    id: props.match.params.id,
    locale: props.match.params.locale
  })),
  connect(
    (state, { id }) => {
      const parsedId = parseInt(id, 10);
      return {
        initialValues: state.event.events.get(parsedId),
        neighborhoods: state.neighborhood.neighborhoods,
        selectedAddress: get(state, 'geo.geoData.closest_address'),
        unavailableDates: get(state, 'geo.geoData.contract_zone.unavailable_dates'),
        apiAccessToken: state.auth.apiAccessToken
      };
    },
    { getGeoData, addNotification, getNeighborhoods }
  ),
  withHandlers({
    onSubmit: ({ history, locale, addNotification: notify, apiAccessToken }) => async values => {
      await modifyEvent(values, apiAccessToken);
      history.push(`/${locale}/admin/events/manage`);
      notify({ color: 'success', message: 'notification.form.event.modified' });
    }
  }),
  injectIntl,
  withEventForm
)(EventPage);
