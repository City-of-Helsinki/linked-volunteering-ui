import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Ordering } from '../../utils/entities/ordering';
import Button from './Button';
import IntlComponent from './IntlComponent';

interface Header {
  key: string;
  translation: string;
  hasOrderBy: boolean;
}

interface TableProps {
  id: string;
  firstColumn?: boolean;
  headers: Header[];
  actionColSpan?: number;
  children: ReactNode;
  setOrderBy: (order: { key: string; order: 'ASC' | 'DESC' }) => void;
  ordering: Ordering;
}

interface TrProps {
  firstColumn?: boolean;
  highlighted?: boolean;
  children: ReactNode;
  [key: string]: any;
}

interface DetailsRowProps {
  children: ReactNode;
  colSpan: number;
  [key: string]: any;
}

const StyledTr = styled.tr`
  ${(props: any) => {
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

const StyledFirstTd = styled.td<{ highlighted?: boolean }>`
  background: ${(props) => (props.highlighted ? 'orange !important' : 'none')};
  width: 5px;
  min-width: 5px;
`;

const StyledTableWrapper = styled.div`
  overflow: auto;
  max-width: calc(100vw - 2rem);
`;

const StyledTable = styled.table<{ firstColumn?: boolean }>`
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
    ${(props) => {
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

    ${(props) => {
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

const StyledHeaderText = styled.span`
  margin-right: 0.5em;
`;

export const StyledTh = styled.th`
  padding: ${(props: any) => (props.large ? '1em 1em' : '0.5em 1em')};
`;

export const StyledTd = styled.td<{ large?: boolean }>`
  padding: ${(props) => (props.large ? '1em 1em' : '0.5em 1em')};
`;

export function Tr({ firstColumn, highlighted, children, ...rest }: TrProps) {
  return (
    <StyledTr {...rest}>
      {firstColumn && <StyledFirstTd highlighted={highlighted} />}
      {children}
    </StyledTr>
  );
}

export function DetailsRow({ children, colSpan, ...rest }: DetailsRowProps) {
  return (
    <Tr firstColumn white {...rest}>
      <StyledTd colSpan={colSpan} large>
        {children}
      </StyledTd>
    </Tr>
  );
}

const getOrder = (key: string, ordering: Ordering) => {
  if (key === ordering.key) {
    return ordering.order === 'ASC' ? 'DESC' : 'ASC';
  }
  return null;
};

const getOrderIcon = (order: string) => {
  switch (order) {
    case 'ASC':
      return 'orderAsc';
    case 'DESC':
      return 'orderDesc';
    default:
      return 'order';
  }
};

const Table: React.FC<TableProps> = ({
  id,
  firstColumn,
  headers,
  actionColSpan,
  children,
  setOrderBy,
  ordering,
}) => {
  return (
    <StyledTableWrapper>
      <StyledTable firstColumn={firstColumn} id={id} data-testid={id}>
        <thead>
          <StyledTr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {firstColumn && <th />}
            {headers.map(({ key, translation, hasOrderBy }) => {
              const order = getOrder(key, ordering);

              return (
                <StyledTh key={key}>
                  <IntlComponent
                    Component={StyledHeaderText}
                    id={`site.table.header.${translation}`}
                  />
                  {hasOrderBy && (
                    <Button
                      prepend={getOrderIcon(order ?? 'ASC')}
                      color="link"
                      onClick={() => setOrderBy({ key, order: order || 'ASC' })}
                      aria-label={order || 'ASC'}
                    />
                  )}
                </StyledTh>
              );
            })}
            {actionColSpan && <StyledTh colSpan={actionColSpan} />}
          </StyledTr>
        </thead>
        <tbody>{children}</tbody>
      </StyledTable>
    </StyledTableWrapper>
  );
};

export default Table;
