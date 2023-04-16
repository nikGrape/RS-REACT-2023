import { Provider } from 'react-redux';
import React from 'react';
import AppStore from '../store';
import { render } from '@testing-library/react';

export const renderWithRedux = (component: React.ReactNode) => {
  return {
    ...render(<Provider store={AppStore}>{component}</Provider>),
    AppStore,
  };
};
