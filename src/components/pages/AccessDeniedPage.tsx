import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import PageMeta from './PageMeta';
import responsive from '../../utils/responsive';
import Layout from '../layout/Layout';

const Message = styled(Container)`
  background-color: ${(props) => props.theme.helWhite};
  padding-top: 4em;
  padding-bottom: 4em;

  h1 {
    font-size: ${(props) => props.theme.h4FontSize};
    margin: 0 0 1rem;
  }

  ${responsive.md`
    h1 {
      font-size: ${(props: { theme: { h2FontSize: any } }) => props.theme.h2FontSize};
    }
  `}
`;

function AccessDeniedPage() {
  return (
    <Layout paddingBottom>
      <PageMeta title="site.page.access_denied.page_title" />
      <Message>
        <FormattedMessage tagName="h1" id="site.page.access_denied.heading" />
        <FormattedMessage tagName="p" id="site.page.access_denied.message" />
        <FormattedMessage tagName="p" id="site.page.access_denied.contact_admin" />
      </Message>
    </Layout>
  );
}

export default AccessDeniedPage;
