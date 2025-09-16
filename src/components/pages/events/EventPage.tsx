import { Button } from 'hds-react';
import forEach from 'lodash/forEach';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { useFormik } from 'formik';
import { useParams } from 'react-router';
import responsive from '../../../utils/responsive';

import PageMeta from '../PageMeta';
import IntlComponent from '../../common/IntlComponent';
import Layout from '../../layout/Layout';
import EventForm from '../../form/EventForm';
import InstructionText from '../../form/fields/InstructionText';
import { eventByIdSelector } from '../../../store/reducers/event';

import event, { validationSchema } from '../../../utils/entities/event';
import { useAppSelector } from '../../../store/hooks';
import { selectedContractZoneSelector } from '../../../store/reducers/geo';
import { Event } from '../../../store/types';

import './print.scss';

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
      font-size: ${(props: { theme: { h2FontSize: unknown } }) => props.theme.h2FontSize};
    }
  `}
`;

const ButtonCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

  ${responsive.sm`
    flex-direction: row;
  `}
`;

const ResetButton = styled(Button)`
  background-color: #ca3f00;
  border-color: #ca3f00 !important;
  color: white;
  margin-left: auto;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #bd2719;
    border-color: #bd2719;
    color: white;
  }

  ${responsive.sm`
    margin-left: 0.5rem;
    margin-bottom: 0;
  `}
`;

const SubmitButton = styled(Button)`
  background-color: #00d7a7;
  border-color: #00d7a7 !important;
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
    margin-left: 0.5rem;
  `}
`;

const PrintButton = styled(Button)`
  margin-left: auto;
  margin-bottom: 0.5rem;

  ${responsive.sm`
    margin-left: 0.5rem;
    margin-bottom: 0;
  `}
`;

interface EventPageProps {
  handleSubmit: (values: Event) => Promise<void>;
  pageType: 'new' | 'modify';
}

const EventPage: React.FC<EventPageProps> = ({
  handleSubmit: handleSubmitFn,
  pageType,
}) => {
  const { id } = useParams();

  const eventById = useAppSelector((state) => eventByIdSelector(state, id));
  const selectedContractZone = useAppSelector(selectedContractZoneSelector);

  const initialValues = pageType === 'new' ? event : eventById;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    errors,
    touched,
    values: formValues,
    submitCount,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    validationSchema,
    validateOnChange: false,
    initialValues,
    validate: () => {
      const validationErrors: { contractZone?: string } = {};

      if (!selectedContractZone) {
        validationErrors.contractZone = 'form.validation.contact_zone.invalid';
      }

      return validationErrors;
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);

      try {
        await handleSubmitFn(values);
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'response' in error &&
          error.response &&
          typeof error.response === 'object' &&
          'data' in error.response
        ) {
          const apiError = error.response as { data: Record<string, unknown> };
          const submitErrors = Object.entries(apiError.data).reduce(
            (acc: { [key: string]: string }, [key]) => {
              acc[key] = 'form.validation.generic';
              return acc;
            },
            {}
          );

          setErrors(submitErrors);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    // Has short timeout to be sure errors are re-rendered
    setTimeout(() => {
      const errComponents = document.getElementsByClassName('is-invalid');
      if (errComponents.length) {
        errComponents[0].scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
        forEach(errComponents, (el) => {
          if (
            el.tagName.toLowerCase() === 'input' ||
            el.tagName.toLowerCase() === 'textarea'
          ) {
            // eslint-disable-next-line sonarjs/no-nested-functions
            setTimeout(() => {
              const htmlEl = el as HTMLElement;

              htmlEl.focus();
            }, 300);

            return false;
          }
          return true;
        });
      }
    }, 10);
  }, [submitCount]);

  return (
    <Layout paddingBottom>
      <PageMeta title={`form.event.${pageType}.page_title`} />
      <TitleContainer>
        <IntlComponent Component="h1" id={`form.event.${pageType}.heading`} />
        <InstructionText text={`form.event.${pageType}.infoText`} />
      </TitleContainer>
      <FormContainer>
        <div className="printable-area">
          <EventForm
            handleSubmit={handleSubmit}
            errors={errors}
            touched={touched}
            values={formValues}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </div>
        <Row>
      </Row>
        <Row>
          <ButtonCol sm="12" md={{ size: 8, offset: 1 }}>
            {
              pageType === 'modify'
                ? 
                  <IntlComponent
                    Component={PrintButton}
                    id="site.page.manage_events.print_button"
                    onClick={() => window.print()}
                    color="primary"
                  />
                :
                  <></>
            }
            <IntlComponent
              Component={SubmitButton}
              type="submit"
              color="success"
              id={`form.event.${pageType}.button.submit`}
              aria-disabled={isSubmitting || undefined}
              onClick={
                isSubmitting
                  ? undefined
                  : (e) =>
                    handleSubmit(
                      e as unknown as React.FormEvent<HTMLFormElement>
                    )
              }
            />
          </ButtonCol>
        </Row>
      </FormContainer>
    </Layout>
  );
};

export default EventPage;
