// @flow
import React, { type Node } from 'react';
import classnames from 'classnames';
// $FlowFixMe
import './KoroSection.scss';

type Props = {
  className?: string,
  children?: Node,
  color: 'green' | 'white'
};

export default class KoroSection extends React.Component<Props> {
  static defaultProps = {
    bottom: false
  };

  render() {
    const { children, className, color } = this.props;
    const classes = classnames(className, color, 'section-koro');

    return <section className={classes}>{children}</section>;
  }
}
