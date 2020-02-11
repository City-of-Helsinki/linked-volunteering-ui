import React from 'react';
import { useIntl } from 'react-intl';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

import AccessibilityStatementEn from './AccessibilityStatementEn';
import AccessibilityStatementFi from './AccessibilityStatementFi';
import AccessibilityStatementSv from './AccessibilityStatementSv';
import Layout from '../../layout/containers/LayoutContainer';

type StatementProps = {
  lang: string;
};

const Statement: React.FunctionComponent<StatementProps> = props => {
  const lang = props.lang;

  switch (lang) {
    case 'en':
      return <AccessibilityStatementEn />;
    case 'fi':
      return <AccessibilityStatementFi />;
    case 'sv':
      return <AccessibilityStatementSv />;
    default:
      return <p>Invalid language.</p>;
  }
};

const PageContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 4rem;
  position: relative;
  color: black;
`;

const AccessibilityPage = () => {
  const intl = useIntl();
  const { locale } = intl;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Layout>
      <PageContainer>
        <Container>
          <Row>
            <Col md="12" lg="12">
              <Statement lang={locale} />
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Layout>
  );
};
export default AccessibilityPage;
