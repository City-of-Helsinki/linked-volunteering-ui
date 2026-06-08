import React, { createContext } from 'react';

export interface MatomoPageViewParams {
  data?: unknown[];
  documentTitle?: string;
  href?: string;
}

export interface MatomoInstance {
  trackPageView: (params: MatomoPageViewParams) => void;
}

interface MatomoProviderProps {
  children: React.ReactNode;
  value: MatomoInstance;
}

export const MatomoContext = createContext<MatomoInstance | null>(null);

export const MatomoProvider = ({ children, value }: MatomoProviderProps) => {
  const Context = MatomoContext;

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
