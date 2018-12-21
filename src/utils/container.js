import { withHandlers, withProps, compose, branch, renderComponent } from 'recompose';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ErrorPage from '../components/pages/containers/ErrorPageContainer';

export const withMatchParams = compose(
  withRouter,
  withProps(props => ({
    ...props.match.params
  }))
);

export const withMatchParamsHandlers = compose(
  withMatchParams,
  withHandlers({
    localePush: props => uri => {
      const { history, locale } = props;
      history.push(`/${locale}${uri}`);
    }
  })
);

export const renderIfAuthenticated = compose(
  connect(state => ({
    isAutenticated: state.oidc.get('user')
  })),
  withRouter,
  branch(({ isAutenticated }) => !isAutenticated, renderComponent(ErrorPage))
);
