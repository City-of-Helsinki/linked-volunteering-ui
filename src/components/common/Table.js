import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import IntlComponent from './IntlComponent';

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
        td {
          background-color: #fafafa;
        }
      }
      &:nth-of-type(2n) {
        background-color: #ffffff;
        td {
          background-color: #ffffff;
        }
      }
    `;
  }}
`;

const FirstTd = styled.td`
  background: ${props => (props.highlighted ? 'orange !important' : 'none')};
  width: 5px;
  min-width: 5px;
`;

const TableWrapper = styled.div`
  overflow: scroll;
  max-width: calc(100vw - 2rem);
`;

const Table = styled.table`
  width: 100%;

  thead tr th {
    background: #f7f7f7;
    position: sticky;
    top: 0;
    z-index: 2;

    // The first cell that lives in the top left of our spreadsheet
    &:first-of-type {
      left: 0;
      z-index: 3;
    }
    ${props => {
      if (props.firstColumn) {
        return css`
          &:nth-of-type(2) {
            left: 5px;
            z-index: 3;
          }
        `;
      }
      return null;
    }}
  }

  tbody tr td {
    &:first-of-type {
      position: sticky;
      left: 0;
      z-index: 1;
    }

    ${props => {
      if (props.firstColumn) {
        return css`
          &:nth-of-type(2) {
            position: sticky;
            left: 5px;
            z-index: 1;
          }
        `;
      }
      return null;
    }}
  }
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
  <TableWrapper>
    <Table firstColumn={firstColumn} id={id}>
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
                    prepend={getOrderIcon(order)}
                    color="link"
                    onClick={() =>
                      setOrderBy({
                        key,
                        order: order || 'ASC'
                      })
                    }
                  />
                )}
              </Th>
            );
          })}
          {actionColSpan && <Th colSpan={actionColSpan} />}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  </TableWrapper>
);
