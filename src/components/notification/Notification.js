import React, { PureComponent } from 'react';
import { Alert } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  .close {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: 0.5;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    cursor: pointer;
  }
`;

class Notification extends PureComponent {
  componentDidMount() {
    const { onDismiss } = this.props;
    const timer = setTimeout(onDismiss, 3000);
    this.setState(() => ({ timer }));
  }

  onDismiss = () => {
    const { timer } = this.state;
    const { onDismiss } = this.props;
    clearTimeout(timer);
    onDismiss();
  };

  render() {
    const { children, color, values } = this.props;
    return (
      <StyledAlert color={color} toggle={this.onDismiss} fade>
        <FormattedMessage id={children} values={values} />
      </StyledAlert>
    );
  }
}

export default Notification;
