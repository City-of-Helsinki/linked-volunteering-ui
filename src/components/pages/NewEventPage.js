// @flow
import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import Layout from '../layout/Layout';
import EventForm from '../form/containers/EventFormContainer';

const FormContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
`;

const TitleContainer = styled.div`
  margin-bottom: 1em;
  padding: 1em;
  padding-left: 7em;
  background-color: ${props => props.theme.helWhite};
`;

const NewEventPage = () => (
  <Layout>
    <TitleContainer>
      <h2>Ilmoita uusi vapaaehtoistapahtuma</h2>
    </TitleContainer>
    <FormContainer>
      <EventForm />
    </FormContainer>
  </Layout>
);

export default NewEventPage;
