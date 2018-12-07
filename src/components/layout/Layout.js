// @flow

import React, { Fragment, type Node } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { intlShape, injectIntl } from 'react-intl';

import LanguageDropdown from './LanguageDropdown';
import IntlComponent from '../common/IntlComponent';
import LocalizedLink from '../common/LocalizedLink';
import Icon from '../common/Icon';
import KoroSection from './KoroSection';
import Footer from './Footer';

type Props = {
  children: Node,
  intl: intlShape
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

const FooterKoro = styled(KoroSection)`
  margin-top: 4em;
`;

const Layout = ({ children, intl }: Props) => (
  <Fragment>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{intl.formatMessage({ id: 'site.meta.title' })}</title>
    </Helmet>
    <NavbarRow expand="md">
      <NavbarBrand href="/">
        <Icon name="helsinkiLogo" width="90px" color="#000" />
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <LanguageDropdown />
      </Nav>
    </NavbarRow>
    <NavbarRow expand="md">
      <Nav navbar>
        <NavItem>
          <IntlComponent
            Component={LocalizedLink}
            className="nav-link"
            to="/fi/new-event"
            id="site.nav.create_event"
          />
        </NavItem>
        <NavItem>
          <IntlComponent
            Component={LocalizedLink}
            className="nav-link"
            to="/fi/report"
            id="site.nav.report"
          />
        </NavItem>
      </Nav>
    </NavbarRow>
    <Content>
      {children}
      <FooterKoro bottom color="green">
        <Footer />
      </FooterKoro>
    </Content>
  </Fragment>
);

export default injectIntl(Layout);
