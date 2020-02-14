import React, { Fragment } from 'react';
import { FormikValues } from 'formik';
import { Row, Col } from 'reactstrap';
import { get } from 'lodash';
import { useIntl } from 'react-intl';

import Map from '../fields/Map';
import Input from '../fields/Input';
import AutoSuggest from '../fields/AutoSuggest';

interface Props {
  addressFeatures: Array<any>;
  clearCoordinatesByAddress: Function;
  errors: any;
  getCoordinatesByAddress: Function;
  getGeoData: Function;
  handleBlur: (event: React.FormEvent<any>) => void;
  handleChange: (event: React.FormEvent<any>) => void;
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

  const handleZoom = (e: any) => {
    setBounds(e.target.value.bbox);

    handleChange(e);
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
            errorLocation={errors.location}
            errorContractZone={errors.contractZone}
            getGeoData={getGeoData}
            touched={touched.maintenance_location}
            selectedAddress={selectedAddress}
            selectedContractZone={selectedContractZone}
            handleChange={(e: React.FormEvent<any>) => {
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

// class Location extends React.Component {

//   componentDidUpdate() {
//     const {
//       intl: { locale },
//       values: { maintenance_location: address },
//       setFieldValue
//     } = this.props;
//     const language = locale === 'sv' ? locale : 'fi';
//     const { updateAddress } = this.state;

//     const paths = [
//       // API doesn't return English street name so use Finnish street name in that
//       ['selectedAddress', 'street', 'name', language],
//       ['selectedAddress', 'number']
//     ];

//     const newAddrs = paths
//       .map(path => get(this.props, path))
//       .filter(Boolean)
//       .join(' ');

//     if (updateAddress && newAddrs !== address) {
//       this.setUpdateAddress(false);
//       setFieldValue('maintenance_location', newAddrs, true);
//     }
//   }

//   render() {
//     const {
//       addressFeatures,
//       errors,
//       touched,
//       neighborhoods,
//       values,
//       clearCoordinatesByAddress,
//       getCoordinatesByAddress,
//       getGeoData,
//       selectedAddress,
//       selectedContractZone,
//       handleChange,
//       handleBlur
//     } = this.props;

//

// export default injectIntl(Location);
