import { Button, IconTree } from 'hds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import PageMeta from './PageMeta';
import IconTree2 from '../icons/IconTree2';
import Layout from '../layout/containers/LayoutContainer';
import responsive from '../../utils/responsive';

const PageContainer = styled.div`
  padding: 4rem 0;
  text-align: center;

  .iconWrapper {
    margin-bottom: 2rem;
  }

  svg {
    height: 4rem;
    width: 4rem;
    fill: #01b78e;
    margin: 0 1rem;
  }

  h1 {
    margin: 0 0 1.5rem;
  }

  p {
    margin: 0 0 3rem;
  }

  ${responsive.sm`
    svg {
      height: 5rem;
      width: 5rem;
    }
  `}
`;

function Error404Page() {
  const navigate = useNavigate();
  const intl = useIntl();
  const { formatMessage, locale } = intl;

  const openNewEventPage = () => {
    navigate(`/${locale}/event/new`);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <PageMeta title="site.page.error404.page_title" />
      <PageContainer>
        <Container>
          <Row>
            <Col md="12" lg="12">
              <div className="iconWrapper">
                <IconTree2 />
                <IconTree />
                <IconTree2 />
              </div>
              <h1>{formatMessage({ id: 'site.page.error404.title' })}</h1>
              <p>{formatMessage({ id: 'site.page.error404.text' })}</p>
              <Button color="supplementary" onClick={openNewEventPage}>
                {formatMessage({ id: 'site.page.error404.button' })}
              </Button>
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Layout>
  );
}
export default Error404Page;
