import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'reactstrap';
import IntlComponent from './IntlComponent';
import Icon from './Icon';

export const Th = styled.th`
  padding: ${props => (props.large ? '1em 1em' : '0.5em 1em')};
`;

export const Td = styled.td`
  padding: ${props => (props.large ? '1em 1em' : '0.5em 1em')};
`;

export const FirstTd = styled.td`
  background: ${props => (props.selected ? 'orange' : 'none')};
  width: 5px;
`;

export const TrRow = styled.tr`
  ${props => {
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

const Table = styled.table`
  width: 100%;
`;

const HeaderText = styled.span`
  margin-right: 0.5em;
`;

const StyledIcon = styled(Icon)`
  ${({ order }) =>
    order &&
    css`
      .icon_order_${order === 'ASC' ? 'left' : 'right'}_arrow {
        stroke: red;
      }
    `}
`;

export default ({ firstColumn, headers, actionColSpan, children, setOrderBy, ordering }) => (
  <Table>
    <thead>
      <tr>
        {firstColumn && <th />}
        {headers.map(({ key, order, translation, hasOrderBy }) => (
          <Th>
            <IntlComponent Component={HeaderText} id={`site.table.header.${translation}`} />
            {hasOrderBy && (
              <Button
                block
                color="link"
                onClick={() =>
                  setOrderBy({
                    key,
                    order: order === 'ASC' ? 'DESC' : 'ASC'
                  })
                }
              >
                <StyledIcon order={order} inline name="order" height="1em" width="1em" />
              </Button>
            )}
          </Th>
        ))}
        {actionColSpan && <Th colSpan={actionColSpan} />}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
);
