import React, { Component } from 'react'
import Tweets from '../Tweets'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import './style.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.history.push({
      pathname: '/tweets',
      state: { username: this.state.username },
    })
  }

  handleChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <Router>
        <div>
          <p className='tweets-analysis-service'>Tweets Analysis Service </p>
          {/* 
           TODO Navigate to the Tweets component, passing in the user name that was entered into the user name 
           input box.
           This must be implemented as a Form. 
           The id of the form must be "input-form".
           The id of the user name input box must be "input-box".
           Note we use <div> below for display purposes only.
          */}
          <form id='input-form'>
            <div className='username-input-box'>
              <span className='enter-user-name'>Enter user name</span>
              <input
                id='input-box'
                type='text'
                onChange={this.handleChange}
              ></input>
            </div>
            <div onClick={this.handleSubmit} className='submit-button'>
              <span type='submit' className='submit-button-text'>
                SUBMIT
              </span>
            </div>
          </form>
          <Route
            exact
            path='/tweets'
            render={(props) => (
              <Tweets {...props} username={this.state.username} />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default withRouter(App)
