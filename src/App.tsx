import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Mane from './pages/Mane';
import Page404 from './pages/Page404';
import About from './pages/About';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<Mane />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Fragment>
    );
  }
}

class AppWrapper extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

export default AppWrapper;
