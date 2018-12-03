// @flow
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'reactstrap';

import Layout from '../layout/Layout';
import EventForm from '../form/EventForm';

const FormContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
`;

const TitleContainer = styled(Container)`
  margin-bottom: 1em;
  padding: 1em;
  background-color: ${props => props.theme.helWhite};
`;

const NewEventPage = ({ handleReset, handleSubmit, intl: { formatMessage }, ...rest }: any) => (
  <Layout>
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
    <FormContainer>
      <EventForm {...rest} />
    </FormContainer>
  </Layout>
);

export default NewEventPage;
