import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './style.css';

export default class SearchTermForm extends Component<RouteComponentProps> {
  state = { SearchTerm: '' };

  handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/tweets',
      search: `?query=${this.state.SearchTerm}`,
    });
  };

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ SearchTerm: e.currentTarget.value });
  }

  render() {
    return (
      <form id='input-form' onSubmit={this.handleSubmit}>
        <div className='search-input-container'>
          <span className='enter-user-name'>Enter Search Term</span>
          <input
            id='search-input'
            type='text'
            onChange={this.handleChange.bind(this)}
          ></input>
        </div>
        <button type='submit' className='submit-button'>
          <span className='submit-button-text'>GO!</span>
        </button>
      </form>
    );
  }
}
