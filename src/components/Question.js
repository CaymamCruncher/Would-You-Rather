import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

class Question extends Component {
  state = {
    answered: false,
    className: 'list-item'
  }

  componentDidMount() {
    //if question has been answered before set answered to true and update className
    let question = this.props.question
    let authedUser = this.props.authedUser
    if (question) {
      if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
        if (this.state.answered !== true) {
          this.setState({
            answered: true,
            className: 'list-item answered none'
          })
        }
      }
    }
  }

  render() {
    let question = this.props.question
    if (!question) {
      return <Redirect to="/404" />
    }
    return (
      <li className={this.state.className} key={question.id}>
        <img className="avatar" src={this.props.users[question.author].avatarURL} alt={"Avatar of " + this.props.users[question.author].name} />
        <h2>{this.props.users[question.author].name} asks</h2>
        <h3>Would you rather?</h3>
        <h4>...{question.optionOne.text}...</h4>
        <Link className="list-link" to={"questions/" + question.id}>View Poll</Link>
      </li>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Question)
