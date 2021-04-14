import { saveQuestionAnswer, saveQuestion } from '../utils/api.js'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { handleSaveQuestion } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_VOTE = 'SAVE_VOTE'
export const SAVE_QUESTION = 'SAVE_QUESTION'


export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function SaveVote ({ authedUser, qid, answer }) {
  return {
    type: SAVE_VOTE,
    authedUser,
    qid,
    answer
  }
}


export function handleVoting (info) {
  return (dispatch) => {
    dispatch(SaveVote(info))

    return saveQuestionAnswer(info)
    .catch((e) => {
      console.warn('Error in handleVoting: ', e)
      dispatch(SaveVote(info))
      alert('The was an error saving the answer. Try again.')
      })
  }
}


function SaveWouldYouRather( question, dispatch, authedUser ) {
  const questionUser = {
    qid: question.id,
    authedUser
  }
  dispatch(handleSaveQuestion(questionUser))

  return {
    type: SAVE_QUESTION,
    question
  }
}

export function handleSavingQuestion (optionOneText, optionTwoText, authedUser  ) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestion({ optionOneText, optionTwoText, author: authedUser})
      .then((question) => dispatch(SaveWouldYouRather(question, dispatch, authedUser)))
      .then(() => dispatch(hideLoading()))
  }
}
