// @flow
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Icon from '../common/Icon';

const Wrapper = styled.div`
  background-color: ${props => props.theme.helCopper};
  color: #000;
  padding: 0 4em;
  padding-top: 4em;
  min-height: 15em;

  & a {
    color: #000;
  }
`;
const NavigationLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    font-weight: 600;
  }
  a + a {
    margin-left: 3em;
  }
`;
const LogoWrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.helWhite};
`;
const BottonLinks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 0;
`;

const Footer = () => (
  <Wrapper>
    <NavigationLinks>
      <a href="#">
        <FormattedMessage tagName="span" id="site.footer.front_page" />
      </a>
      <a href="#">
        <FormattedMessage tagName="span" id="site.footer.upcoming_events" />
      </a>
      <a href="#">
        <FormattedMessage tagName="span" id="site.footer.create_event" />
      </a>
      <a href="#">
        <FormattedMessage tagName="span" id="site.footer.contacts" />
      </a>
    </NavigationLinks>
    <LogoWrapper>
      <Icon name="helsinkiLogo" width="200px" height="200px" color="#000" />
    </LogoWrapper>
    <BottonLinks>
      <div>&copy; Copyright 2018 - Kaikki oikeudet pidätetään.</div>
      <div>
        <a href="#">
          <FormattedMessage tagName="span" id="site.footer.give_feedback" />
        </a>
      </div>
    </BottonLinks>
  </Wrapper>
);

export default Footer;
