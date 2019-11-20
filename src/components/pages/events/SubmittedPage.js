import { saveAs } from 'file-saver';
import { createEvent } from 'ics';
import moment from 'moment';
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

const SubmittedPage = ({ submittedEvent }) => {
  const downloadIcsFile = () => {
    const event = {
      productId: 'puistotalkoot/ics',
      startOutputType: 'local',
      start: moment(submittedEvent.start_time)
        .format('YYYY-M-D-H-m')
        .split('-'),
      end: moment(submittedEvent.end_time)
        .format('YYYY-M-D-H-m')
        .split('-'),
      location: submittedEvent.maintenance_location,
      geo:
        submittedEvent.location && submittedEvent.location.coordinates
          ? {
              lat: submittedEvent.location.coordinates[1],
              lon: submittedEvent.location.coordinates[0]
            }
          : null,
      organizer: {
        name: `${submittedEvent.organizer_first_name} ${submittedEvent.organizer_last_name}`,
        email: submittedEvent.organizer_email
      },
      title: submittedEvent.name,
      description: submittedEvent.description
    };
    createEvent(event, (error, value) => {
      if (error) {
        console.error(error);
      } else {
        const blob = new Blob([value], { type: 'text/calendar' });
        saveAs(blob, 'event.ics');
      }
    });
  };

  return (
    <Layout>
      <PageContainer>
        <Content>
          <FormattedMessage tagName="h1" id="site.page.thank_you.header" />
          <FormattedMessage tagName="strong" id="site.page.thank_you.paragraph" />
          {submittedEvent && (
            <Button
              prepend="calendar"
              append="arrowRight"
              color="link"
              onClick={downloadIcsFile}
              translate="site.page.thank_you.action.add_to_calendar"
            />
          )}

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
};

export default SubmittedPage;
