import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useNavigate, useParams } from 'react-router';
import { addNotification } from '../../../../ducks/notification';
import {
  clearCoordinatesByAddress,
  getCoordinatesByAddress,
  getGeoData,
} from '../../../../ducks/geo';
import { submitEvent } from '../../../../ducks/event';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

export default compose(
  withProps(() => ({
    pageType: 'new',
    locale: useParams().locale,
    navigate: useNavigate(),
  })),
  connect(
    (state) => ({
      addressCoordinates: get(state, 'geo.addressCoordinates'),
      selectedAddress: get(state, 'geo.geoData.closest_address'),
      selectedContractZone: get(state, 'geo.geoData.contract_zone'),
      unavailableDates: get(state, 'geo.geoData.contract_zone.unavailable_dates'),
      apiAccessToken: state.auth.apiAccessToken,
    }),
    {
      clearCoordinatesByAddress,
      getCoordinatesByAddress,
      getGeoData,
      addNotification,
      submitEvent,
    },
  ),
  withHandlers({
    onSubmit:
      ({ navigate, locale, apiAccessToken, addNotification: notify, submitEvent: submit }) =>
      async (values) => {
        await submit(values, apiAccessToken);
        await notify({ color: 'success', message: 'notification.form.event.created' });
        navigate(`/${locale}/event/submitted`);
      },
  }),
  injectIntl,
  withEventForm,
)(EventPage);
