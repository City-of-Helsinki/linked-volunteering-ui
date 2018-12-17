// @flow
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

import IntlComponent from '../../common/IntlComponent';
import LocalizedLink from '../../common/LocalizedLink';
import Icon from '../../common/Icon';

import Layout from '../../layout/Layout';
import backgroundImage from '../../../assets/images/_MG_2851_c_Jussi_Hellsten.jpg';
import responsive from '../../../utils/responsive';

const PageContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const IconedButton = styled(Button)`
  display: flex;
  align-items: center;
  * + * {
    margin-left: 0.5em;
  }
`;

const Content = styled.div`
  flex: 0 0 55%;
  padding-left: 7em;
  padding-right: 7em;
  padding-top: 3.5em;
  padding-bottom: 3.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;

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

        <IconedButton color="link">
          <Icon name="calendar" width="1em" height="1em" />
          <FormattedMessage id="site.page.thank_you.action.add_to_calendar" />
          <Icon name="arrow" width="1em" height="1em" />
        </IconedButton>
        <IntlComponent
          Component={LocalizedLink}
          className="btn btn-primary"
          id="site.page.thank_you.action.home_page"
          to=""
        />
      </Content>
      <BackgroundImage />
    </PageContainer>
  </Layout>
);

export default SubmittedPage;
