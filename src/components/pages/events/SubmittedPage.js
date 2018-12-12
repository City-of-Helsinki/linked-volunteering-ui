// @flow
import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Layout from '../../layout/Layout';

const PageContainer = styled.div`
  display: flex;
  min-height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubmittedPage = () => (
  <Layout>
    <PageContainer>
      <FormattedMessage tagName="h1" id="site.page.thank_you.header" />
      <FormattedMessage tagName="p" id="site.page.thank_you.paragraph" />
    </PageContainer>
  </Layout>
);

export default SubmittedPage;
