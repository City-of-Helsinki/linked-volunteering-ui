// @flow
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Container, Row, Col } from 'reactstrap';
import IntlComponent from '../common/IntlComponent';
import LocalizedLink from '../common/LocalizedLink';

import Layout from '../layout/Layout';
import heroImage from '../../assets/images/helsinki_paiva_002_6450.jpg';

const PageContainer = styled.div`
  background-image: url(${heroImage});
  background-size: cover;
  padding-top: 12vh;
  padding-bottom: 30vh;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%);
  }
`;

const ContentWrapper = styled.div`
  color: white;
  margin-bottom: 2em;
  h1 {
    font-size: 3.5rem;
  }
  p,
  strong {
    font-size: 1.25rem;
  }
`;

const LandingPage = () => (
  <Layout>
    <PageContainer>
      <Container>
        <Row>
          <Col md="6">
            <ContentWrapper>
              <FormattedMessage tagName="h1" id="site.page.landing.hero.headline" />
              <FormattedHTMLMessage tagName="p" id="site.page.landing.hero.introduction" />
              <FormattedMessage tagName="strong" id="site.page.landing.hero.call_to_action" />
            </ContentWrapper>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <IntlComponent
              Component={LocalizedLink}
              id="site.page.landing.hero.button"
              className="btn btn-secondary btn-block"
              to="event/new"
            />
          </Col>
          <Col md="3">
            <IntlComponent
              Component={LocalizedLink}
              id="site.page.landing.hero.link"
              className="btn btn-link btn-block"
              to="#???"
            />
          </Col>
        </Row>
      </Container>
    </PageContainer>
  </Layout>
);

export default LandingPage;
