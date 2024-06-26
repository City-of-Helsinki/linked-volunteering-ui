import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useNavigate, useParams } from 'react-router';

import { renderIfAuthenticated } from '../../../../utils/container';
import { addNotification } from '../../../../ducks/notification';
import {
  clearCoordinatesByAddress,
  getCoordinatesByAddress,
  getGeoData,
} from '../../../../ducks/geo';
import { modifyEvent } from '../../../../ducks/event';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

export default compose(
  renderIfAuthenticated,
  withProps(() => ({
    pageType: 'modify',
    id: useParams().id,
    locale: useParams().locale,
    navigate: useNavigate(),
  })),
  connect(
    (state, { id }) => {
      const parsedId = parseInt(id, 10);
      return {
        addressCoordinates: get(state, 'geo.addressCoordinates'),
        initialValues: state.event.events.get(parsedId),
        selectedAddress: get(state, 'geo.geoData.closest_address'),
        selectedContractZone: get(state, 'geo.geoData.contract_zone'),
        unavailableDates: get(state, 'geo.geoData.contract_zone.unavailable_dates'),
        apiAccessToken: state.auth.apiAccessToken,
      };
    },
    {
      clearCoordinatesByAddress,
      getCoordinatesByAddress,
      getGeoData,
      addNotification,
    },
  ),
  injectIntl,
  withHandlers({
    onSubmit:
      ({ navigate, intl: { locale }, addNotification: notify, apiAccessToken }) =>
      async (values) => {
        await modifyEvent(values, apiAccessToken);
        navigate(`/${locale}/admin/events/manage`);
        notify({ color: 'success', message: 'notification.form.event.modified' });
      },
  }),
  withEventForm,
)(EventPage);
