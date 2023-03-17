import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Page404 from './pages/Page404';
import About from './pages/About';
import Header from './components/Header';

export class App extends React.Component<object, { location: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      location: 'Main',
    };

    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(location: string): void {
    this.setState((state) => ({
      ...state,
      location,
    }));
  }

  render() {
    return (
      <Fragment>
        <Header location={this.state.location} />
        <Routes>
          <Route path="/" element={<Main updateLocation={this.updateLocation} />} />
          <Route path="/about" element={<About updateLocation={this.updateLocation} />} />
          <Route path="*" element={<Page404 updateLocation={this.updateLocation} />} />
        </Routes>
      </Fragment>
    );
  }
}

export class AppWrapper extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}
