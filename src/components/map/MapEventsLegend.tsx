import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
`;

const LegendTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
`;

const ColorIndicator = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
`;

const MapEventsLegend: React.FC = () => {
  return (
    <LegendContainer>
      <LegendTitle>
        <FormattedMessage id="map.legend.title" />
      </LegendTitle>
      <LegendItem>
        <ColorIndicator color="#00d7a7" />
        <FormattedMessage id="map.legend.upcoming" />
      </LegendItem>
      <LegendItem>
        <ColorIndicator color="#999999" />
        <FormattedMessage id="map.legend.past" />
      </LegendItem>
    </LegendContainer>
  );
};

export default MapEventsLegend;
