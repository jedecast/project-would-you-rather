import { RECEIVE_USERS, SAVE_ANSWER, SAVE_USER_QUESTION } from '../actions/users'


export default function users (state = {}, action) {
  switch(action.type) {
    case SAVE_ANSWER :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          }
        }
      }
    case SAVE_USER_QUESTION :
      console.log(action)
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.qid]),
        }
      }
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    default :
      return state
  }
}
