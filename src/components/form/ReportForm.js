import React from 'react';
import Select from './fields/Select';

export default ({ values, errors, touched, onChange, handleBlur, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Select
      id="area"
      label="form.report.field.year.label"
      required
      error={errors.area}
      touched={touched.area}
      value={values.area}
      onChange={onChange}
      onBlur={handleBlur}
    >
      <option value="2019">2019</option>
      <option value="2018">2018</option>
      <option value="2017">2017</option>
    </Select>
  </form>
);
