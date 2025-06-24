import React from 'react';
import { FormikValues } from 'formik';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import { useIntl } from 'react-intl';

import Map from '../fields/Map';
import Input from '../fields/Input';
import Label from '../fields/Label';
import AutoSuggest from '../fields/AutoSuggest';
import { useAppDispatch } from '../../../store/hooks';
import { getGeoData } from '../../../store/reducers/geo';
import useAuth from '../../../hooks/useAuth';
import { AddressFeature, AutoSuggestEvent } from '../../../types';

interface Props {
  addressFeatures: AddressFeature[];
  errors: Record<string, unknown>;
  handleBlur: (_event: React.FormEvent<HTMLElement>) => void;
  handleChange: (_event: AutoSuggestEvent) => void;
  selectedAddress: Record<string, unknown> | undefined;
  selectedContractZone: Record<string, unknown> | null | undefined;
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean
  ) => Promise<unknown>;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<unknown>;
  touched: Record<string, unknown>;
  values: FormikValues;
}

const Location: React.FC<Props> = ({
  addressFeatures,
  errors,
  handleBlur,
  handleChange,
  selectedAddress,
  selectedContractZone,
  setFieldTouched,
  setFieldValue,
  touched,
  values,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { getApiToken } = useAuth();

  const { formatMessage, locale } = intl;
  const [updateAddress, setUpdateAddress] = React.useState(false);
  const [clickedAddress, setClickedAddress] = React.useState<string | null>(
    null
  );
  const [bounds, setBounds] = React.useState<number[] | null>(null);
  const [center, setCenter] = React.useState<number[] | null>(null);

  const apiAccessToken = getApiToken();

  React.useEffect(() => {
    if (updateAddress) {
      const address = values.maintenance_location;
      const language = locale === 'sv' ? locale : 'fi';
      const paths = [
        // API doesn't return English street name so use Finnish street name in that
        ['street', 'name', language],
        ['number'],
      ];

      const newAddrs = paths
        .map((path) => get(selectedAddress, path))
        .filter(Boolean)
        .join(' ');

      if (address !== newAddrs) {
        setFieldTouched('maintenance_location');
        setFieldValue('maintenance_location', clickedAddress ?? newAddrs, true);

        setUpdateAddress(false);
        setClickedAddress(null);
      }
    }
  }, [
    clickedAddress,
    locale,
    selectedAddress,
    setFieldTouched,
    setFieldValue,
    setUpdateAddress,
    updateAddress,
    values,
  ]);

  const handleZoom = (e: AutoSuggestEvent) => {
    const value = e.target.value as AddressFeature;

    if (value.type === 'Feature' && value.geometry && value.properties) {
      // Set states to update address
      setUpdateAddress(true);
      setClickedAddress(value.properties.name);
      // Refetch the address from own API to check validity

      dispatch(
        getGeoData({
          lat: value.geometry.coordinates[1],
          long: value.geometry.coordinates[0],
          apiAccessToken,
        })
      );

      // Save location to show marker on map
      handleChange({
        target: {
          id: 'location',
          value: value.geometry,
        },
      });
      setCenter(value.geometry.coordinates);
    } else if (value.bbox) {
      setBounds(value.bbox);
      handleChange(e);
    } else {
      // Default case - just pass through the event
      handleChange(e);
    }
  };

  const suggestionItem = (item: AddressFeature) => {
    const language = locale === 'sv' ? locale : 'fi';

    if (item.type === 'Feature') {
      return item.properties?.name || '';
    }
    if (item.parent && item.name) {
      return `${item.name[language]} (${item.parent.name[language]})`;
    }
    return item.name?.[language] || '';
  };

  return (
    <>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
          <AutoSuggest
            id="neighborhood"
            label="form.event.field.neighborhood.label"
            placeholder="form.event.field.neighborhood.placeholder"
            addressFeatures={addressFeatures}
            error={errors.area as string | undefined}
            touched={Boolean(touched.area)}
            onChange={handleZoom}
            onBlur={handleBlur}
            getSuggestionValue={suggestionItem}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
          <Map
            id="location"
            bounds={bounds}
            center={center}
            errorLocation={errors.location as string | undefined}
            errorContractZone={
              !selectedContractZone
                ? 'form.validation.contact_zone.invalid'
                : undefined
            }
            touched={Boolean(touched.maintenance_location)}
            handleChange={(e: { target: { id: string; value: unknown } }) => {
              setClickedAddress(null);
              setUpdateAddress(true);
              handleChange(e as AutoSuggestEvent);
            }}
            value={values.location}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
          <Label htmlFor="maintenance_location" srOnly>
            {formatMessage({
              id: 'form.event.field.trash_location.placeholder',
            })}
          </Label>
          <Input
            type="textarea"
            id="maintenance_location"
            placeholder="form.event.field.trash_location.placeholder"
            text="form.event.new.info"
            error={errors.maintenance_location as string | undefined}
            touched={Boolean(touched.maintenance_location)}
            value={values.maintenance_location}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
    </>
  );
};

export default Location;
