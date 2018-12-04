// @flow
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'reactstrap';
import { StickyContainer, Sticky } from 'react-sticky';
import type { intlShape } from 'react-intl';
import responsive from '../../utils/responsive';

import Layout from '../layout/Layout';
import EventForm from '../form/EventForm';

import type { WithForm } from '../../types/forms';
import type { Event } from '../../types/event';

const FormContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
  margin-top: 1em;
`;

const TitleContainer = styled(Container)`
  h2 {
    font-size: ${props => props.theme.h4FontSize};
  }

  ${responsive.md`
    h2 {
      font-size: ${props => props.theme.h2FontSize};
    }
  `}
`;
const StickyInner = styled.div`
  padding: 1em;
  background-color: ${props => props.theme.helWhite};
  border-bottom: 4px solid ${props => props.theme.colors.lightGray};
  z-index: 5000;
`;

type Props = WithForm<Event> & intlShape;

const NewEventPage = ({
  handleReset,
  handleSubmit,
  intl: { formatMessage },
  submit,
  ...rest
}: Props) => (
  <Layout>
    <StickyContainer>
      <Sticky>
        {({ style }) => (
          <StickyInner style={style}>
            <TitleContainer fluid>
              <Row>
                <Col lg="12" xl={{ size: 6, offset: 1 }}>
                  <h2>Ilmoita uusi vapaaehtoistapahtuma</h2>
                </Col>
                <Col lg="6" xl={{ size: 2 }}>
                  <Button block type="button" onClick={handleReset} color="danger">
                    {formatMessage({ id: 'form.event.button.reset' })}
                  </Button>
                </Col>
                <Col lg="6" xl={{ size: 2 }}>
                  <Button block type="submit" onClick={handleSubmit} color="success">
                    {formatMessage({ id: 'form.event.button.submit' })}
                  </Button>
                </Col>
              </Row>
            </TitleContainer>
          </StickyInner>
        )}
      </Sticky>
      <FormContainer>
        <EventForm {...rest} />
      </FormContainer>
    </StickyContainer>
  </Layout>
);

export default NewEventPage;
