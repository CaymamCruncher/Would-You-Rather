import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Error extends Component {
  render() {
    return (
      <div>
        <h1>The page you are looking for does not exist</h1>
        <Link to="/">Click here to return to the homepage</Link>
      </div>
    )
  }
}

export default connect()(Error)
