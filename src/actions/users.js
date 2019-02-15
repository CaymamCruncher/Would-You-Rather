export const RECEIVE_USERS = 'RECEIVE_USERS'

export function receiveUsers(id) {
  return {
    type: RECEIVE_USERS,
    id
  }
}
