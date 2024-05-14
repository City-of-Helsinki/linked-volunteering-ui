import { Button } from 'hds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import PageMeta from './PageMeta';
import Layout from '../layout/containers/LayoutContainer';
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
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%);
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

function LandingPage() {
  const navigate = useNavigate();
  const intl = useIntl();
  const { formatMessage, locale } = intl;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openNewEventPage = () => {
    navigate(`/${locale}/event/new`);
  };

  return (
    <Layout>
      <PageMeta title="site.meta.title" />
      <PageContainer>
        <Container>
          <Row>
            <Col md="12" lg="6">
              <ContentWrapper>
                <FormattedMessage tagName="h1" id="site.page.landing.hero.headline" />
                <FormattedMessage tagName="p" id="site.page.landing.hero.introduction" />
                <FormattedMessage tagName="strong" id="site.page.landing.hero.call_to_action" />

                <Row>
                  <Col sm="12">
                    <Button color="supplementary" onClick={openNewEventPage}>
                      <FormattedMessage tagName="span" id="site.page.landing.hero.button" />
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col sm="12">
                    <a
                      href={formatMessage({ id: 'site.page.landing.hero.url' })}
                      aria-label={formatMessage({ id: 'site.page.landing.hero.link' })}
                    >
                      <FormattedMessage tagName="span" id="site.page.landing.hero.link" />
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
