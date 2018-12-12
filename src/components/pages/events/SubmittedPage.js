// @flow
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Container, Row, Col, Button } from 'reactstrap';

import IntlComponent from '../../common/IntlComponent';
import LocalizedLink from '../../common/LocalizedLink';

import Layout from '../../layout/Layout';
import backgroundImage from '../../../assets/images/_MG_2851_c_Jussi_Hellsten.jpg';

const PageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: 40% 100%;
  background-repeat: no-repeat;
  background-position: right;
  padding-top: 12vh;
  padding-bottom: 30vh;
  h1 {
    font-size: 3.5rem;
    line-height: 0.9;
  }
  p,
  a,
  strong {
    display: block;
    font-size: 1.25em;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  color: black;
`;

const SubmittedPage = () => (
  <Layout>
    <PageContainer>
      <Container>
        <Row>
          <Col md="6">
            <FormattedMessage tagName="h1" id="site.page.thank_you.header" />
            <FormattedMessage tagName="strong" id="site.page.thank_you.paragraph" />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <ButtonWrapper>
              <IntlComponent
                Component={Button}
                color="link"
                id="site.page.thank_you.action.add_to_calendar"
              />
            </ButtonWrapper>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <IntlComponent
              Component={LocalizedLink}
              className="btn btn-primary"
              id="site.page.thank_you.action.home_page"
              to=""
            />
          </Col>
        </Row>
      </Container>
    </PageContainer>
  </Layout>
);

export default SubmittedPage;
