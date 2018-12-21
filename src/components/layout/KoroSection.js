import React from 'react';
import classnames from 'classnames';
import './KoroSection.scss';

export default class KoroSection extends React.Component {
  static defaultProps = {
    bottom: false
  };

  render() {
    const { children, className, color } = this.props;
    const classes = classnames(className, color, 'section-koro');

    return <section className={classes}>{children}</section>;
  }
}
