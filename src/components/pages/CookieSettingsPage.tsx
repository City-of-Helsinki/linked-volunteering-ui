import React from 'react';
import { CookieSettingsPage as HdsCookieSettingsPage } from 'hds-react';
import { Container } from 'reactstrap';
import styled from 'styled-components';

import PageMeta from './PageMeta';
import Layout from '../layout/Layout';

const PageContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

// HDS renders the settings form in a shadow DOM, so pad it from the outside
const SettingsWrapper = styled.div`
  background-color: ${(props) => props.theme.helWhite};
  padding: 1rem 1.5rem;
`;

function CookieSettingsPage() {
  return (
    <Layout>
      <PageMeta title="site.page.cookie_settings.page_title" />
      <PageContainer>
        <Container>
          <SettingsWrapper>
            <HdsCookieSettingsPage />
          </SettingsWrapper>
        </Container>
      </PageContainer>
    </Layout>
  );
}

export default CookieSettingsPage;
