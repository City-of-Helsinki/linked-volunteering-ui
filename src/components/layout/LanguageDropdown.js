import React from 'react';
import { injectIntl } from 'react-intl';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import styled from 'styled-components';
import IntlComponent from '../common/IntlComponent';
import Icon from '../common/Icon';
import responsive from '../../utils/responsive';

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

const NavigationIcon = styled(Icon)`
  svg {
    height: 1.5em;
    width: 2em;

    ${responsive.md`
      height: 2em;
    `}
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
            <NavigationIcon name="globe" color="black" />
            <span>{intl.locale.toUpperCase()}</span>
          </StyledSelector>
        </LanguageSelector>
        <DropdownMenu>
          <IntlComponent Component={DropdownItem} href="/fi" id="site.language.fi" />
          <IntlComponent Component={DropdownItem} href="/sv" id="site.language.sv" />
          <IntlComponent Component={DropdownItem} href="/en" id="site.language.en" />
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default injectIntl(LanguageDropdown);
