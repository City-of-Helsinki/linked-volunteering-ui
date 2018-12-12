// @flow
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Button, Container, Row, Col } from 'reactstrap';
import IntlComponent from '../common/IntlComponent';

import Layout from '../layout/Layout';
import heroImage from '../../assets/images/hero_image_berth.jpg';

const PageContainer = styled.div`
  background-image: url(${heroImage});
  background-size: fill;
  padding-top: 12vh;
  padding-bottom: 30vh;
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

const ThankYouPage = () => (
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
            <IntlComponent Component={Button} block id="site.page.landing.hero.button" />
          </Col>
          <Col md="3">
            <IntlComponent
              Component={Button}
              link
              block
              id="site.page.landing.hero.link"
              to="event/new"
            />
          </Col>
        </Row>
      </Container>
    </PageContainer>
  </Layout>
);

export default ThankYouPage;
