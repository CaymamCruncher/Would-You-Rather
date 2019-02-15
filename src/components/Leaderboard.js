import React, {Component} from 'react'
import {connect} from 'react-redux'

class Leaderboard extends Component {
  render() {
    let users = this.props.users
    let sortedUsers = Object.keys(users).map((user) => (users[user]))
      .sort((a,b) => (Object.keys(b.answers).length + b.questions.length > Object.keys(a.answers).length + a.questions.length))
    return (
      <div>
        <ul>
          {sortedUsers.map((user, id) => (
            <li key={id} className="leaderboard-li">
              <img className="avatar" src={user.avatarURL} alt={'Avatar of ' + user.name} />
              <h3>{user.name} is in place {sortedUsers.indexOf(user) + 1}</h3>
              <h4>Total Number of questions answered: {Object.keys(user.answers).length}</h4>
              <h4>Total Number of questions asked: {user.questions.length}</h4>
              <h4>Total score: {Object.keys(user.answers).length + user.questions.length}</h4>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)
