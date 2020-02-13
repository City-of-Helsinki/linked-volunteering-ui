import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { get } from 'lodash';
import { injectIntl } from 'react-intl';

import Map from '../fields/Map';
import Input from '../fields/Input';
import AutoSuggest from '../fields/AutoSuggest';

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updateAddress: false,
      bounds: null
    };
  }

  componentDidUpdate() {
    const {
      intl: { locale },
      values: { maintenance_location: address },
      setFieldValue
    } = this.props;
    const language = locale === 'sv' ? locale : 'fi';
    const { updateAddress } = this.state;

    const paths = [
      // API doesn't return English street name so use Finnish street name in that
      ['selectedAddress', 'street', 'name', language],
      ['selectedAddress', 'number']
    ];

    const newAddrs = paths
      .map(path => get(this.props, path))
      .filter(Boolean)
      .join(' ');

    if (updateAddress && newAddrs !== address) {
      this.setUpdateAddress(false);
      setFieldValue('maintenance_location', newAddrs, true);
    }
  }

  setUpdateAddress = to =>
    this.setState(() => ({
      updateAddress: to
    }));

  handleZoom = e => {
    const { handleChange } = this.props;

    this.setState({
      bounds: e.target.value.bbox
    });

    handleChange(e);
  };

  suggestionItem = neighborhood => {
    const {
      intl: { locale }
    } = this.props;
    const language = locale === 'sv' ? locale : 'fi';

    if (neighborhood.parent) {
      return `${neighborhood.name[language]} (${neighborhood.parent.name[language]})`;
    }
    return neighborhood.name[language];
  };

  render() {
    const {
      errors,
      touched,
      neighborhoods,
      values,
      getGeoData,
      selectedAddress,
      selectedContractZone,
      handleChange,
      handleBlur
    } = this.props;

    return (
      <Fragment>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
            {neighborhoods.size > 0 && (
              <AutoSuggest
                id="neighborhood"
                label="form.event.field.neighborhood.label"
                placeholder="form.event.field.neighborhood.placeholder"
                error={errors.area}
                touched={touched.area}
                value={values.area}
                onChange={this.handleZoom}
                onBlur={handleBlur}
                suggestions={[...neighborhoods.sortBy(this.suggestionItem).values()]}
                getSuggestionValue={this.suggestionItem}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
            <Map
              id="location"
              bounds={this.state.bounds}
              errorLocation={errors.location}
              errorContractZone={errors.contractZone}
              getGeoData={getGeoData}
              touched={touched.maintenance_location}
              selectedAddress={selectedAddress}
              selectedContractZone={selectedContractZone}
              handleChange={e => {
                this.setUpdateAddress(true);
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
  }
}

export default injectIntl(Location);
