/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './style.css';

interface ISearchTermState {
  searchTerm: string;
}

export default class SearchTermForm extends Component<
  RouteComponentProps,
  ISearchTermState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { searchTerm: '' };
  }

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const { history } = this.props;
    const { searchTerm } = this.state;
    history.push({
      pathname: '/tweets',
      search: `?query=${searchTerm}`,
    });
  };

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ searchTerm: e.currentTarget.value });
  }

  render() {
    return (
      <form id="input-form" onSubmit={this.handleSubmit}>
        <div className="search-input-container">
          <span className="enter-user-name">Enter Search Term</span>
          <input
            id="search-input"
            type="text"
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <button type="submit" className="submit-button">
          <span className="submit-button-text">GO!</span>
        </button>
      </form>
    );
  }
}
