import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Button from '../../common/Button';

import LocalizedLink from '../../common/LocalizedLink';

import Layout from '../../layout/containers/LayoutContainer';
import backgroundImage from '../../../assets/images/_MG_2851_c_Jussi_Hellsten.jpg';
import responsive from '../../../utils/responsive';

const PageContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 0 0 55%;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 2em;
  padding-bottom: 3.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${responsive.sm`
    padding-left: 7em;
    padding-right: 7em;
    padding-top: 3.5em;

    h1 {
      font-size: 4rem;
      line-height: 0.9;
    }
  `}

  h1 {
    font-size: 2.5rem;
    line-height: 1;
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

const BackgroundImage = styled.img.attrs({
  src: backgroundImage
})`
  flex: 0 0 45%;
  max-height: 80vh;
  display: none;
  ${responsive.md`
    display: block;
  `}
`;

const SubmittedPage = () => (
  <Layout>
    <PageContainer>
      <Content>
        <FormattedMessage tagName="h1" id="site.page.thank_you.header" />
        <FormattedMessage tagName="strong" id="site.page.thank_you.paragraph" />
        <Button
          prepend="calendar"
          append="arrowRight"
          color="link"
          translate="site.page.thank_you.action.add_to_calendar"
        />
        <LocalizedLink
          className="btn btn-primary"
          translate="site.page.thank_you.action.home_page"
          to=""
        />
      </Content>
      <BackgroundImage />
    </PageContainer>
  </Layout>
);

export default SubmittedPage;
