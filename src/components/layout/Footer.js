import React from 'react';
import styled from 'styled-components';
import { injectIntl, FormattedMessage } from 'react-intl';
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
  text-align: right;
  padding: 1em 0;
`;

const Footer = ({ intl: { formatMessage } }) => (
  <Wrapper>
    <NavigationLinks>
      <FormattedMessage tagName="span" id="site.footer.front_page" />
      <FormattedMessage tagName="span" id="site.footer.upcoming_events" />
      <FormattedMessage tagName="span" id="site.footer.create_event" />
      <FormattedMessage tagName="span" id="site.footer.contacts" />
    </NavigationLinks>
    <LogoWrapper>
      <Icon name="helsinkiLogo" size="7x" color="#000" />
    </LogoWrapper>
    <BottomLinks>
      <div>
        <a href={formatMessage({ id: 'site.footer.url.feedback' })}>
          <FormattedMessage tagName="span" id="site.footer.give_feedback" />
        </a>
      </div>
    </BottomLinks>
  </Wrapper>
);

export default injectIntl(Footer);
