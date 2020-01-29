import React from 'react';
import { injectIntl } from 'react-intl';

import Select from '../form/fields/Select';

const ContractZones = ({ contractZones, intl: { formatMessage }, onChange }) => (
  <Select
    noneSelectedText={formatMessage({ id: 'form.manage_events.field.activities.noneSelectedText' })}
    onChange={onChange}
  >
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

export default injectIntl(ContractZones);
