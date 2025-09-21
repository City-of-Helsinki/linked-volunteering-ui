import React from 'react';

interface Props {
  value: string;
}

const PrintValue: React.FC<Props> = ({ value }) => {
  return <p className="print-only">{value}</p>;
};

export default PrintValue;
