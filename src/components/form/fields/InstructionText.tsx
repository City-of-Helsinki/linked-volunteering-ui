import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import responsive from '../../../utils/responsive';

export const StyledFormText = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.helBlack};

  ${responsive.lg`
    min-width: 550px;
  `}
`;

interface Props {
  text: string;
}

const InstructionText: React.FC<Props> = ({ text }) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  return (
    <StyledFormText>
      {formatMessage({ id: text })
        .split('\n')
        .map((item, key) => {
          return (
            <React.Fragment key={key}>
              {item}
              <br />
            </React.Fragment>
          );
        })}
    </StyledFormText>
  );
};

export default InstructionText;
