import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import styled from 'styled-components';
import Icon from '../common/Icon';

const LanguageSelector = styled(DropdownToggle)`
  color: #000;
  background-color: #fff;
  box-shadow: none;
  border: 0em;
  width: 7.2em;
  text-align: right;
`;

const StyledSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & span {
    margin-left: 0.5em;
  }
`;

class LanguageDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const { intl } = this.props;

    return (
      <Dropdown size="lg" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <LanguageSelector className="btn-link">
          <StyledSelector>
            <Icon name="globe" size="2x" color="black" />
            <span>{intl.locale.toUpperCase()}</span>
          </StyledSelector>
        </LanguageSelector>
        <DropdownMenu>
          <DropdownItem>
            <Link to="/fi">
              <FormattedMessage id="site.language.fi" />
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/sv">
              <FormattedMessage id="site.language.sv" />
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/en">
              <FormattedMessage id="site.language.en" />
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default injectIntl(LanguageDropdown);
