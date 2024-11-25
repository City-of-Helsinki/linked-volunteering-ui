import { withHandlers, withProps, mapProps, compose } from 'recompose';
import { useNavigate } from 'react-router';
import { get } from 'lodash';

export const withMatchParams = compose(
  withProps((props) => ({
    ...props.match?.params,
    navigate: useNavigate(),
  })),
);

export const withMatchParamsHandlers = compose(
  withMatchParams,
  withHandlers({
    localePush: (props) => (uri) => {
      const { locale, navigate } = props;
      navigate(`/${locale}${uri}`);
    },
  }),
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
