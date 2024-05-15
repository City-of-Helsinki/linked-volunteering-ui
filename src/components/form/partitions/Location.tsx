import React from 'react';
import { FormikValues } from 'formik';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import { useIntl } from 'react-intl';

import Map from '../fields/Map';
import Input from '../fields/Input';
import Label from '../fields/Label';
import AutoSuggest, { AutoSuggestEvent } from '../fields/AutoSuggest';

interface Props {
  addressFeatures: Array<any>;
  clearCoordinatesByAddress: Function;
  errors: any;
  getCoordinatesByAddress: Function;
  getGeoData: Function;
  handleBlur: (_event: React.FormEvent<any>) => void;
  handleChange: (_event: AutoSuggestEvent) => void;
  selectedAddress: any;
  selectedContractZone: any;
  setFieldTouched: Function;
  setFieldValue: Function;
  touched: any;
  values: FormikValues;
}

const Location: React.FC<Props> = ({
  addressFeatures,
  clearCoordinatesByAddress,
  errors,
  getCoordinatesByAddress,
  getGeoData,
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
  const { formatMessage, locale } = intl;
  const [updateAddress, setUpdateAddress] = React.useState(false);
  const [clickedAddress, setClickedAddress] = React.useState<string | null>(null);
  const [bounds, setBounds] = React.useState<number[] | null>(null);
  const [center, setCenter] = React.useState<number[] | null>(null);

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
        setFieldValue('maintenance_location', clickedAddress || newAddrs, true);

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
    if (e.target.value.type === 'Feature') {
      // Set states to update address
      setUpdateAddress(true);
      setClickedAddress(e.target.value.properties.name);
      // Refetch the address from own API to check validity
      getGeoData(e.target.value.geometry.coordinates[1], e.target.value.geometry.coordinates[0]);
      // Save location to show marker on map
      handleChange({
        target: {
          id: 'location',
          value: e.target.value.geometry,
        },
      });
      setCenter(e.target.value.geometry.coordinates);
    } else {
      setBounds(e.target.value.bbox);
      handleChange(e);
    }
  };

  const suggestionItem = (item: any) => {
    const language = locale === 'sv' ? locale : 'fi';

    if (item.type === 'Feature') {
      return item.properties.name;
    }
    if (item.parent) {
      return `${item.name[language]} (${item.parent.name[language]})`;
    }
    return item.name[language];
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
            clearCoordinatesByAddress={clearCoordinatesByAddress}
            getCoordinatesByAddress={getCoordinatesByAddress}
            error={errors.area}
            touched={touched.area}
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
            errorLocation={errors.location}
            errorContractZone={
              !selectedContractZone ? 'form.validation.contact_zone.invalid' : undefined
            }
            getGeoData={getGeoData}
            touched={touched.maintenance_location}
            handleChange={(e: AutoSuggestEvent) => {
              setClickedAddress(null);
              setUpdateAddress(true);
              handleChange(e);
            }}
            value={values.location}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
          <Label htmlFor="maintenance_location" srOnly>
            {formatMessage({ id: 'form.event.field.trash_location.placeholder' })}
          </Label>
          <Input
            type="textarea"
            id="maintenance_location"
            placeholder="form.event.field.trash_location.placeholder"
            text="form.event.new.info"
            error={errors.maintenance_location}
            touched={touched.maintenance_location}
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
