import React from 'react';
import Select from '../form/fields/Select';

const Neighborhoods = ({ neighborhoods, onChange }) => (
  <Select onChange={onChange}>
    {neighborhoods.valueSeq().map(neighborhood => (
      <option key={neighborhood.ocd_id} value={neighborhood.ocd_id}>
        {neighborhood.name.fi}
      </option>
    ))}
  </Select>
);

export default Neighborhoods;
