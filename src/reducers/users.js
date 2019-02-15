import {RECEIVE_USERS} from '../actions/users'

export default function users(state = null, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.id
      }
    default:
      return state
  }
}
