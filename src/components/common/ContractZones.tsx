import React from 'react';
import { useIntl } from 'react-intl';

import Select from '../form/fields/Select';
import { ContractZone } from '../../store/types';

interface ContractZonesProps {
  contractZones: Record<string, ContractZone>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContractZones: React.FC<ContractZonesProps> = ({ contractZones, onChange }) => {
  const intl = useIntl();

  return (
    <Select
      id="contactZones"
      noneSelectedText={intl.formatMessage({
        id: 'form.manage_events.field.activities.noneSelectedText',
      })}
      onChange={onChange}
    >
      {Object.keys(contractZones)
        .sort((a, b) => contractZones[a].name.localeCompare(contractZones[b].name))
        .map((key) => (
          <option key={contractZones[key].id} value={contractZones[key].id}>
            {contractZones[key].name}
          </option>
        ))}
    </Select>
  );
};

export default ContractZones;
