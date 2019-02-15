import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleSaveQuestion} from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }


  //updateOption functions everytime input is changed state is updated to reflect it
  updateOptionOne = (e) => {
    let optionOne = e.target.value
    this.setState(() => ({
      optionOne
    }))
  }

  updateOptionTwo = (e) => {
    let optionTwo = e.target.value
    this.setState(() => ({
      optionTwo
    }))
  }

  //submit function takes form and adds the question after checking that both fields are filled out
  submit = (e) => {
    e.preventDefault()
    let optionOneText = this.state.optionOne
    let optionTwoText = this.state.optionTwo
    if (optionOneText === '' || optionTwoText === '') {
      alert('Fill out all fields please')
      return
    }
    let author = this.props.authedUser
    let question = {optionOneText, optionTwoText, author}
    this.props.dispatch(handleSaveQuestion(question))
    this.setState({
      optionOne: '',
      optionTwo: ''
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>Create a new question</h2>
        <form className="question-form" onSubmit={this.submit}>
            <h4>Would you rather</h4>
            <input className="option-input" placeholder="Option 1" onChange={this.updateOptionOne} type="text" value={this.state.optionOne} />
            <input className="option-input" placeholder="Option 2" onChange={this.updateOptionTwo} type="text" value={this.state.optionTwo} />
            <button>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
