// @flow

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import styled from 'styled-components';

import LanguageDropdown from './LanguageDropdown';
import Icon from '../common/Icon';
import KoroSection from './KoroSection';
import Footer from './Footer';

type Props = {
  children: any
};

const Content = styled.div`
  background-color: ${props => props.theme.colors.lightGray};
`;

const NavbarRow = styled(Navbar)`
  background-color: ${props => props.theme.helWhite};
  padding-left: 7em;
  padding-right: 7em;
  border-bottom: 1px solid ${props => props.theme.helGray};
  height: 3.5em;
  & a {
    color: ${props => props.theme.helBlack};
  }
  & a:hover {
    text-decoration: none;
    color: ${props => props.theme.helBlack};
  }
`;

const Layout = ({ children }: Props) => (
  <Fragment>
    <NavbarRow expand="md">
      <NavbarBrand href="/">
        <Icon name="helsinkiLogo" width="90px" color="#000" />
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <LanguageDropdown />
      </Nav>
    </NavbarRow>
    <NavbarRow expand="md">
      <Nav>Ilmoita tapahtuma</Nav>
    </NavbarRow>
    <Content>
      <div>{children}</div>
      <KoroSection bottom color="green">
        <Footer />
      </KoroSection>
    </Content>
  </Fragment>
);

export default Layout;
