// @flow
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Alert, Container, Row, Col } from 'reactstrap';
import LocalizedLink from '../common/LocalizedLink';
import IntlComponent from '../common/IntlComponent';

import Layout from '../layout/Layout';
import heroImage from '../../assets/images/hero_image_berth.jpg';

const PageContainer = styled.div``;
const HeroImage = styled.img.attrs({
  src: heroImage,
  alt: 'hero'
})`
  width: 100%;
  height: 20em;
  object-fit: cover;
  object-position: top;
`;
const StyledAlert = styled(Alert).attrs({ color: 'danger' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AlertLink = styled(LocalizedLink).attrs({ className: 'alert-link' })`
  border: 3px solid currentColor;
  padding: 0.8em 1.2em;
`;

const ThankYouPage = () => (
  <Layout>
    <PageContainer>
      <HeroImage />
      <Container>
        <Row>
          <Col>
            <FormattedMessage tagName="h1" id="site.page.landing.header" />
            <FormattedMessage tagName="p" id="site.page.landing.paragraph" />
          </Col>
        </Row>
        <Row>
          <Col>
            <StyledAlert>
              <div>
                <FormattedMessage tagName="h2" id="site.page.landing.alert.first_row" />
                <FormattedMessage tagName="h2" id="site.page.landing.alert.second_row" />
              </div>
              <IntlComponent
                Component={AlertLink}
                id="site.page.landing.alert.button"
                to="new-event"
              />
            </StyledAlert>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  </Layout>
);

export default ThankYouPage;
