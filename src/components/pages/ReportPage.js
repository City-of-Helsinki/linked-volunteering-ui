// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'reactstrap';
import { injectIntl, FormattedMessage, type intlShape } from 'react-intl';
import responsive from '../../utils/responsive';

import Layout from '../layout/Layout';
import ReportForm from '../form/ReportForm';

import type { WithForm } from '../../types/forms';
import type { Event } from '../../types/event';

const FormContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
  margin-top: 1em;
`;

const TitleContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};
  padding: 1em;

  h2 {
    font-size: ${props => props.theme.h4FontSize};
  }

  ${responsive.md`
  h2 {
    font-size: ${props => props.theme.h2FontSize};
  }
`}
`;

const ControlContainer = styled(Container)`
  background-color: ${props => props.theme.helWhite};

  h3 {
    margin-top: 0em;
  }
`;

const ReportTitle = styled.span`
  font-weight: 600;
`;

const StatisticsRow = styled(Row)`
  padding-top: 1.5em;
  padding-bottom: 1.5em;
`;

const Table = styled.table`
  width: 100%;
`;

type Props = WithForm<Event> & intlShape;

class ReportPage extends Component<Props> {
  componentDidMount() {
    const { getEvents } = this.props;
    getEvents();
  }

  render() {
    const {
      handleReset,
      handleSubmit,
      intl: { formatMessage },
      events,
      ...rest
    }: Props = this.props;

    return (
      <Layout>
        <TitleContainer fluid>
          <Row>
            <Col md={{ size: 3, offset: 1 }}>
              <FormattedMessage tagName="h2" id="site.report.title" />
            </Col>
          </Row>
        </TitleContainer>
        <ControlContainer fluid>
          <Row>
            <Col sm={{ size: 2, offset: 1 }}>
              <ReportTitle>{formatMessage({ id: 'site.report.yearly_report' })}</ReportTitle>
            </Col>
            <Col sm={{ size: 4 }}>
              <ReportForm {...rest} />
            </Col>
            <Col sm={{ size: 2 }}>
              <Button block type="submit" onClick={handleSubmit} color="success">
                {formatMessage({ id: 'form.report.button.submit' })}
              </Button>
            </Col>
          </Row>
          <StatisticsRow>
            <Col sm={{ size: 2, offset: 1 }}>
              {formatMessage({ id: 'site.report.total_events' })} 168
            </Col>
            <Col sm={{ size: 6 }}>
              {formatMessage({ id: 'site.report.total_participants' })} 21,471
            </Col>
          </StatisticsRow>
        </ControlContainer>
        <FormContainer>
          <Table>
            <tbody>
              <tr>
                <th>Talkoopiiri</th>
                <th>Yhteyshenkilö</th>
                <th>Sähköposti</th>
                <th>Puhelinnumero</th>
                <th>Talkoita</th>
                <th>Osallistujia</th>
              </tr>
              {events &&
                events.valueSeq().map(event => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td>
                      {event.first_name} {event.last_name}
                    </td>
                    <td>{event.email}</td>
                    <td>{event.phone}</td>
                    <td>TBA</td>
                    <td>TBA</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </FormContainer>
      </Layout>
    );
  }
}

export default injectIntl(ReportPage);
