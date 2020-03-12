import React from 'react';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import InstructionText from './fields/InstructionText.tsx';
import Input from './fields/Input.tsx';
import DateRange from './partitions/DateRange.tsx';
import Location from './partitions/Location.tsx';

const LocationInstructions = styled(Row)`
  margin-bottom: 1em;
`;

export default ({
  addressCoordinates,
  clearCoordinatesByAddress,
  getCoordinatesByAddress,
  getGeoData,
  selectedAddress,
  selectedContractZone,
  values,
  unavailableDates,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
  setFieldError
}) => {
  return (
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
            text="form.event.field.name.info"
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
            text="form.event.field.description.info"
            error={errors.description}
            touched={touched.description}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
          <Input
            type="number"
            id="estimated_attendee_count"
            label="form.event.field.amount_of_volunteers.label"
            placeholder="form.event.field.amount_of_volunteers.placeholder"
            min={0}
            error={errors.estimated_attendee_count}
            touched={touched.estimated_attendee_count}
            value={values.estimated_attendee_count}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }}>
          <FormattedMessage tagName="h3" id="form.event.title.place" />
        </Col>
      </Row>
      <LocationInstructions>
        <Col sm="12" md={{ size: 8, offset: 1 }}>
          <InstructionText text="form.event.new.location_instructions" />
        </Col>
      </LocationInstructions>
      <Location
        addressFeatures={addressCoordinates ? addressCoordinates.features : []}
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        setFieldError={setFieldError}
        errors={errors}
        touched={touched}
        values={values}
        clearCoordinatesByAddress={clearCoordinatesByAddress}
        getCoordinatesByAddress={getCoordinatesByAddress}
        getGeoData={getGeoData}
        handleChange={handleChange}
        handleBlur={handleBlur}
        selectedAddress={selectedAddress}
        selectedContractZone={selectedContractZone}
      />
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
          <Input
            type="text"
            id="targets"
            label="form.event.field.cleaning_targets.label"
            placeholder="form.event.field.cleaning_targets.placeholder"
            text="form.event.field.cleaning_targets.info"
            error={errors.targets}
            touched={touched.targets}
            value={values.targets}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }}>
          <FormattedMessage tagName="h3" id="form.event.title.time" />
          <FormattedMessage tagName="p" id="form.event.subtitle.time" />
        </Col>
      </Row>
      <DateRange
        errors={errors}
        touched={touched}
        values={values}
        unavailableDates={unavailableDates ? unavailableDates.map(date => new Date(date)) : []}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
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
            id="organizer_first_name"
            label="form.event.field.first_name.label"
            placeholder="form.event.field.first_name.placeholder"
            error={errors.organizer_first_name}
            touched={touched.organizer_first_name}
            value={values.organizer_first_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
        <Col sm="12" md={{ size: 4 }}>
          <Input
            type="text"
            id="organizer_last_name"
            label="form.event.field.last_name.label"
            placeholder="form.event.field.last_name.placeholder"
            error={errors.organizer_last_name}
            touched={touched.organizer_last_name}
            value={values.organizer_last_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 4, offset: 1 }}>
          <Input
            type="text"
            id="organizer_email"
            label="form.event.field.email.label"
            placeholder="form.event.field.email.placeholder"
            error={errors.organizer_email}
            touched={touched.organizer_email}
            value={values.organizer_email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
        <Col sm="12" md={{ size: 4 }}>
          <Input
            type="text"
            id="organizer_phone"
            label="form.event.field.phone.label"
            placeholder="form.event.field.phone.placeholder"
            error={errors.organizer_phone}
            touched={touched.organizer_phone}
            value={values.organizer_phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 8, offset: 1 }}>
          <Input
            type="textarea"
            id="additional_information"
            label="form.event.field.details.label"
            text="form.event.field.details.info"
            error={errors.additional_information}
            touched={touched.additional_information}
            value={values.additional_information}
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
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
          <Input
            type="number"
            id="large_trash_bag_count"
            label="form.event.field.trash_bags.label"
            placeholder="form.event.field.trash_bags.placeholder"
            min={0}
            error={errors.large_trash_bag_count}
            touched={touched.large_trash_bag_count}
            value={values.large_trash_bag_count}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
          <Input
            type="number"
            id="small_trash_bag_count"
            label="form.event.field.small_trash_bags.label"
            placeholder="form.event.field.small_trash_bags.placeholder"
            min={0}
            error={errors.small_trash_bag_count}
            touched={touched.small_trash_bag_count}
            value={values.small_trash_bag_count}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 1 }} lg={{ size: 5, offset: 1 }}>
          <Input
            type="number"
            id="trash_picker_count"
            label="form.event.field.trash_pickers.label"
            placeholder="form.event.field.trash_pickers.placeholder"
            text="form.event.field.trash_pickers.info"
            min={0}
            error={errors.trash_picker_count}
            touched={touched.trash_picker_count}
            value={values.trash_picker_count}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
    </form>
  );
};
