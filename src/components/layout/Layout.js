// @flow

import React, { Fragment, type Node } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { intlShape, injectIntl } from 'react-intl';

import Notifications from '../notification/containers/NotificationsContainer';
import LanguageDropdown from './LanguageDropdown';
import IntlComponent from '../common/IntlComponent';
import LocalizedLink from '../common/LocalizedLink';
import Icon from '../common/Icon';
import Modal from '../modal/containers/ModalContainer';
import KoroSection from './KoroSection';
import Footer from './Footer';
import userManager from '../../utils/userManager';
import type { User } from '../../types/user';

type Props = {
  children: Node,
  intl: intlShape,
  paddingTop: boolean,
  paddingBottom: boolean,
  user: User
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

const PageWrapper = styled.div`
  padding-top: ${props => (props.paddingTop ? '3em' : 0)};
  padding-bottom: ${props => (props.paddingBottom ? '3em' : 0)};
`;

const UserAction = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: none;
  background-color: none;

  & span {
    margin-left: 0.5em;
  }

  & :hover {
    cursor: pointer;
  }
`;

const Layout = ({ children, intl, paddingTop, paddingBottom, user }: Props) => (
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
        {!user && (
          <UserAction
            onClick={() => {
              userManager.signinRedirect();
            }}
          >
            <Icon name="user" width="30px" color="black" />
            <span>Kirjaudu sisään</span>
          </UserAction>
        )}

        {user && (
          <UserAction
            onClick={() => {
              console.log(userManager);
              userManager.signoutRedirect();
            }}
          >
            <Icon name="user" width="30px" color="black" />
            <span>Kirjaudu ulos</span>
          </UserAction>
        )}
      </Nav>
    </NavbarRow>
    <NavbarRow expand="md">
      <Nav navbar>
        <NavItem>
          <IntlComponent
            Component={LocalizedLink}
            className="nav-link"
            to="events/manage"
            id="site.nav.events"
          />
        </NavItem>
        <NavItem>
          <IntlComponent
            Component={LocalizedLink}
            className="nav-link"
            to="event/new"
            id="site.nav.create_event"
          />
        </NavItem>
        <NavItem>
          <IntlComponent
            Component={LocalizedLink}
            className="nav-link"
            to="report"
            id="site.nav.report"
          />
        </NavItem>
      </Nav>
    </NavbarRow>
    <Content>
      <PageWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
        {children}
      </PageWrapper>
      <KoroSection color="green" />
      <Footer />
    </Content>
    <Notifications />
    <Modal />
  </Fragment>
);

export default injectIntl(Layout);
