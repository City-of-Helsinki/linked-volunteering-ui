// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'reactstrap';
import { FormattedMessage, type intlShape } from 'react-intl';

import Layout from '../layout/containers/LayoutContainer';
import ReportForm from '../form/ReportForm';

import { Table, Td, TrRow } from '../common/Table';
import IntlComponent from '../common/IntlComponent';

import type { WithForm } from '../../types/forms';
import type { Report } from '../../types/report';

const FormContainer = styled(Container)`
  margin-top: 1em;
  margin-bottom: 3em;
`;

const TitleRow = styled(Row)`
  margin-top: 1.5em;
  margin-bottom: 1.5em;
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

type Props = WithForm<Report> & intlShape;

class ReportPage extends Component<Props> {
  componentDidMount() {
    const { getReport } = this.props;
    getReport();
  }

  render() {
    const { handleReset, handleSubmit, reports, ...rest }: Props = this.props;
    const eventAmount = reports.reduce((acc, row) => acc + row.events, 0);
    const participantAmount = reports.reduce((acc, row) => acc + row.participants, 0);
    return (
      <Layout>
        <ControlContainer fluid>
          <TitleRow>
            <Col sm={{ size: 11, offset: 1 }}>
              <FormattedMessage tagName="h2" id="site.report.title" />
            </Col>
          </TitleRow>
          <Row>
            <Col sm={{ size: 2, offset: 1 }}>
              <IntlComponent Component={ReportTitle} id="site.report.yearly_report" />
            </Col>
            <Col sm={{ size: 4 }}>
              <ReportForm {...rest} />
            </Col>
            <Col sm={{ size: 2 }}>
              <IntlComponent
                Component={Button}
                block
                type="submit"
                onClick={handleSubmit}
                color="success"
                id="site.report.yearly_report"
              />
            </Col>
          </Row>
          <StatisticsRow>
            <IntlComponent
              Component={Col}
              sm={{ size: 2, offset: 1 }}
              id="site.report.total_events"
              values={{ event_amount: eventAmount }}
            />
            <IntlComponent
              Component={Col}
              sm={{ size: 2, offset: 1 }}
              id="site.report.total_participants"
              values={{ participant_amount: participantAmount }}
            />
          </StatisticsRow>
        </ControlContainer>
        <FormContainer>
          <Row>
            <Col>
              <Table>
                <thead>
                  <TrRow>
                    <IntlComponent Component="th" id="site.report.table.header.area" />
                    <IntlComponent Component="th" id="site.report.table.header.contact_person" />
                    <IntlComponent Component="th" id="site.report.table.header.email" />
                    <IntlComponent Component="th" id="site.report.table.header.phone" />
                    <IntlComponent Component="th" id="site.report.table.header.events" />
                    <IntlComponent Component="th" id="site.report.table.header.participants" />
                  </TrRow>
                </thead>
                <tbody>
                  {reports &&
                    reports.valueSeq().map(report => (
                      <TrRow key={report.id}>
                        <Td>{report.area}</Td>
                        <Td>{report.contact_person}</Td>
                        <Td>{report.email}</Td>
                        <Td>{report.phone}</Td>
                        <Td>{report.events}</Td>
                        <Td>{report.participants}</Td>
                      </TrRow>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </FormContainer>
      </Layout>
    );
  }
}

export default ReportPage;
