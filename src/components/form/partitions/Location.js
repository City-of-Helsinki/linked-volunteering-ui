import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Map from '../fields/Map';
import AutoSuggest from '../fields/AutoSuggest';

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounds: null
    };
  }

  handleZoom = e => {
    const { handleChange } = this.props;

    this.setState({
      bounds: e.target.value.bbox
    });

    handleChange(e);
  };

  render() {
    const { errors, touched, neighborhoods, values, handleChange, handleBlur } = this.props;

    return (
      <Fragment>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 4, offset: 1 }}>
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
                suggestions={[...neighborhoods.values()]}
                getSuggestionValue={neighborhood => neighborhood.name.fi}
              />
            )}
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
