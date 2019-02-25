import React from 'react';
import Select from '../form/fields/Select';

const ContractZones = ({ contractZones, onChange }) => (
  <Select onChange={onChange}>
    {contractZones
      .valueSeq()
      .sortBy(contractZone => contractZone.name)
      .map(contractZone => (
        <option key={contractZone.id} value={contractZone.id}>
          {contractZone.name}
        </option>
      ))}
  </Select>
);

export default ContractZones;
