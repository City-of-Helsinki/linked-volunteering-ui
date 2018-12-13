// @flow
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import IntlComponent from '../../common/IntlComponent';
import LocalizedLink from '../../common/LocalizedLink';

import Layout from '../../layout/Layout';
import backgroundImage from '../../../assets/images/_MG_2851_c_Jussi_Hellsten.jpg';

const PageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: 45% 100%;
  background-repeat: no-repeat;
  background-position: right;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  color: black;
`;

const Content = styled.div`
  width: 55%;
  padding-top: 12vh;
  padding-bottom: 30vh;
  padding-left: 4vw;
  padding-right: 6vw;

  h1 {
    font-size: 3.5rem;
    line-height: 0.9;
  }

  p,
  strong {
    display: block;
  }

  p,
  a,
  strong {
    font-size: 1.25em;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const SubmittedPage = () => (
  <Layout>
    <PageContainer>
      <Content>
        <FormattedMessage tagName="h1" id="site.page.thank_you.header" />
        <FormattedMessage tagName="strong" id="site.page.thank_you.paragraph" />

        <ButtonWrapper>
          <IntlComponent
            Component={Button}
            color="link"
            id="site.page.thank_you.action.add_to_calendar"
          />
        </ButtonWrapper>
        <IntlComponent
          Component={LocalizedLink}
          className="btn btn-primary"
          id="site.page.thank_you.action.home_page"
          to=""
        />
      </Content>
    </PageContainer>
  </Layout>
);

export default SubmittedPage;
