import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import Layout from '../layout/containers/LayoutContainer';

const PageContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 4rem;
  position: relative;
  color: black;
`;

const AccessibilityPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <PageContainer>
        <Container>
          <Row>
            <Col md="12" lg="12">
              {/* TODO: Add accessibility info here when designed */}
              <h2>Accessibility page: Under construction</h2>
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Layout>
  );
};
export default AccessibilityPage;
