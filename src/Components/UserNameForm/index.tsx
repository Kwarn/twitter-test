import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './style.css';

export default class UserNameForm extends Component<RouteComponentProps> {
  state = { username: '' };

  handleSubmit(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    this.props.history.push({
      pathname: '/tweets',
      search: `?query=${this.state.username}`,
    });
  }

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ username: e.currentTarget.value });
  }

  render() {
    return (
      <form id='input-form'>
        <div className='username-input-box'>
          <span className='enter-user-name'>Enter user name</span>
          <input
            id='input-box'
            type='text'
            onChange={this.handleChange.bind(this)}
          ></input>
        </div>
        <div onClick={this.handleSubmit.bind(this)} className='submit-button'>
          <span className='submit-button-text'>SUBMIT</span>
        </div>
      </form>
    );
  }
}
