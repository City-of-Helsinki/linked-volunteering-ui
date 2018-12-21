import React, { Component, Fragment } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

/* eslint-disable */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});
/* eslint-enable */

const style = {
  width: '100%',
  height: '100%'
};

const ErrorMessage = styled.div`
  color: ${props => props.theme.themeColors.danger};
  margin-top: 0.25rem;
  font-size: 80%;
`;

class MapCanvas extends Component {
  state = {
    lng: 24.93,
    lat: 60.18808,
    zoom: 11.47
  };

  addMarker = e => {
    const { id, handleChange } = this.props;
    const { lat, lng } = e.latlng;
    handleChange({
      target: {
        id,
        value: { lat, lng }
      }
    });
  };

  render() {
    const {
      value,
      error,
      intl: { formatMessage }
    } = this.props;

    const position = [this.state.lat, this.state.lng];
    const markerPosition = value ? [value.lat, value.lng] : position;
    const marker = value ? <Marker position={markerPosition} /> : null;

    return (
      <Fragment>
        <Map center={position} zoom={this.state.zoom} style={style} onClick={this.addMarker}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {marker}
        </Map>
        <ErrorMessage>{error && formatMessage({ id: 'form.validation.map' })}</ErrorMessage>
      </Fragment>
    );
  }
}

export default injectIntl(MapCanvas);
