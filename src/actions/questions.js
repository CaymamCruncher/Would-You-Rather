import {saveQuestionAnswer, saveQuestion} from '../utils/api'
import {receiveUsers} from './users'
import {showLoading, hideLoading} from 'react-redux-loading'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function receiveQuestions(id) {
  return {
    type: RECEIVE_QUESTIONS,
    id
  }
}

export function handleSaveAnswer({authedUser, qid, answer}) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer({authedUser, qid, answer}).then((response) => {
      dispatch(saveAnswer({authedUser, qid, answer}))
      dispatch(receiveUsers(response.users))
      dispatch(receiveQuestions(response.questions))
      dispatch(hideLoading())
    })
  }
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestion(question).then((response) => {
      dispatch(saveQuestions(response.formattedQuestion))
      dispatch(receiveUsers(response.users))
      dispatch(receiveQuestions(response.questions))
      dispatch(hideLoading())
    })
  }
}

export function saveQuestions(question) {
  return {
    type: SAVE_QUESTION,
    question
  }
}

export function saveAnswer({authedUser, qid, answer}) {
  return {
    type: SAVE_ANSWER,
    qid,
    authedUser,
    answer
  }
}
