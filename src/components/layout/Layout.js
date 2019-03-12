import React, { Fragment } from 'react';
import { Container, Navbar, NavbarBrand, Nav } from 'reactstrap';
import styled from 'styled-components';
import { injectIntl, FormattedMessage } from 'react-intl';

import Notifications from '../notification/containers/NotificationsContainer';
import LanguageDropdown from './LanguageDropdown';
import LocalizedLink from '../common/LocalizedLink';
import Icon from '../common/Icon';
import Modal from '../modal/containers/ModalContainer';
import KoroSection from './KoroSection';
import Footer from './Footer';
import userManager from '../../utils/userManager';
import responsive, { ShowOnTablet } from '../../utils/responsive';

const Content = styled.div`
  background-color: ${props => props.theme.colors.lightGray};
`;

const NavbarRow = styled(Navbar)`
  background-color: ${props => props.theme.helWhite};

  & a {
    color: ${props => props.theme.helBlack};
  }
  & a:hover {
    text-decoration: none;
    color: ${props => props.theme.helBlack};
  }
`;

const TopNavbar = styled(Navbar)`
  background-color: ${props => props.theme.colors.helWhite};
  border-bottom: 1px solid ${props => props.theme.helGray};

  & a {
    color: #000;
  }
  & a:hover {
    text-decoration: none;
    color: #000;
  }
`;

const PageWrapper = styled.div`
  padding-top: ${props => (props.paddingTop ? '3em' : 0)};
  padding-bottom: ${props => (props.paddingBottom ? '3em' : 0)};
`;

const Options = styled.div`
  display: flex;
  margin-right: 1em;
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

const Links = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  & a {
    margin-right: 1em;
  }

  ${responsive.md`
    flex-direction: row;
  `}
`;

const HelsinkiIcon = styled(Icon)`
  svg {
    height: 3rem;
    width: 5rem;

    ${responsive.md`
      height: 3rem;
      width: 7rem;
    `}
  }
`;

const UserIcon = styled(Icon)`
  svg {
    height: 1.6rem;
    width: 1.6rem;

    ${responsive.sm`
      height: 2rem;
      width: 2rem;
    `}
  }
`;

const Layout = ({ children, paddingTop, paddingBottom, user, auth }) => {
  const hasUser = !!user;
  const isOfficial = auth ? auth.is_official : false;
  const isContractor = auth ? auth.is_contractor : false;

  return (
    <Fragment>
      <TopNavbar expand="md">
        <Container>
          <NavbarBrand href="/">
            <HelsinkiIcon name="helsinkiLogo" color="#000" />
          </NavbarBrand>
          <Nav navbar>
            <Options>
              <LanguageDropdown />
              {hasUser && (
                <UserAction onClick={() => userManager.signoutRedirect()}>
                  <UserIcon name="user" color="black" />
                  <FormattedMessage id="site.nav.user.logout">
                    {txt => <ShowOnTablet>{txt}</ShowOnTablet>}
                  </FormattedMessage>
                </UserAction>
              )}
            </Options>
          </Nav>
        </Container>
      </TopNavbar>

      <TopNavbar expand="md">
        <Container>
          <NavbarRow>
            <Links>
              <LocalizedLink to="event/new" translate="site.nav.create_event" />
              {hasUser && (
                <Fragment>
                  {(isOfficial || isContractor) && (
                    <LocalizedLink to="admin/events/manage" translate="site.nav.manage_events" />
                  )}
                  {isOfficial && <LocalizedLink to="admin/report" translate="site.nav.report" />}
                </Fragment>
              )}
            </Links>
          </NavbarRow>
        </Container>
      </TopNavbar>

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
