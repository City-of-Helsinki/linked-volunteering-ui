import React from 'react';
import { injectIntl } from 'react-intl';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import styled from 'styled-components';
import LocalizedLink from '../common/LocalizedLink';
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
            <LocalizedLink to="/fi" id="site.language.fi" />
          </DropdownItem>
          <DropdownItem>
            <LocalizedLink to="/sv" id="site.language.sv" />
          </DropdownItem>
          <DropdownItem>
            <LocalizedLink to="/en" id="site.language.en" />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default injectIntl(LanguageDropdown);
