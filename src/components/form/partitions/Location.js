import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Select from '../fields/Select';
import Map from '../fields/Map';

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: null
    };
  }

  handleZoom = e => {
    const { neighborhoods, handleChange } = this.props;

    const selectectedNeighborhood = neighborhoods.find(
      neighborhood => neighborhood.ocd_id === e.target.value
    );

    this.setState({
      bounds: selectectedNeighborhood.bbox
    });

    handleChange(e);
  };

  render() {
    const { errors, touched, neighborhoods, values, handleChange, handleBlur } = this.props;

    return (
      <Fragment>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 4, offset: 1 }}>
            <Select
              id="area"
              label="form.event.field.neighborhood.label"
              required
              error={errors.area}
              touched={touched.area}
              value={values.area}
              onChange={this.handleZoom}
              onBlur={handleBlur}
            >
              {neighborhoods.valueSeq().map(neighborhood => (
                <option key={neighborhood.ocd_id} value={neighborhood.ocd_id}>
                  {neighborhood.name.fi}
                </option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col sm="10" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
            <Map
              id="location"
              bounds={this.state.bounds}
              error={errors.location}
              handleChange={handleChange}
              value={values.location}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Location;
