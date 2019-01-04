import React from 'react';
import styled, { css } from 'styled-components';
import Svg from 'react-svg';

import angleDown from 'hel-icons/dist/shapes/angle-down.svg';
import angleLeft from 'hel-icons/dist/shapes/angle-left.svg';
import angleRight from 'hel-icons/dist/shapes/angle-right.svg';
import angleUp from 'hel-icons/dist/shapes/angle-up.svg';
import arrowDown from 'hel-icons/dist/shapes/arrow-down.svg';
import arrowLeft from 'hel-icons/dist/shapes/arrow-left.svg';
import arrowRight from 'hel-icons/dist/shapes/arrow-right.svg';
import arrowUp from 'hel-icons/dist/shapes/arrow-up.svg';
import ban from 'hel-icons/dist/shapes/ban.svg';
import bars from 'hel-icons/dist/shapes/bars.svg';
import book from 'hel-icons/dist/shapes/book.svg';
import calendar from 'hel-icons/dist/shapes/calendar.svg';
import check from 'hel-icons/dist/shapes/check.svg';
import click from 'hel-icons/dist/shapes/clock-o.svg';
import commenting from 'hel-icons/dist/shapes/commenting-o.svg';
import globe from 'hel-icons/dist/shapes/globe.svg';
import heart from 'hel-icons/dist/shapes/heart-o.svg';
import helsinkiLogo from 'hel-icons/dist/shapes/helsinki-logo.svg';
import home from 'hel-icons/dist/shapes/home.svg';
import lips from 'hel-icons/dist/shapes/lips.svg';
import mapMarker from 'hel-icons/dist/shapes/map-marker.svg';
import map from 'hel-icons/dist/shapes/map.svg';
import pencil from 'hel-icons/dist/shapes/pencil.svg';
import quiteRight from 'hel-icons/dist/shapes/quote-right.svg';
import search from 'hel-icons/dist/shapes/search.svg';
import shapeAlt from 'hel-icons/dist/shapes/share-alt.svg';
import smile from 'hel-icons/dist/shapes/smile-o.svg';
import sync from 'hel-icons/dist/shapes/sync.svg';
import ticket from 'hel-icons/dist/shapes/ticket.svg';
import timesCircle from 'hel-icons/dist/shapes/times-circle-o.svg';
import times from 'hel-icons/dist/shapes/times.svg';
import trash from 'hel-icons/dist/shapes/trash-o.svg';
import twitter from 'hel-icons/dist/shapes/twitter.svg';
import user from 'hel-icons/dist/shapes/user-o.svg';

import order from './icons/order.svg';
import orderAsc from './icons/order_asc.svg';
import orderDesc from './icons/order_desc.svg';
import oval from './icons/oval.svg';

const icons = {
  angleDown,
  angleLeft,
  angleRight,
  angleUp,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  ban,
  bars,
  book,
  calendar,
  check,
  click,
  commenting,
  globe,
  heart,
  helsinkiLogo,
  home,
  lips,
  mapMarker,
  map,
  pencil,
  quiteRight,
  search,
  shapeAlt,
  smile,
  sync,
  ticket,
  timesCircle,
  times,
  trash,
  twitter,
  user,
  order,
  orderAsc,
  orderDesc,
  oval
};

export const StyledSvg = styled(Svg)`
  line-height: 1;

  svg {
    fill: ${props => props.fill || 'currentColor'};
    transform: rotate(${props => props.rotate || 0}deg);

    ${props => {
      if (typeof props.size === 'string' && props.size.endsWith('x')) {
        return css`
          width: ${parseFloat(props.size)}em;
          height: ${parseFloat(props.size)}em;
        `;
      }
      return css`
        width: 1em;
        height: 1em;
      `;
    }}
  }
`;

const Icon = ({ name, color: fill, size, className, rotate }) => {
  const src = icons[name];
  if (!src) {
    // eslint-disable-next-line no-console
    console.error('missing icon', name);
  }
  return (
    <StyledSvg
      className={className}
      wrapper="span"
      fill={fill}
      size={size}
      rotate={rotate}
      src={src}
    />
  );
};

const StyledWithIcons = styled.span`
  white-space: nowrap;
  ${StyledSvg} {
    &:first-child {
      margin-right: 0.4em;
    }
    &:last-child {
      margin-left: 0.4em;
    }
  }
`;

export const WithIcons = ({ append, prepend, children, component, ...rest }) => {
  const prependProps = typeof prepend === 'string' ? { name: prepend } : prepend;
  const appendProps = typeof append === 'string' ? { name: append } : append;
  return (
    <StyledWithIcons as={component} {...rest}>
      {prepend && <Icon {...prependProps} />}
      {children}
      {append && <Icon {...appendProps} />}
    </StyledWithIcons>
  );
};

export default Icon;
