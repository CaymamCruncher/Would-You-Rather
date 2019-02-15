import React, { Component } from 'react';
import {handleInitialData} from '../actions/shared'
import {BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Login from './Login'
import '../App.css'


class App extends Component {
  //hide answered questions
  showAnswered = () => {
    let questions = [...document.querySelectorAll('.list-item')]
    let answeredQuestions = questions.filter((question) => question.classList.contains('answered'))
    questions.map((question) => (
      question.classList.add('none')
    ))
    answeredQuestions.map((question) => (
      question.classList.remove('none')
    ))
  }

  showUnanswered = () => {
    let questions = [...document.querySelectorAll('.list-item')]
    let answeredQuestions = questions.filter((question) => question.classList.contains('answered'))
    questions.map((question) => (
      question.classList.remove('none')
    ))
    answeredQuestions.map((question) => (
      question.classList.add('none')
    ))
  }

  //dispatch handleInitialData as soon as component mounts
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  //render method
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <LoadingBar/>
          <Navbar loggedIn={this.props.loggedIn} />
          <hr />
          {!this.props.loggedIn && (
            <Login/>
          )}

          {this.props.loggedIn && (
            <Dashboard questions={this.props.questions} showUnanswered={this.showUnanswered} showAnswered={this.showAnswered} />
          )}
        </div>
      </BrowserRouter>
    )
  }
}

//mapStateToProps gets if a user is logged in yet
function mapStateToProps({authedUser, questions, users}) {
  return {
    loggedIn: authedUser !== 'None' && authedUser !== null,
    loggedInUser: authedUser !== null ? users[authedUser].name : null,
    questions,
    authedUser
  }
}



export default connect(mapStateToProps)(App)
