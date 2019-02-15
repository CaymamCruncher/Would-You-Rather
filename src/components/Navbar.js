import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {Link} from 'react-router-dom'


//navbar component contains all links and is rendered in app.js
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/add" className="nav-link">New Question</Link>
        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
        {this.props.loggedIn && (
          <span>
            <span className="nav-span">Welcome {this.props.loggedInUser}</span>
            <Link to="/" className="nav-link" onClick={() => this.props.dispatch(setAuthedUser(null))}>Logout</Link>
          </span>
        )}
      </nav>
    )
  }
}

export default connect()(Navbar)
