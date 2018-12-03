// @flow
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'reactstrap';
import { StickyContainer, Sticky } from 'react-sticky';
import type { intlShape } from 'react-intl';

import Layout from '../layout/Layout';
import EventForm from '../form/EventForm';

import type { WithForm } from '../../types/forms';

const FormContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
  margin-top: 1em;
`;

const TitleContainer = styled(Container)``;
const StickyInner = styled.div`
  padding: 1em;
  background-color: ${props => props.theme.helWhite};
  border-bottom: 4px solid ${props => props.theme.colors.lightGray};
  z-index: 9;
`;

type Props = WithForm & intlShape;

const NewEventPage = ({ handleReset, handleSubmit, intl: { formatMessage }, ...rest }: Props) => (
  <Layout>
    <StickyContainer>
      <Sticky>
        {({ style }) => (
          <StickyInner style={style}>
            <TitleContainer fluid>
              <Row>
                <Col md="12" lg={{ size: 4, offset: 2 }}>
                  <h2>Ilmoita uusi vapaaehtoistapahtuma</h2>
                </Col>
                <Col md="6" lg={{ size: 2 }}>
                  <Button block type="button" onClick={handleReset} color="danger">
                    {formatMessage({ id: 'form.event.button.reset' })}
                  </Button>
                </Col>
                <Col md="6" lg={{ size: 2 }}>
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
