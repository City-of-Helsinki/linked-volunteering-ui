import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { injectIntl, FormattedMessage, useIntl } from 'react-intl';
import LocalizedLink from '../common/LocalizedLink';
import responsive from '../../utils/responsive';

import HelsinkiLogo from '../icons/HelsinkiLogo';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.helCopper};
  color: #000;
  padding-top: 2rem;
  padding-left: 0.9375rem;
  padding-right: 0.9375rem;
  min-height: 15rem;

  & a {
    color: #000;
    text-decoration: underline;
    margin-right: 1.25rem;

    & :last-child {
      margin-right: 0;
    }
  }

  ${responsive.sm`
    padding-top: 4rem;
    padding-left: 4rem;
    padding-right: 4rem;
  `}
`;

const NavigationLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  a {
    white-space: normal;
  }

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

const LogoWrapper = styled.div.attrs({
  'aria-hidden': true,
})`
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
  display: flex;
  flex-wrap: wrap;
`;

const BottomLinksRight = styled.div`
  text-align: left;
  flex: 1 1 0%;

  ${responsive.sm`
    text-align: right;
  `}
`;

const StyledHelsinkiLogo = styled(HelsinkiLogo)`
  height: 7rem;
  width: 6rem;
`;

const Footer: React.FC = () => {
  const { formatMessage, locale } = useIntl();

  return (
    <Wrapper>
      <NavigationLinks>
        <span>
          <LocalizedLink to="" translate="site.footer.front_page" />
        </span>
        <span>
          <LocalizedLink to="event/new" translate="site.footer.create_event" />
        </span>
        <span>
          <a
            href={formatMessage({ id: 'site.footer.url.contacts' })}
            aria-label={formatMessage({ id: 'site.footer.contacts' })}
          >
            <FormattedMessage tagName="span" id="site.footer.contacts" />
          </a>
        </span>
      </NavigationLinks>
      <LogoWrapper>
        <StyledHelsinkiLogo />
      </LogoWrapper>
      <BottomLinks>
        <BottomLinksLeft>
          <a
            href={formatMessage({ id: 'site.footer.privacyPolicy.url' })}
            aria-label={formatMessage({ id: 'site.footer.privacyPolicy.text' })}
          >
            <FormattedMessage tagName="span" id="site.footer.privacyPolicy.text" />
          </a>
          <Link to={`/${locale}/accessibility`}>
            <FormattedMessage tagName="span" id="site.footer.accessibility.text" />
          </Link>
        </BottomLinksLeft>
        <BottomLinksRight>
          <a
            href={formatMessage({ id: 'site.footer.url.feedback' })}
            aria-label={formatMessage({ id: 'site.footer.give_feedback' })}
          >
            <FormattedMessage tagName="span" id="site.footer.give_feedback" />
          </a>
        </BottomLinksRight>
      </BottomLinks>
    </Wrapper>
  );
};

export default injectIntl(Footer);
