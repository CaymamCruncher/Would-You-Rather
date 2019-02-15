import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import ListQuestion from './ListQuestion'
import Error from './Error'

//dashboard contains all component routes and is rendered in app.js
class Dashboard extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() =>
          <div>
            <h3 className="hide-button" onClick={this.props.showUnanswered}>Unanswered Questions</h3>
            <h3 className="hide-button" onClick={this.props.showAnswered}>Answered Questions</h3>
            <ul className="list">
              {Object.keys(this.props.questions).sort((a,b) => this.props.questions[a].timestamp < this.props.questions[b].timestamp).map((question) => (
                <Question key={question} question={this.props.questions[question]}/>
              ))}
            </ul>
          </div>
        }/>
        <Route path="/add" component={NewQuestion} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/questions/" component={ListQuestion}/>
        <Route path="/404" component={Error}/>
      </div>
    )
  }
}

export default (Dashboard)
