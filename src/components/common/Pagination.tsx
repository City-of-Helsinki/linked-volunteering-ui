import React from 'react';
import styled, { css } from 'styled-components';

import Icon from './Icon';

const Pagination = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const PaginationItem = styled.li<{ selected?: boolean }>`
  display: inline-flex;

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

  ${(props) => {
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

type PaginationProps = {
  activePage: number;
  onPageClick: (page: number) => void;
  pageCount: number;
};

const PaginationComponent: React.FC<PaginationProps> = ({ activePage, onPageClick, pageCount }) => {
  const handlePageClick = (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onPageClick(page);
  };

  if (pageCount < 2) {
    return null;
  }

  return (
    <Pagination>
      <PaginationItem>
        <a
          href="/page-previous"
          onClick={handlePageClick(Math.max(activePage - 1, 1))}
          aria-label={activePage === 1 ? 'First page' : 'Previous page'}
        >
          <Icon name="angleLeft" />
        </a>
      </PaginationItem>
      {Array.from({ length: pageCount }, (_v, k) => k + 1).map((page) => (
        <PaginationItem key={page} selected={page === activePage}>
          <a
            href={`/page-${page}`}
            onClick={handlePageClick(page)}
            aria-label={page === activePage ? `Current page, page ${page}` : `Go to page ${page}`}
          >
            {page}
          </a>
        </PaginationItem>
      ))}
      <PaginationItem>
        <a
          href="/page-next"
          onClick={handlePageClick(Math.min(activePage + 1, pageCount))}
          aria-label={activePage === pageCount ? 'Last page' : 'Next page'}
        >
          <Icon name="angleRight" />
        </a>
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
