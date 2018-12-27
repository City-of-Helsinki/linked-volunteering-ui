import React from 'react';

const Neighborhoods = ({ data, onChange }) => (
  <select onChange={onChange}>
    <option value="" />
    {data.valueSeq().map(neighborhood => (
      <option key={neighborhood.ocd_id} value={neighborhood.ocd_id}>
        {neighborhood.name.fi}
      </option>
    ))}
  </select>
);

export default Neighborhoods;
