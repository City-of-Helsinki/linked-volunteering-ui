// @flow

import React, { Component, Fragment } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { injectIntl, type intlShape } from 'react-intl';

/* eslint-disable */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
/* eslint-enable */

const style = {
  width: '100%',
  height: '100%'
};

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin-top: 0.25rem;
  font-size: 80%;
`;

type State = {
  lat: number,
  lng: number,
  zoom: number
};

type Value = {
  lat: number,
  lng: number
};

type ChangeEvent = {
  target: {
    id: string,
    value: Value
  }
};

type Event = {
  latlng: {
    lat: number,
    lng: number
  }
};

type Props = {
  error: Value,
  intl: intlShape,
  handleChange: ChangeEvent => void,
  handleBlur: Event,
  value: Value
};

class MapCanvas extends Component<Props, State> {
  state = {
    lng: 24.93,
    lat: 60.18808,
    zoom: 11.47
  };

  addMarker = (e: Event) => {
    const { handleChange } = this.props;
    handleChange({
      target: {
        id: 'location',
        value: { lat: e.latlng.lat, lng: e.latlng.lng }
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
        <ErrorMessage>{error && formatMessage({ id: 'Valitse paikka kartasta' })}</ErrorMessage>
      </Fragment>
    );
  }
}

export default injectIntl(MapCanvas);
