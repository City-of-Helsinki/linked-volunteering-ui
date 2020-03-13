import { useHistory, useLocation } from 'react-router';
import React from 'react';
import { useIntl } from 'react-intl';
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
  text-align: right;
`;

const StyledDropdown = styled(Dropdown)`
  button {
    padding: 0;
  }
`;

const StyledSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > span:last-of-type {
    margin-left: 0.5em;
  }
`;

const NavigationIcon = styled(Icon)`
  margin-right: 0.25rem;

  svg {
    height: 1.5em;
    width: 2em;

    ${responsive.md`
      height: 2em;
    `}
  }
`;

const DropdownIcon = styled(Icon)`
  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

const LanguageDropdown: React.FC = () => {
  const intl = useIntl();
  const { formatMessage, locale } = intl;
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeLanguage = (language: string) => (event: any) => {
    const url = pathname.startsWith(`/${locale}`)
      ? pathname.replace(`/${locale}`, `/${language}`)
      : `/${language}${pathname}`;

    event.preventDefault();
    push(url);
  };

  return (
    <StyledDropdown size="lg" isOpen={dropdownOpen} toggle={toggle}>
      <LanguageSelector
        aria-label={formatMessage({ id: 'site.language.changeLanguage' })}
        color="link"
      >
        <StyledSelector>
          <NavigationIcon name="globe" color="black" />
          <span>{intl.locale.toUpperCase()}</span>
          <DropdownIcon name={'angleUp'} color="black" rotate={dropdownOpen ? '0' : '180'} />
        </StyledSelector>
      </LanguageSelector>
      <DropdownMenu positionFixed={true}>
        <IntlComponent
          Component={DropdownItem}
          href="/fi"
          onClick={changeLanguage('fi')}
          id="site.language.fi"
          lang="fi"
        />
        <IntlComponent
          Component={DropdownItem}
          href="/sv"
          onClick={changeLanguage('sv')}
          id="site.language.sv"
          lang="sv"
        />
        <IntlComponent
          Component={DropdownItem}
          href="/en"
          onClick={changeLanguage('en')}
          id="site.language.en"
          lang="en"
        />
      </DropdownMenu>
    </StyledDropdown>
  );
};

export default LanguageDropdown;
