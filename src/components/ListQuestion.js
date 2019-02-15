import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {handleSaveAnswer} from '../actions/questions'

class ListQuestion extends Component {
  state = {
    answered: false,
    className: 'list-item',
    selectedOption: 0
  }

  //when save answer is called it dispatches handleSaveAnswer and sets answered to true
  saveAnswer = (question, qid, answer, authedUser) => {
      this.props.dispatch(handleSaveAnswer({authedUser, qid, answer})).then(() => {
        if (answer === 'optionOne') {
          return (this.setState(() => ({
            answered: true,
            selectedOption: 1
          })))
        } else {
          return (this.setState(() => ({
            answered: true,
            selectedOption: 2
          })))
        }
      })
    }

  //componentDidMount checks whether or not the question has already been answered
  componentDidMount() {
    let qid = this.props.location.pathname.split('/').reverse()[0]
    let question = this.props.questions[qid]
    let authedUser = this.props.authedUser
    if (question) {
      if (question.optionOne.votes.includes(authedUser)) {
        this.setState({
          answered: true,
          className: 'list-item answered',
          selectedOption: 1
        })
      } else if (question.optionTwo.votes.includes(authedUser)) {
        this.setState({
          answered: true,
          className: 'list-item answered',
          selectedOption: 2
        })
      }
    }
  }

  render() {
    //split the url at '/' and take the id from it
    let qid = this.props.location.pathname.split('/').reverse()[0]
    let question = this.props.questions[qid]
    let optionOneClass = ''
    let optionTwoClass = ''

    if (!question) {
      return <Redirect to="/404" />
    }

    //change the selected option's classname to selected-option so that their text color is green
    if (this.state.selectedOption === 1) {
      optionOneClass = 'selected-option'
      optionTwoClass = ''
    } else if (this.state.selectedOption === 2) {
      optionOneClass = ''
      optionTwoClass = 'selected-option'
    }

    return (
      <li className={this.state.className} key={question.id}>
        <img src={this.props.users[question.author].avatar} alt={"Picture of " + this.props.users[question.author].name} />
        <h2>{this.props.users[question.author].name} asks</h2>
        <h3>Would you rather?</h3>
        {!this.state.answered && (
          <div>
            <button className="list-button" onClick={() => this.saveAnswer(question, question.id, 'optionOne', this.props.authedUser)}>{question.optionOne.text}</button>
            <button className="list-button" onClick={() => this.saveAnswer(question, question.id, 'optionTwo', this.props.authedUser)}>{question.optionTwo.text}</button>
          </div>
        )}

        {this.state.answered && (
          <div>
            <h4 className={optionOneClass}>{question.optionOne.text} has {question.optionOne.votes.length} votes or {question.optionOne.votes.length/(question.optionTwo.votes.length + question.optionOne.votes.length) * 100}%</h4>
            <h4 className={optionTwoClass}>{question.optionTwo.text} has {question.optionTwo.votes.length} votes or {question.optionTwo.votes.length/(question.optionTwo.votes.length + question.optionOne.votes.length) * 100}%</h4>
          </div>
        )}
      </li>
    )
  }
}


function mapStateToProps({authedUser, users, questions}) {
  return {
    authedUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(ListQuestion)
