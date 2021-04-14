import { saveQuestionAnswer } from '../utils/api.js'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION'

function SaveAnswer ({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}


export function handleSaveAnswer (info) {
  return (dispatch) => {
    dispatch(SaveAnswer(info))

    return saveQuestionAnswer(info)
    .catch((e) => {
      console.warn('Error in handleSaveAnswer: ', e)
      dispatch(SaveAnswer(info))
      alert('The was an error saving the answer. Try again.')
      })
  }
}

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

function saveQuestionToUser ( authedUser, qid ) {
  return {
    type: SAVE_USER_QUESTION,
    qid,
    authedUser,
  }
}

export function handleSaveQuestion (questionUser) {
  const { authedUser, qid } = questionUser
  return (dispatch) => {
    dispatch(saveQuestionToUser(authedUser, qid))
  }
}
