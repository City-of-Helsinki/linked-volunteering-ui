import { Koros } from 'hds-react';
import React, { Fragment } from 'react';
import { Container, Navbar } from 'reactstrap';
import styled from 'styled-components';
import { useIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import Notifications from '../notification/containers/NotificationsContainer';
import LanguageDropdown from './LanguageDropdown';
import LocalizedLink from '../common/LocalizedLink';
import Icon from '../common/Icon';
import HelsinkiLogo from '../icons/HelsinkiLogo';
import Modal from '../modal/containers/ModalContainer';
import Footer from './Footer';
import userManager from '../../utils/userManager';
import responsive from '../../utils/responsive';
import useLocale from '../../hooks/useLocale';

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100vh;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray};
`;

const NavbarBrand = styled(Link)`
  font-weight: 500;
  letter-spacing: 0.03em;
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1rem;
  line-height: inherit;
  white-space: nowrap;
`;

const NavbarRow = styled(Navbar)`
  background-color: ${(props) => props.theme.helWhite};
  padding-left: 0;
  padding-right: 0;

  & a {
    color: ${(props) => props.theme.helBlack};
  }
  & a:hover {
    text-decoration: none;
    color: ${(props) => props.theme.helBlack};
  }
`;

const TopNavbar = styled(Navbar)`
  background-color: ${(props) => props.theme.colors.helWhite};
  border-bottom: 1px solid ${(props) => props.theme.helGray};
  padding: 0.5rem 0;

  & a {
    color: #000;
    white-space: normal;
  }
  & a:hover {
    text-decoration: none;
    color: #000;
  }
`;

const NavbarContainer = styled(Container)`
  padding: 0 0.9375rem;

  ${responsive.sm`
    padding: 0;
  `}
`;

interface PageWrapperProps {
  paddingBottom: boolean;
  paddingTop: boolean;
}

const PageWrapper = styled.div`
  padding-top: ${(props: PageWrapperProps) => (props.paddingTop ? '3em' : 0)};
  padding-bottom: ${(props: PageWrapperProps) => (props.paddingBottom ? '3em' : 0)};
`;

const Options = styled.div`
  display: flex;
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

const StyledHelsinkiLogo = styled(HelsinkiLogo)`
  height: 2.5rem;
  width: 5.5rem;
`;

const AppName = styled.div`
  display: none;
  font-weight: bold;
  font-size: 1.17em;
  margin: 0 0 0 30px;

  ${responsive.md`
    display: inline-flex;
  `}
`;

const UserIcon = styled(Icon)`
  margin-right: 0.25rem;

  svg {
    height: 1.6rem;
    width: 1.6rem;

    ${responsive.sm`
      height: 2rem;
      width: 2rem;
    `}
  }
`;

const KoroSection = styled(Koros)`
  position: absolute;
  margin-top: -1.25rem;

  svg {
    fill: ${(props) => props.theme.helCopper};
    height: 1.25rem;
  }
`;

interface Props {
  children?: any;
  auth?: any;
  paddingBottom?: boolean;
  paddingTop?: boolean;
  user?: any;
}

const Layout: React.FC<Props> = ({
  children,
  paddingTop = false,
  paddingBottom = false,
  user,
  auth,
}) => {
  const locale = useLocale();
  const intl = useIntl();
  const { formatMessage } = intl;
  const hasUser = !!user;
  const isOfficial = auth ? auth.is_official : false;
  const isContractor = auth ? auth.is_contractor : false;

  return (
    <LayoutWrapper>
      {/* Set min-height to navbar to prevent page jumping */}
      <TopNavbar style={{ minHeight: '77px' }}>
        <NavbarContainer>
          <NavbarBrand to={`/${locale}`} aria-label={formatMessage({ id: 'site.nav.logo.text' })}>
            <StyledHelsinkiLogo />
            <AppName>{formatMessage({ id: 'site.nav.appName' })}</AppName>
          </NavbarBrand>
          <NavbarRow>
            <Options>
              <LanguageDropdown />
              {hasUser && (
                <UserAction onClick={() => userManager.signoutRedirect()} tabIndex={0}>
                  <UserIcon aria-hidden name="user" color="black" />
                  <FormattedMessage id="site.nav.user.logout" />
                </UserAction>
              )}
            </Options>
          </NavbarRow>
        </NavbarContainer>
      </TopNavbar>

      <TopNavbar>
        <NavbarContainer>
          <NavbarRow>
            <Links>
              <LocalizedLink to="event/new" translate="site.nav.create_event" />
              {hasUser && (
                <>
                  {(isOfficial || isContractor) && (
                    <LocalizedLink to="admin/events/manage" translate="site.nav.manage_events" />
                  )}
                  {isOfficial && <LocalizedLink to="admin/report" translate="site.nav.report" />}
                </>
              )}
            </Links>
          </NavbarRow>
        </NavbarContainer>
      </TopNavbar>

      <Content>
        <PageWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
          {children}
        </PageWrapper>
      </Content>

      <div>
        <div aria-hidden="true">
          <KoroSection type="basic" />
        </div>
        <Footer />
      </div>
      <Notifications />
      <Modal />
    </LayoutWrapper>
  );
};

export default Layout;
