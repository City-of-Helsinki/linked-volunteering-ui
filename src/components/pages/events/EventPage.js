import { Button } from 'hds-react';
import forEach from 'lodash/forEach';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import responsive from '../../../utils/responsive';

import PageMeta from '../PageMeta';
import IntlComponent from '../../common/IntlComponent';
import Layout from '../../layout/containers/LayoutContainer';
import EventForm from '../../form/EventForm';
import InstructionText from '../../form/fields/InstructionText';

const FormContainer = styled(Container)`
  background-color: ${(props) => props.theme.helWhite};
  padding-top: 2em;
  padding-bottom: 2em;
`;

const TitleContainer = styled(Container)`
  h1 {
    margin: 2rem 0 0.5rem;
    font-size: ${(props) => props.theme.h4FontSize};
  }

  p {
    margin-bottom: 2.5rem;
  }

  ${responsive.sm`
    padding-left: 0;
  `}

  ${responsive.md`
    h1 {
      font-size: ${(props) => props.theme.h2FontSize};
    }
  `}
`;

const ButtonCol = styled(Col)`
  text-align: right;
`;

const ResetButton = styled(Button)`
  background-color: #ca3f00;
  border-color: #ca3f00 !important;
  color: white;
  margin-bottom: 1rem;
  display: block;
  margin-left: auto;

  &:hover {
    background-color: #bd2719;
    border-color: #bd2719;
    color: white;
  }

  ${responsive.sm`
    display: inline-flex;
    margin-left: 0;
    margin-right: 0.5rem;
    margin-bottom: 0;
  `}
`;

const SubmitButton = styled(Button)`
  background-color: #00d7a7;
  border-color: #00d7a7 !important;
  display: block;
  margin-left: auto;

  &:hover {
    background-color: #01b78e;
    border-color: #01b78e;
    color: black;
  }

  &[aria-disabled='true'] {
    background-color: #ccc;
    border-color: #ccc;
    color: white;
    cursor: not-allowed;

    &:focus {
      outline: none;
    }
  }

  ${responsive.sm`
    display: inline-flex;
    margin-left: 0.5rem;
  `}
`;

class NewEventPage extends PureComponent {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const { submitCount } = this.props;
    if (submitCount !== prevProps.submitCount) {
      // Has short timeout to be sure errors are re-rendered
      setTimeout(() => {
        const errComponents = document.getElementsByClassName('is-invalid');
        if (errComponents.length) {
          errComponents[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
          forEach(errComponents, (el) => {
            if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
              setTimeout(() => {
                el.focus();
              }, 300);

              return false;
            }
            return true;
          });
        }
      }, 10);
    }
  }

  render() {
    const { handleReset, handleSubmit, pageType, isSubmitting, ...rest } = this.props;

    return (
      <Layout paddingBottom>
        <PageMeta title={`form.event.${pageType}.page_title`} />
        <TitleContainer>
          <IntlComponent Component="h1" id={`form.event.${pageType}.heading`} />
          <InstructionText text={`form.event.${pageType}.infoText`} />
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
                color="success"
                id={`form.event.${pageType}.button.submit`}
                aria-disabled={isSubmitting || undefined}
                onClick={isSubmitting ? undefined : handleSubmit}
              />
            </ButtonCol>
          </Row>
        </FormContainer>
      </Layout>
    );
  }
}

export default NewEventPage;
