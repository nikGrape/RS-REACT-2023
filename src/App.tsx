import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import UsersPage from './pages/UsersPage';
import Page404 from './pages/Page404';
import About from './pages/About';
import Header from './components/Header';
import ThemeSwitch from './components/ThemeSwitch';

export class App extends React.Component<object, { location: string; topic: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      location: 'Main',
      topic: '',
    };

    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(location: string, topic?: string): void {
    this.setState((state) => ({
      ...state,
      location,
      topic: topic ? topic : state.topic,
    }));
  }

  render() {
    return (
      <Fragment>
        <Header location={this.state.location} topic={this.state.topic} />
        <ThemeSwitch />
        <Routes>
          <Route path="/" element={<Main updateLocation={this.updateLocation} />} />
          <Route path="/users" element={<UsersPage updateLocation={this.updateLocation} />} />
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
