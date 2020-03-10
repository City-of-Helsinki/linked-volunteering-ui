import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { addNotification } from '../../../../ducks/notification';
import {
  clearCoordinatesByAddress,
  getCoordinatesByAddress,
  getGeoData
} from '../../../../ducks/geo';
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
      addressCoordinates: get(state, 'geo.addressCoordinates'),
      selectedAddress: get(state, 'geo.geoData.closest_address'),
      selectedContractZone: get(state, 'geo.geoData.contract_zone'),
      unavailableDates: get(state, 'geo.geoData.contract_zone.unavailable_dates'),
      apiAccessToken: state.auth.apiAccessToken
    }),
    {
      clearCoordinatesByAddress,
      getCoordinatesByAddress,
      getGeoData,
      addNotification,
      submitEvent
    }
  ),
  withHandlers({
    onSubmit: ({
      history,
      locale,
      apiAccessToken,
      addNotification: notify,
      submitEvent: submit
    }) => async values => {
      await submit(values, apiAccessToken);
      await notify({ color: 'success', message: 'notification.form.event.created' });
      history.push(`/${locale}/event/submitted`);
    }
  }),
  injectIntl,
  withEventForm
)(EventPage);
