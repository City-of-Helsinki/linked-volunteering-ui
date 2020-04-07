import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

import formatTime from '../../../../utils/formatTime';

const StyledListItem = styled.li`
  width: 100%;
  text-align: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
    background: #f2f2f2;
  }

  &.isFocused {
    background: #eee;
  }

  &.isSelected {
    background-color: #216ba5;
    color: #fff;
    font-weight: 700;
  }
`;

interface Props {
  container: React.MutableRefObject<HTMLDivElement | null>;
  date: Date;
  id: string;
  isFocused: boolean;
  isSelected: boolean;
  locale: string;
  onClick: (date: Date) => void;
  timeFormat: string;
}

const ListItem: React.FC<Props> = ({
  container,
  date,
  id,
  isFocused,
  isSelected,
  locale,
  onClick,
  timeFormat
}) => {
  const element = React.useRef<HTMLLIElement | null>(null);

  const handleClick = () => {
    onClick(date);
  };

  React.useEffect(() => {
    // Make sure that focused option is visible
    if (isFocused && container.current && element.current) {
      const scrollTop = container.current.scrollTop || 0;
      const height = container.current.offsetHeight || 0;
      const offsetTop = element.current.offsetTop || 0;
      const elHeight = element.current.offsetHeight || 0;
      const shouldScroll = scrollTop + height < offsetTop + elHeight || scrollTop > offsetTop;

      if (shouldScroll && container.current) {
        const scrollPosition = offsetTop + elHeight / 2 - height / 2;
        container.current.scrollTop = scrollPosition;
      }
    }
  }, [container, isFocused]);

  React.useEffect(() => {
    // Make sure that focused option is visible
    if (isFocused && element.current) {
      element.current.focus();
    }
  }, [isFocused]);

  return (
    <StyledListItem
      ref={element}
      role="option"
      id={id}
      tabIndex={-1}
      className={classNames({
        isFocused: isFocused,
        isSelected: isSelected
      })}
      onClick={handleClick}
      aria-selected={isFocused}
    >
      <span>{formatTime(date, timeFormat, locale)}</span>
    </StyledListItem>
  );
};

export default ListItem;
