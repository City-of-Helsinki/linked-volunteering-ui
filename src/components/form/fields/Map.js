import React, { PureComponent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import IntlComponent from '../../common/IntlComponent';

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

const MapContainer = styled.div`
  height: 20em;
  margin-bottom: 2em;
`;

class MapCanvas extends PureComponent {
  state = {
    lng: 24.93,
    lat: 60.18808,
    zoom: 11.47
  };

  addMarker = e => {
    const { id, handleChange, getGeoData, apiAccessToken } = this.props;
    const { lat, lng } = e.latlng;

    getGeoData(lat, lng, apiAccessToken);

    handleChange({
      target: {
        id,
        value: { type: 'point', coordinates: [lat, lng] }
      }
    });
  };

  render() {
    const { bounds, value, error } = this.props;

    const mapBounds = bounds ? [[bounds[1], bounds[0]], [bounds[3], bounds[2]]] : null;
    const position = [this.state.lat, this.state.lng];
    const markerPosition = value ? [value.coordinates[0], value.coordinates[1]] : position;
    const marker = value ? <Marker position={markerPosition} /> : null;

    return (
      <MapContainer>
        <Map
          center={position}
          zoom={this.state.zoom}
          bounds={mapBounds}
          style={style}
          onClick={this.addMarker}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {marker}
        </Map>
        {error && <IntlComponent Component={ErrorMessage} id="form.validation.map" />}
      </MapContainer>
    );
  }
}

export default MapCanvas;
