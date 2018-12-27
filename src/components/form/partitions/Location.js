import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Select from '../fields/Select';
import Map from '../fields/Map';

export default ({ errors, touched, neighborhoods, values, handleChange, handleBlur }) => (
  <Fragment>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 4, offset: 1 }}>
        <Select
          id="area"
          label="form.event.field.area.label"
          required
          error={errors.area}
          touched={touched.area}
          value={values.area}
          onChange={handleChange}
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
          error={errors.location}
          handleChange={handleChange}
          value={values.location}
        />
      </Col>
    </Row>
  </Fragment>
);
