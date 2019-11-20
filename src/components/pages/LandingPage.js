import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { Container, Row, Col } from 'reactstrap';
import LocalizedLink from '../common/LocalizedLink';
import Icon from '../common/Icon';

import Layout from '../layout/containers/LayoutContainer';
import heroImage from '../../assets/images/helsinki_paiva_002_6450.jpg';

const PageContainer = styled.div`
  background-image: url(${heroImage});
  background-size: cover;
  padding-top: 12vh;
  padding-bottom: 30vh;
  position: relative;
  color: white;
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
  margin-bottom: 2em;
  h1 {
    font-size: 3rem;
  }
  p,
  strong {
    font-size: 1.25rem;
  }
`;

const StyledLink = styled(LocalizedLink)`
  background-color: ${props => props.theme.helSummer};
  color: ${props => props.theme.helBlack};

  &:hover {
    color: ${props => props.theme.helBlack};
  }
`;

const LandingPage = props => {
  const {
    intl: { formatMessage }
  } = props;

  return (
    <Layout>
      <PageContainer>
        <Container>
          <Row>
            <Col md="7">
              <ContentWrapper>
                <FormattedMessage tagName="h1" id="site.page.landing.hero.headline" />
                <FormattedHTMLMessage tagName="p" id="site.page.landing.hero.introduction" />
                <FormattedMessage tagName="strong" id="site.page.landing.hero.call_to_action" />
              </ContentWrapper>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <StyledLink
                translate="site.page.landing.hero.button"
                className="btn btn-block"
                to="event/new"
              />
            </Col>
            <Col md="3">
              <a
                className="btn btn-link btn-block"
                href={formatMessage({ id: 'site.page.landing.hero.url' })}
              >
                <FormattedHTMLMessage tagName="span" id="site.page.landing.hero.link" />
                <Icon name="arrowRight" />
              </a>
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Layout>
  );
};

export default injectIntl(LandingPage);
