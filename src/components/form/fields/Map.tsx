import L, { LatLngExpression, LatLngBoundsExpression, LeafletMouseEvent } from 'leaflet';
import React, { PureComponent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import IntlComponent from '../../common/IntlComponent';

// @ts-ignore
delete L.Icon.Default.prototype.getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
/* eslint-enable */

interface State {
  lng: number;
  lat: number;
  zoom: number;
}

const style = {
  width: '100%',
  height: '100%',
};

const ErrorMessage = styled.div`
  color: ${(props) => props.theme['themecolors-danger']};
  margin-top: 0.25rem;
  font-size: 80%;
`;

const MapContainer = styled.div`
  height: 20em;
  margin-bottom: 2em;
`;

interface Props {
  bounds: number[] | null;
  center: number[] | null;
  errorContractZone?: string;
  errorLocation?: string;
  handleChange: Function;
  getGeoData: Function;
  id: string;
  touched: Boolean;
  value: any;
}

class MapCanvas extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lng: 24.93,
      lat: 60.18808,
      zoom: 11.47,
    };
  }

  componentDidMount() {
    const { value, getGeoData } = this.props;

    if (value) {
      getGeoData(value.coordinates[1], value.coordinates[0]);
    }
  }

  addMarker = (e: LeafletMouseEvent) => {
    const { id, handleChange, getGeoData } = this.props;
    const { lat, lng } = e.latlng;

    getGeoData(lat, lng);

    handleChange({
      target: {
        id,
        value: { type: 'Point', coordinates: [lng, lat] },
      },
    });
  };

  renderMapErrors() {
    const { touched, errorLocation, errorContractZone } = this.props;

    if (touched && errorLocation) {
      return <IntlComponent Component={ErrorMessage} id="form.validation.map" />;
    }
    if (touched && errorContractZone) {
      return <IntlComponent Component={ErrorMessage} id="form.validation.contract_zone" />;
    }
    return null;
  }

  render() {
    const { bounds, center, value } = this.props;

    const mapBounds: LatLngBoundsExpression | undefined = bounds
      ? [
          [bounds[1], bounds[0]],
          [bounds[3], bounds[2]],
        ]
      : undefined;
    const maxBounds: LatLngBoundsExpression = [
      [60.33, 25.33],
      [60.1, 24.73],
    ]; // Allow map scroll only inside Helsinki
    const mapCenter: [number, number] | null = center ? [center[1], center[0]] : null;

    const { lat, lng, zoom } = this.state;

    const position: LatLngExpression = [lat, lng];
    const markerPosition: LatLngExpression = value
      ? [value.coordinates[1], value.coordinates[0]]
      : position;
    const marker = value ? <Marker position={markerPosition} /> : null;

    return (
      <MapContainer className={this.renderMapErrors() ? 'is-invalid' : undefined} aria-hidden>
        <Map
          center={mapCenter || position}
          zoom={mapCenter ? 14 : zoom}
          minZoom={11}
          bounds={mapBounds}
          maxBounds={maxBounds}
          style={style}
          onClick={this.addMarker}
        >
          <TileLayer url="https://tiles.hel.ninja/wmts/osm-sm/webmercator/{z}/{x}/{y}.png" />
          {marker}
        </Map>
        {this.renderMapErrors()}
      </MapContainer>
    );
  }
}

export default MapCanvas;
