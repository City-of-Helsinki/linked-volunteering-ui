import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { injectIntl, FormattedMessage } from 'react-intl';
import LocalizedLink from '../common/LocalizedLink';
import responsive from '../../utils/responsive';
import Icon from '../common/Icon';

const Wrapper = styled.div`
  background-color: ${props => props.theme.helCopper};
  color: #000;
  padding-top: 2em;
  padding-left: 2em;
  padding-right: 2em;
  min-height: 15em;
  & a {
    color: #000;
    text-decoration: underline;
    margin-right: 1.25rem;

    & :last-child {
      margin-right: 0;
    }
  }

  ${responsive.sm`
    padding-top: 4em;
    padding-left: 4em;
    padding-right: 4em;
  `}
`;

const NavigationLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  span {
    font-weight: 600;
  }

  span + span {
    margin-left: 0em;
  }

  ${responsive.sm`
    flex-direction: row;
    span + span {
      margin-left: 3em;
    }
  `}
`;

const LogoWrapper = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
`;

const BottomLinks = styled.div`
  display: flex;
  padding: 1em 0;
  flex-direction: column;

  ${responsive.sm`
    flex-direction: row;
  `}
`;

const BottomLinksLeft = styled.div`
  text-align: left;
  flex: 1 1 0%;
`;

const BottomLinksRight = styled.div`
  text-align: left;
  flex: 1 1 0%;

  ${responsive.sm`
    text-align: right;
  `}
`;

const Footer = ({ intl: { formatMessage, locale } }) => (
  <Wrapper>
    <NavigationLinks>
      <span>
        <LocalizedLink to="" translate="site.footer.front_page" />
      </span>
      <span>
        <LocalizedLink to="event/new" translate="site.footer.create_event" />
      </span>
      <span>
        <a href={formatMessage({ id: 'site.footer.url.contacts' })}>
          <FormattedMessage tagName="span" id="site.footer.contacts" />
        </a>
      </span>
    </NavigationLinks>
    <LogoWrapper>
      <Icon name="helsinkiLogo" size="7x" color="#000" />
    </LogoWrapper>
    <BottomLinks>
      <BottomLinksLeft>
        <a href={formatMessage({ id: 'site.footer.privacyPolicy.url' })}>
          <FormattedMessage tagName="span" id="site.footer.privacyPolicy.text" />
        </a>
        <Link to={`/${locale}/accessibility`}>
          <FormattedMessage tagName="span" id="site.footer.accessibility.text" />
        </Link>
      </BottomLinksLeft>
      <BottomLinksRight>
        <a href={formatMessage({ id: 'site.footer.url.feedback' })}>
          <FormattedMessage tagName="span" id="site.footer.give_feedback" />
        </a>
      </BottomLinksRight>
    </BottomLinks>
  </Wrapper>
);

export default injectIntl(Footer);
