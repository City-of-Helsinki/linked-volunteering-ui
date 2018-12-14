// @flow

import React from 'react';
import styled from 'styled-components';
import Svg from 'react-svg';
import helsinkiLogo from './icons/helsinki-logo.svg';
import globe from './icons/globe.svg';
import calendar from './icons/calendar.svg';
import arrow from './icons/arrow.svg';
import arrowLeft from './icons/arrow-left.svg';
import person from './icons/person.svg';
import fillIn from './icons/fill-in.svg';
import order from './icons/order.svg';
import close from './icons/close.svg';
import info from './icons/info.svg';
import point from './icons/point.svg';
import oval from './icons/oval.svg';
import pin from './icons/pin.svg';

const icons = {
  helsinkiLogo,
  globe,
  calendar,
  arrow,
  arrowLeft,
  person,
  fillIn,
  order,
  close,
  info,
  point,
  oval,
  pin
};

const StyledSvg = styled(Svg)`
  display: ${props => (props.inline ? 'inline-block' : 'block')}
  transform: rotate(${props => props.rotate || 0}deg);
`;

type Names = $Keys<typeof icons>;

type Props = {
  name: Names,
  color?: string,
  width?: string,
  height?: string,
  className?: string,
  rotate?: number,
  inline?: boolean
};

const Icon = ({
  name,
  color: fill = 'currentColor',
  width = 'auto',
  height = 'auto',
  className,
  rotate,
  inline
}: Props) => (
  <StyledSvg
    className={className}
    inline={inline}
    rotate={rotate}
    svgStyle={{ width, height, fill }}
    src={icons[name]}
  />
);

export default Icon;
