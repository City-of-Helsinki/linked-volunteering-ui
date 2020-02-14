import React, { Fragment } from 'react';
import { FormikValues } from 'formik';
import { Row, Col } from 'reactstrap';
import { get } from 'lodash';
import { useIntl } from 'react-intl';

import Map from '../fields/Map';
import Input from '../fields/Input';
import AutoSuggest, { AutoSuggestEvent } from '../fields/AutoSuggest';

interface Props {
  addressFeatures: Array<any>;
  clearCoordinatesByAddress: Function;
  errors: any;
  getCoordinatesByAddress: Function;
  getGeoData: Function;
  handleBlur: (event: React.FormEvent<any>) => void;
  handleChange: (event: AutoSuggestEvent) => void;
  neighborhoods: any;
  selectedAddress: any;
  selectedContractZone: any;
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
  neighborhoods,
  selectedAddress,
  selectedContractZone,
  setFieldValue,
  touched,
  values
}) => {
  const intl = useIntl();
  const { locale } = intl;

  const [updateAddress, setUpdateAddress] = React.useState(false);
  const [bounds, setBounds] = React.useState<any>(null);
  const [center, setCenter] = React.useState<any>(null);

  React.useEffect(() => {
    if (updateAddress) {
      const address = values.maintenance_location;
      const language = locale === 'sv' ? locale : 'fi';
      const paths = [
        // API doesn't return English street name so use Finnish street name in that
        ['street', 'name', language],
        ['number']
      ];

      const newAddrs = paths
        .map(path => get(selectedAddress, path))
        .filter(Boolean)
        .join(' ');

      if (address !== newAddrs) {
        setUpdateAddress(false);
        setFieldValue('maintenance_location', newAddrs, true);
      }
    }
  }, [locale, selectedAddress, setFieldValue, setUpdateAddress, updateAddress, values]);

  const handleZoom = (e: AutoSuggestEvent) => {
    if (e.target.value.type === 'Feature') {
      // Set address value
      setFieldValue('maintenance_location', e.target.value.properties.name, true);
      // Refetch the address from own API to check validity
      getGeoData(e.target.value.geometry.coordinates[1], e.target.value.geometry.coordinates[0]);
      // Save location to show marker on map
      handleChange({
        target: {
          id: 'location',
          value: e.target.value.geometry
        }
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
    <Fragment>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
          {neighborhoods.size > 0 && (
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
              suggestions={[...neighborhoods.sortBy(suggestionItem).values()]}
              getSuggestionValue={suggestionItem}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
          <Map
            id="location"
            bounds={bounds}
            center={center}
            errorLocation={errors.location}
            errorContractZone={errors.contractZone}
            getGeoData={getGeoData}
            touched={touched.maintenance_location}
            selectedAddress={selectedAddress}
            selectedContractZone={selectedContractZone}
            handleChange={(e: AutoSuggestEvent) => {
              setUpdateAddress(true);
              handleChange(e);
            }}
            value={values.location}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
          <Input
            type="textarea"
            id="maintenance_location"
            label="form.event.field.trash_location.label"
            placeholder="form.event.field.trash_location.placeholder"
            text="form.event.new.info"
            required
            error={errors.maintenance_location}
            touched={touched.maintenance_location}
            value={values.maintenance_location}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Location;
