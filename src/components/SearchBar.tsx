import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default class SearchBar extends Component<object, { search: string; updated: boolean }> {
  constructor(props: object) {
    super(props);
    this.state = {
      search: '',
      updated: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const search: string = new String(localStorage.getItem('search') || '').toString();
    this.setState((state) => ({
      ...state,
      search: search,
    }));
  }

  componentWillUnmount() {
    // this prevents from setting 'search' to an empty string
    // due to React 18 StrictMode double mount/unmount
    if (!this.state.updated) return;

    localStorage.setItem('search', this.state.search);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      search: e.target.value,
      updated: true,
    });
  }

  render() {
    return (
      <div id="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="text"
          name="search"
          id="search-input"
          placeholder="search bar"
          value={this.state.search}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
