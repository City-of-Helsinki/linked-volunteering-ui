// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Input from './fields/Input';
import Select from './fields/Select';
import Checkbox from './fields/Checkbox';
import Radio from './fields/Radio';
import Map from './fields/Map';
import Areas from './partitions/Areas';

import type { WithForm } from '../../types/forms';
import type { Event } from '../../types/event';

const MapContainer = styled.div`
  height: 20em;
  margin-bottom: 2em;
`;

export default ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit
}: WithForm<Event>) => (
  <form onSubmit={handleSubmit}>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <FormattedMessage tagName="h3" id="form.event.title.name_and_description" />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <Input
          type="text"
          id="name"
          label="form.event.field.name.label"
          placeholder="form.event.field.name.placeholder"
          required
          error={errors.name}
          touched={touched.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <Input
          type="textarea"
          id="description"
          label="form.event.field.description.label"
          required
          error={errors.description}
          touched={touched.description}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <FormattedMessage tagName="h3" id="form.event.title.time_and_place" />
      </Col>
    </Row>
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
          <Areas />
        </Select>
      </Col>
    </Row>
    <Row>
      <Col sm="10" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
        <MapContainer>
          <Map
            id="location"
            error={errors.location}
            handleChange={handleChange}
            value={values.location}
          />
        </MapContainer>
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 4, offset: 1 }}>
        <Input
          type="text"
          id="startdate"
          label="form.event.field.startdate.label"
          placeholder="form.event.field.startdate.placeholder"
          required
          error={errors.startdate}
          touched={touched.startdate}
          value={values.startdate}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
      <Col sm="12" md={{ size: 4 }}>
        <Input
          type="text"
          id="enddate"
          label="form.event.field.enddate.label"
          placeholder="form.event.field.enddate.placeholder"
          required
          error={errors.enddate}
          touched={touched.enddate}
          value={values.enddate}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 4, offset: 1 }}>
        <Input
          type="text"
          id="starttime"
          label="form.event.field.starttime.label"
          placeholder="form.event.field.starttime.placeholder"
          required
          error={errors.starttime}
          touched={touched.starttime}
          value={values.starttime}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
      <Col sm="12" md={{ size: 4 }}>
        <Input
          type="text"
          id="endtime"
          label="form.event.field.endtime.label"
          placeholder="form.event.field.endtime.placeholder"
          required
          error={errors.endtime}
          touched={touched.endtime}
          value={values.endtime}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <FormattedMessage tagName="h3" id="form.event.title.contact_person" />
        <FormattedMessage tagName="p" id="form.event.subtitle.contact_person" />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 4, offset: 1 }}>
        <Input
          type="text"
          id="first_name"
          label="form.event.field.first_name.label"
          placeholder="form.event.field.first_name.placeholder"
          required
          error={errors.first_name}
          touched={touched.first_name}
          value={values.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
      <Col sm="12" md={{ size: 4 }}>
        <Input
          type="text"
          id="last_name"
          label="form.event.field.last_name.label"
          placeholder="form.event.field.last_name.placeholder"
          required
          error={errors.last_name}
          touched={touched.last_name}
          value={values.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 4, offset: 1 }}>
        <Input
          type="text"
          id="email"
          label="form.event.field.email.label"
          placeholder="form.event.field.name.placeholder"
          required
          error={errors.email}
          touched={touched.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
      <Col sm="12" md={{ size: 4 }}>
        <Input
          type="text"
          id="phone"
          label="form.event.field.phone.label"
          placeholder="form.event.field.phone.placeholder"
          required
          error={errors.phone}
          touched={touched.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <FormattedMessage tagName="p" id="form.event.field.show_contact_details.header" />
        <Checkbox
          id="show_contact_details"
          label="form.event.field.show_contact_details.label"
          error={errors.show_contact_details}
          touched={touched.show_contact_details}
          value={values.show_contact_details}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <FormattedMessage tagName="h3" id="form.event.title.others" />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
        <Input
          type="number"
          id="amount_of_volunteers"
          label="form.event.field.amount_of_volunteers.label"
          placeholder="form.event.field.amount_of_volunteers.placeholder"
          required
          error={errors.amount_of_volunteers}
          touched={touched.amount_of_volunteers}
          value={values.amount_of_volunteers}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
        <Input
          type="text"
          id="cleaning_targets"
          label="form.event.field.cleaning_targets.label"
          placeholder="form.event.field.cleaning_targets.placeholder"
          required
          error={errors.cleaning_targets}
          touched={touched.cleaning_targets}
          value={values.cleaning_targets}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
        <Input
          type="text"
          id="trash_location"
          label="form.event.field.trash_location.label"
          placeholder="form.event.field.trash_location.placeholder"
          required
          error={errors.trash_location}
          touched={touched.trash_location}
          value={values.trash_location}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 7, offset: 1 }}>
        <Input
          type="textarea"
          id="details"
          label="form.event.field.details.label"
          error={errors.details}
          touched={touched.details}
          value={values.details}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <FormattedMessage tagName="h3" id="form.event.title.tools_and_suplies" />
        <FormattedMessage tagName="p" id="form.event.subtitle.tools_and_suplies" />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <Checkbox
          id="container"
          label="form.event.field.container.label"
          error={errors.container}
          touched={touched.container}
          value={values.container}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
        <Input
          type="number"
          id="trash_bags"
          label="form.event.field.trash_bags.label"
          placeholder="form.event.field.trash_bags.placeholder"
          required
          error={errors.trash_bags}
          touched={touched.trash_bags}
          value={values.trash_bags}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
        <Input
          type="text"
          id="trash_pickers"
          label="form.event.field.trash_pickers.label"
          placeholder="form.event.field.trash_pickers.placeholder"
          required
          error={errors.trash_pickers}
          touched={touched.trash_pickers}
          value={values.trash_pickers}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <FormattedMessage tagName="h3" id="form.event.title.visibility" />
      </Col>
    </Row>
    <Row>
      <Col sm="12" md={{ size: 8, offset: 1 }}>
        <FormattedMessage tagName="p" id="form.event.field.visibility.header" />
        <Radio
          id="visibility_public"
          label="form.event.field.visibility_public.label"
          name="visibility"
          error={errors.visibility}
          touched={touched.visibility}
          checked={values.visibility === 'public'}
          value="public"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Radio
          id="visibility_private"
          label="form.event.field.visibility_private.label"
          name="visibility"
          error={errors.visibility}
          touched={touched.visibility}
          checked={values.visibility === 'private'}
          value="private"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Col>
    </Row>
  </form>
);
