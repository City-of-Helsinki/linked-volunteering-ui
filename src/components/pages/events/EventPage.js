import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'reactstrap';
import { StickyContainer, Sticky } from 'react-sticky';
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
  border-bottom: 1em solid ${props => props.theme.colors.lightGray};
  z-index: 5000;
`;

class NewEventPage extends PureComponent {
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
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              <StickyInner style={style}>
                <TitleContainer fluid>
                  <Row>
                    <Col lg="12" xl={{ size: 6, offset: 1 }}>
                      <IntlComponent Component="h2" id={`form.event.${pageType}.heading`} />
                    </Col>
                    <Col lg="6" xl={{ size: 2 }}>
                      <IntlComponent
                        Component={Button}
                        id={`form.event.${pageType}.button.reset`}
                        block
                        type="button"
                        onClick={handleReset}
                        color="danger"
                      />
                    </Col>
                    <Col lg="6" xl={{ size: 2 }}>
                      <IntlComponent
                        Component={Button}
                        block
                        type="submit"
                        onClick={handleSubmit}
                        color="success"
                        id={`form.event.${pageType}.button.submit`}
                      />
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
  }
}

export default NewEventPage;
