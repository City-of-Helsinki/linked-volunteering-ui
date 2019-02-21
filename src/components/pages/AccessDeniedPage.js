import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import responsive from '../../utils/responsive';
import Layout from '../layout/containers/LayoutContainer';

const Message = styled(Container)`
  background-color: ${props => props.theme.helWhite};
  padding-top: 4em;
  padding-bottom: 4em;

  h2 {
    font-size: ${props => props.theme.h4FontSize};
    margin-bottom: 1em;
  }

  ${responsive.md`
    h2 {
      font-size: ${props => props.theme.h2FontSize};
    }
  `}
`;

const AccessDeniedPage = () => (
  <Layout paddingBottom>
    <Message>
      <FormattedMessage tagName="h2" id="site.page.access_denied.heading" href="/" />
      <FormattedMessage tagName="p" id="site.page.access_denied.message" />
      <FormattedMessage tagName="p" id="site.page.access_denied.contact_admin" />
    </Message>
  </Layout>
);

export default AccessDeniedPage;
