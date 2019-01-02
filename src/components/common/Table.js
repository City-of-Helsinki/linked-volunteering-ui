import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'reactstrap';
import IntlComponent from './IntlComponent';
import Icon from './Icon';

const StyledTr = styled.tr`
  ${props => {
    if (props.white) {
      return css`
        background-color: white;
      `;
    }
    if (props.selected) {
      return css`
        background-color: #ebebeb;
      `;
    }
    return css`
      &:nth-of-type(2n + 1) {
        background-color: #fafafa;
      }
      &:nth-of-type(2n) {
        background-color: #ffffff;
      }
    `;
  }}
`;

const FirstTd = styled.td`
  background: ${props => (props.highlighted ? 'orange' : 'none')};
  width: 5px;
`;

const Table = styled.table`
  width: 100%;
`;

const HeaderText = styled.span`
  margin-right: 0.5em;
`;

export const Th = styled.th`
  padding: ${props => (props.large ? '1em 1em' : '0.5em 1em')};
`;

export const Td = styled.td`
  padding: ${props => (props.large ? '1em 1em' : '0.5em 1em')};
`;

export const Tr = ({ firstColumn, highlighted, children, ...rest }) => (
  <StyledTr {...rest}>
    {firstColumn && <FirstTd highlighted={highlighted} />}
    {children}
  </StyledTr>
);

export const DetailsRow = ({ children, colSpan, ...rest }) => (
  <Tr firstColumn white {...rest}>
    <Td colSpan={colSpan} large>
      {children}
    </Td>
  </Tr>
);

const getOrder = (key, ordering) => {
  if (key === ordering.key) {
    return ordering.order === 'ASC' ? 'DESC' : 'ASC';
  }
  return null;
};

const getOrderIcon = order => {
  switch (order) {
    case 'ASC':
      return 'orderAsc';
    case 'DESC':
      return 'orderDesc';
    default:
      return 'order';
  }
};

export default ({ id, firstColumn, headers, actionColSpan, children, setOrderBy, ordering }) => (
  <Table id={id}>
    <thead>
      <tr>
        {firstColumn && <th />}
        {headers.map(({ key, translation, hasOrderBy }) => {
          const order = getOrder(key, ordering);
          return (
            <Th key={key}>
              <IntlComponent Component={HeaderText} id={`site.table.header.${translation}`} />
              {hasOrderBy && (
                <Button
                  color="link"
                  onClick={() =>
                    setOrderBy({
                      key,
                      order: order || 'ASC'
                    })
                  }
                >
                  <Icon inline name={getOrderIcon(order)} height="1em" width="1em" />
                </Button>
              )}
            </Th>
          );
        })}
        {actionColSpan && <Th colSpan={actionColSpan} />}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
);
