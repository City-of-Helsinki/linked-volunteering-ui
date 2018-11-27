import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Col, Row, Container } from 'reactstrap';
import Icon from '../common/Icon';

const Wrapper = styled.div`
  background-color: ${props => props.theme.helCopper};
  color: #000;
  padding-top: 4em;
  padding-bottom: 4em;
  min-height: 15em;

  & a {
    color: #000;
  }
`;

const OptionsContainer = styled(Container)`
  width: 100%;
`;

const FooterSection = styled(Col)`
  text-align: center;
`;

const Footer = () => (
  <Wrapper>
    <OptionsContainer>
      <Row>
        <FooterSection md="6">
          <Icon name="helsinkiLogo" width="120px" color="#000" />
          <div>
            &copy; Copyright 2018 - Kaikki oikeudet pidätetään.
          </div>
        </FooterSection>
        <FooterSection md="6">
            <div>
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
            </div>
        </FooterSection>
      </Row>
    </OptionsContainer>
  </Wrapper>
);

export default Footer;
