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

const TopNavbar = styled(Navbar)`
  background-color: #fff;
  border-bottom: 1px solid #aaa;
  height: 3.5em;
  & a {
    color: #000;
  }
  & a:hover {
    text-decoration: none;
    color: #000;
  }
`;

const Content = styled(KoroSection).attrs({
  bottom: true,
  color: 'fog'
})``;

const Layout = ({ children }: Props) => (
  <Fragment>
    <TopNavbar expand="md">
      <NavbarBrand href="/">
        <Icon name="helsinkiLogo" width="90px" color="#000" />
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <LanguageDropdown />
      </Nav>
    </TopNavbar>
    <Content>{children}</Content>
    <KoroSection bottom color="green">
      <Footer />
    </KoroSection>
  </Fragment>
);

export default Layout;
