import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import PageMeta from './PageMeta';
import Layout from '../layout/Layout';
import LocalizedLink from '../common/LocalizedLink';
import heroImage from '../../assets/images/landing_hero_image.jpeg';

const PageContainer = styled.div`
  background-image: url(${heroImage});
  background-size: cover;
  padding-top: 4rem;
  padding-bottom: 10rem;
  position: relative;
  color: white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.65) 100%
    );
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 2rem;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.helWhite};
  color: ${(props) => props.theme.helBlack};

  h1 {
    font-size: 3rem;
    margin-top: 0;
  }
  p,
  strong {
    font-size: 1rem;
  }
  a {
    font-size: 1rem;
    display: block;
    color: ${(props) => props.theme.helBlack};
    text-decoration: underline;
  }
  a,
  button {
    margin-top: 2rem;
  }
`;

const StyledLocalizedLink = styled(LocalizedLink)`
  display: inline-block !important;
  padding: 12px 24px;
  background-color: #0000bf;
  color: #fff !important;
  text-decoration: none !important;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 2px;
  text-align: center;

  &:hover {
    background-color: #00005e;
    color: #fff !important;
    text-decoration: none !important;
  }

  &:focus {
    outline: 3px solid #000;
    outline-offset: 3px;
  }
`;

function LandingPage() {
  const intl = useIntl();
  const { formatMessage } = intl;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <PageMeta title="site.meta.title" />
      <PageContainer>
        <Container>
          <Row>
            <Col md="12" lg="6">
              <ContentWrapper>
                <FormattedMessage
                  tagName="h1"
                  id="site.page.landing.hero.headline"
                />
                <FormattedMessage
                  tagName="p"
                  id="site.page.landing.hero.introduction"
                />
                <FormattedMessage
                  tagName="strong"
                  id="site.page.landing.hero.call_to_action"
                />

                <Row>
                  <Col sm="12">
                    <StyledLocalizedLink to="event/new">
                      {intl.formatMessage({
                        id: 'site.page.landing.hero.button',
                      })}
                    </StyledLocalizedLink>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12">
                    <a
                      href={formatMessage({ id: 'site.page.landing.hero.url' })}
                      aria-label={formatMessage({
                        id: 'site.page.landing.hero.link',
                      })}
                    >
                      <FormattedMessage
                        tagName="span"
                        id="site.page.landing.hero.link"
                      />
                    </a>
                  </Col>
                </Row>
              </ContentWrapper>
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Layout>
  );
}

export default LandingPage;
