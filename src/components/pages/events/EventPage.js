import { Button } from 'hds-react';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import responsive from '../../../utils/responsive';

import IntlComponent from '../../common/IntlComponent';
import Layout from '../../layout/containers/LayoutContainer';
import EventForm from '../../form/EventForm';

const FormContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
  padding-top: 2em;
  padding-bottom: 2em;
`;

const TitleContainer = styled(Container)`
  h1 {
    margin: 2rem 0;
    font-size: ${props => props.theme.h4FontSize};
  }

  ${responsive.md`
    padding-left: 0;
    h1 {
      font-size: ${props => props.theme.h2FontSize};
    }
  `}
`;

const ButtonCol = styled(Col)`
  text-align: right;
`;

const SubmitButton = styled(Button)`
  background-color: #00d7a7;
  border-color: #00d7a7;
  margin-left: 0.5rem;

  &:hover {
    background-color: #01b78e;
    border-color: #01b78e;
    color: black;
  }
`;

const ResetButton = styled(Button)`
  background-color: #ca3f00;
  border-color: #ca3f00;
  color: white;
  margin-right: 0.5rem;

  &:hover {
    background-color: #bd2719;
    border-color: #bd2719;
    color: white;
  }
`;

class NewEventPage extends PureComponent {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    const { neighborhoods, getNeighborhoods, apiAccessToken } = this.props;
    if (neighborhoods.size === 0) {
      getNeighborhoods(apiAccessToken);
    }
  }

  render() {
    const { handleReset, handleSubmit, pageType, ...rest } = this.props;

    return (
      <Layout paddingBottom>
        <TitleContainer>
          <IntlComponent Component="h1" id={`form.event.${pageType}.heading`} />
        </TitleContainer>
        <FormContainer>
          <EventForm {...rest} />
          <Row>
            <ButtonCol sm="12" md={{ size: 8, offset: 1 }}>
              <IntlComponent
                Component={ResetButton}
                id={`form.event.${pageType}.button.reset`}
                type="button"
                onClick={handleReset}
                color="danger"
              />
              <IntlComponent
                Component={SubmitButton}
                type="submit"
                onClick={handleSubmit}
                color="success"
                id={`form.event.${pageType}.button.submit`}
              />
            </ButtonCol>
          </Row>
        </FormContainer>
      </Layout>
    );
  }
}

export default NewEventPage;
