import L, { LatLngExpression, LatLngBoundsExpression, LeafletMouseEvent } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import styled from 'styled-components';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import IntlComponent from '../../common/IntlComponent';
import { useAppDispatch } from '../../../store/hooks';
import { getGeoData } from '../../../store/reducers/geo';
import useAuth from '../../../hooks/useAuth';

import 'leaflet/dist/leaflet.css';

L.Marker.prototype.options.icon = new L.Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [13, 41],
});

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

interface MapCanvasProps {
  bounds: number[] | null;
  center: number[] | null;
  errorContractZone?: string;
  errorLocation?: string;
  handleChange: Function;
  id: string;
  touched: boolean;
  value: any;
}

const MapCanvas: React.FC<MapCanvasProps> = ({
  value,
  id,
  touched,
  errorLocation,
  errorContractZone,
  bounds,
  center,
  handleChange,
}) => {
  const [mapState] = useState({
    lng: 24.93,
    lat: 60.18808,
    zoom: 11.47,
  });

  const dispatch = useAppDispatch();
  const { getApiToken } = useAuth();

  const apiAccessToken = getApiToken();

  useEffect(() => {
    if (value && apiAccessToken) {
      dispatch(
        getGeoData({ lat: value.coordinates[1], long: value.coordinates[0], apiAccessToken }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, apiAccessToken]);

  const addMarker = (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;

    dispatch(getGeoData({ lat, long: lng, apiAccessToken }));

    handleChange({
      target: {
        id,
        value: { type: 'Point', coordinates: [lng, lat] },
      },
    });
  };

  const renderMapErrors = () => {
    if (touched && errorLocation) {
      return <IntlComponent Component={ErrorMessage} id="form.validation.map" />;
    }
    if (touched && errorContractZone) {
      return <IntlComponent Component={ErrorMessage} id="form.validation.contract_zone" />;
    }
    return null;
  };

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

  const { lat, lng, zoom } = mapState;

  const position: LatLngExpression = [lat, lng];
  const markerPosition: LatLngExpression = value
    ? [value.coordinates[1], value.coordinates[0]]
    : position;
  const marker = value ? <Marker position={markerPosition} /> : null;

  return (
    <MapContainer className={renderMapErrors() ? 'is-invalid' : undefined} aria-hidden>
      <Map
        center={mapCenter || position}
        zoom={mapCenter ? 14 : zoom}
        minZoom={11}
        bounds={mapBounds}
        maxBounds={maxBounds}
        style={style}
        onClick={addMarker}
      >
        <TileLayer url="https://tiles.hel.ninja/wmts/osm-sm/webmercator/{z}/{x}/{y}.png" />
        {marker}
      </Map>
      {renderMapErrors()}
    </MapContainer>
  );
};

export default MapCanvas;
