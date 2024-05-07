import { withHandlers, withProps, mapProps, compose, branch, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';

import ErrorPage from '../components/pages/containers/ErrorPageContainer';

export const withMatchParams = compose(
  withProps((props) => ({
    ...props.match?.params,
  })),
);

export const withMatchParamsHandlers = compose(
  withMatchParams,
  withHandlers({
    localePush: (props) => (uri) => {
      const { history, locale } = props;
      history.push(`/${locale}${uri}`);
    },
  }),
);

export const renderIfAuthenticated = compose(
  connect((state) => ({
    isAutenticated: state.oidc.get('user'),
  })),
  branch(({ isAutenticated }) => !isAutenticated, renderComponent(ErrorPage)),
);

const sortBy = (orderBy) => (a, b) => {
  const aBy = get(a, orderBy.key);
  const bBy = get(b, orderBy.key);
  if (aBy === bBy) return 0;

  const order = orderBy.order === 'ASC' ? -1 : 1;

  switch (typeof aBy) {
    case 'string':
      return aBy.toLowerCase() < bBy.toLowerCase() ? order : order * -1;
    default:
      return aBy < bBy ? order : order * -1;
  }
};

export const orderBy = (property) =>
  mapProps((props) => ({
    ...props,
    [property]: props[property].sort(sortBy(props.ordering)),
  }));
