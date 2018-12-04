// @flow
import React from 'react';
import type { intlShape } from 'react-intl';

import Layout from '../layout/Layout';

type Props = intlShape;

const NewEventPage = ({ intl: { formatMessage } }: Props) => (
  <Layout>{formatMessage({ id: 'thanks' })}</Layout>
);

export default NewEventPage;
