import { render, RenderOptions } from '@testing-library/react';
import { LoginProvider, LoginProviderProps } from 'hds-react';
import React, { PropsWithChildren, ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { AppStore, createStore, RootState } from '../store/configureStore';
import messages from '../config/translations';
import { Language } from '../types';
import theme from '../config/theme';

const providerProperties: LoginProviderProps = {
  userManagerSettings: {},
};

interface RenderWithProvidersProps extends Omit<RenderOptions, 'queries'> {
  locale?: Language;
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const renderWithProviders = (ui: ReactElement, renderOptions: RenderWithProvidersProps = {}) => {
  const {
    preloadedState = {},
    store = createStore(preloadedState),
    locale = 'en',
    ...rest
  } = renderOptions;

  const Wrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
      <LoginProvider {...providerProperties}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
              {children}
            </IntlProvider>
          </ThemeProvider>
        </Provider>
      </LoginProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...rest });
};

export default renderWithProviders;
