import React from 'react';
import styled, { css } from 'styled-components';

import Icon from './Icon';

const Pagination = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const PaginationItem = styled.li`
  display: inline-block;

  a {
    height: 40px;
    width: 40px;
    background-color: transparent;
    color: #1a1a1a;
    border: 2px solid transparent;
    display: flex;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    svg {
      height: 25px;
      width: 25px;
    }

    &:focus {
      background-color: #f1f1f1;
      border-color: #f1f1f1;
    }
  }

  ${props => {
    if (props.selected) {
      return css`
        a {
          border-color: #1a1a1a !important;
        }
      `;
    }
    return null;
  }}
`;

export default ({ activePage, onPageClick, pageCount }) => {
  const handlePageClick = page => event => {
    event.preventDefault();
    onPageClick(page);
  };

  if (pageCount < 2) {
    return null;
  }

  return (
    <Pagination>
      <PaginationItem>
        <a href="/page-previous" onClick={handlePageClick(Math.max(activePage - 1, 1))}>
          <Icon name="angleLeft" />
        </a>
      </PaginationItem>
      {Array.from({ length: pageCount }, (v, k) => k + 1).map(page => (
        <PaginationItem key={page} selected={page === activePage}>
          <a href={`/page-${page}`} onClick={handlePageClick(page)}>
            {page}
          </a>
        </PaginationItem>
      ))}
      <PaginationItem>
        <a href="/page-next" onClick={handlePageClick(Math.min(activePage + 1, pageCount))}>
          <Icon name="angleRight" />
        </a>
      </PaginationItem>
    </Pagination>
  );
};
