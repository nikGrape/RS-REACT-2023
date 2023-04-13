import React, { Fragment, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Main from './pages/Main';
import Users from './pages/Users';
import Page404 from './pages/Page404';
import About from './pages/About';
import Header from './components/Header';
import ThemeSwitch from './components/ThemeSwitch';

export const App = () => {
  const [state, setState] = useState({
    showHeader: true,
  });

  const showHeader = useCallback((showHeader: boolean): void => {
    setState({ showHeader });
  }, []);

  return (
    <Fragment>
      {state.showHeader ? <Header /> : <Fragment />}
      <ThemeSwitch />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 showHeader={showHeader} />} />
      </Routes>
    </Fragment>
  );
};

export class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}
