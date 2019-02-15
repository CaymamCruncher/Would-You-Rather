import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import '../App.css'

class Login extends Component {

  login = (e, options) => {
    let correctUser = Object.keys(options).filter((option) => options[option].name === e.target.value)
    this.props.dispatch(setAuthedUser(correctUser[0]))
  }

  render() {
    //define options
    let options = []

    //if list of users has been retrieved redefine options
    if (this.props.options) {
      options = this.props.options
    }

    return (
      <div className="login">
        <h2>Please select your user</h2>
        <select onChange={(e) => this.login(e, options)}>
          <option>None</option>
          {Object.keys(options).map((option) => {
            return <option key={option}>{options[option].name}</option>
          })}
        </select>
      </div>
    )
  }
}

//retrieve list of users
function mapStateToProps({users}) {
  return {
    options: users
  }
}

export default connect(mapStateToProps)(Login)
