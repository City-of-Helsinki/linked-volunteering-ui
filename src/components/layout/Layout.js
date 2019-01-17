import React, { Fragment } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { injectIntl, FormattedMessage } from 'react-intl';

import Notifications from '../notification/containers/NotificationsContainer';
import LanguageDropdown from './LanguageDropdown';
import LocalizedLink from '../common/LocalizedLink';
import Icon from '../common/Icon';
import Modal from '../modal/containers/ModalContainer';
import KoroSection from './KoroSection';
import Footer from './Footer';
import userManager from '../../utils/userManager';

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

const Layout = ({ children, intl, paddingTop, paddingBottom, user }) => {
  const hasUser = !!user;
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{intl.formatMessage({ id: 'site.meta.title' })}</title>
      </Helmet>
      <NavbarRow expand="md">
        <NavbarBrand href="/">
          <Icon name="helsinkiLogo" size="7x" color="#000" />
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <LanguageDropdown />
          <UserAction
            onClick={() => {
              if (hasUser) {
                userManager.signoutRedirect();
              } else {
                userManager.signinRedirect();
              }
            }}
          >
            <Icon name="user" size="2x" color="black" />
            <FormattedMessage id={`site.nav.user.${hasUser ? 'logout' : 'login'}`} />
          </UserAction>
        </Nav>
      </NavbarRow>
      <NavbarRow expand="md">
        <Nav navbar>
          <NavItem>
            <LocalizedLink className="nav-link" to="event/new" translate="site.nav.create_event" />
          </NavItem>
          {hasUser && (
            <Fragment>
              <NavItem>
                <LocalizedLink
                  className="nav-link"
                  to="admin/events/manage"
                  translate="site.nav.manage_events"
                />
              </NavItem>
              <NavItem>
                <LocalizedLink className="nav-link" to="admin/report" translate="site.nav.report" />
              </NavItem>
            </Fragment>
          )}
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
};

export default injectIntl(Layout);
