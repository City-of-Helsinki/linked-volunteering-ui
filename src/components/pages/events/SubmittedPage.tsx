import { saveAs } from 'file-saver';
import { EventAttributes, createEvent } from 'ics';
import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Event } from '../../../store/types';
import PageMeta from '../PageMeta';
import Button from '../../common/Button';
import LocalizedLink from '../../common/LocalizedLink';
import Layout from '../../layout/Layout';
import backgroundImage from '../../../assets/images/_MG_2851_c_Jussi_Hellsten.jpg';
import responsive from '../../../utils/responsive';
import getDateArray from '../../../utils/getDateArray';

const PageContainer = styled.div`
  max-width: 100vw;
  display: flex;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 0 0 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${responsive.sm`
    padding-left: 7rem;
    padding-right: 7rem;
    padding-top: 3.5rem;

    h1 {
      font-size: 4rem;
      line-height: 0.9;
    }
  `}

  ${responsive.md`
    flex: 0 0 55%;
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
    font-size: 1.25rem;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const BackgroundImage = styled.img.attrs({
  alt: '',
  src: backgroundImage,
})`
  flex: 0 0 45%;
  max-height: 80vh;
  display: none;

  ${responsive.md`
    display: block;
  `}
`;

interface Props {
  submittedEvent: Event | null;
}

const SubmittedPage: React.FC<Props> = ({ submittedEvent }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const downloadIcsFile = () => {
    const event: EventAttributes = {
      productId: 'puistotalkoot/ics',
      startOutputType: 'local',
      start: getDateArray(submittedEvent?.start_time ?? ''),
      end: getDateArray(submittedEvent?.end_time ?? ''),
      location: submittedEvent?.maintenance_location,
      ...(submittedEvent?.location && {
        geo: {
          lat: submittedEvent?.location.coordinates[1],
          lon: submittedEvent?.location.coordinates[0],
        },
      }),
      organizer: {
        name: `${submittedEvent?.organizer_first_name} ${submittedEvent?.organizer_last_name}`,
        email: submittedEvent?.organizer_email,
      },
      title: submittedEvent?.name,
      description: submittedEvent?.description,
    };
    createEvent(event, (error: Error | undefined, value: string) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } else {
        const blob = new Blob([value], { type: 'text/calendar' });
        saveAs(blob, 'event.ics');
      }
    });
  };

  return (
    <Layout>
      <PageMeta title='site.page.thank_you.page_title' />
      <PageContainer>
        <Content>
          <FormattedMessage tagName='h1' id='site.page.thank_you.header' />
          <FormattedMessage tagName='strong' id='site.page.thank_you.paragraph' />
          {submittedEvent && (
            <Button
              prepend='calendar'
              append='arrowRight'
              color='link'
              onClick={downloadIcsFile}
              translate='site.page.thank_you.action.add_to_calendar'
            />
          )}

          <LocalizedLink className='btn btn-primary' translate='site.page.thank_you.action.home_page' to='' />
        </Content>
        <BackgroundImage />
      </PageContainer>
    </Layout>
  );
};

export default SubmittedPage;
