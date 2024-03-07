import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Main from './pages/Main';
import Users from './pages/Users';
import Page404 from './pages/Page404';
import About from './pages/About';
import Header from './components/Header';
import ThemeSwitch from './components/ThemeSwitch';

export const App = () => (
  <Fragment>
    <Header />
    <ThemeSwitch />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/users" element={<Users />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </Fragment>
);

export class AppWrapper extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  }
}
