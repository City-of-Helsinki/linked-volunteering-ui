// @flow

import React from 'react';
import Svg from 'react-svg';
import helsinkiLogo from './icons/helsinki-logo.svg';
import globe from './icons/globe.svg';

const icons = {
  helsinkiLogo,
  globe
};

type Names = $Keys<typeof icons>;

type Props = {
  name: Names,
  color?: string,
  width?: string,
  height?: string,
  className?: string
};

const Icon = ({
  name,
  color: fill = 'currentColor',
  width = 'auto',
  height = 'auto',
  className
}: Props) => <Svg className={className} svgStyle={{ width, height, fill }} src={icons[name]} />;

export default Icon;
