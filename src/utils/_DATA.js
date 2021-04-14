let users = {
  satoshinakamoto: {
    id: 'satoshinakamoto',
    name: 'Satoshi Nakamoto',
    avatarURL: 'https://cms.qz.com/wp-content/uploads/2014/03/satoshi1.jpg?quality=75&strip=all&w=1600&h=900&crop=1',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  vitalikbuterin: {
    id: 'vitalikbuterin',
    name: 'Vitalik Buterin',
    avatarURL: 'https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4.jpg',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  sergeynazarov: {
    id: 'sergeynazarov',
    name: 'Sergey Nazarov',
    avatarURL: 'https://insureblocks.com/wp-content/uploads/2020/12/Sergey-Nazarov-CEO-Chainlink-on-Insureblocks.jpg',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'satoshinakamoto',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['satoshinakamoto'],
      text: 'buy bitcoin',
    },
    optionTwo: {
      votes: [],
      text: 'hold fiat'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'sergeynazarov',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'paper hands',
    },
    optionTwo: {
      votes: ['sergeynazarov', 'satoshinakamoto'],
      text: 'diamond hands'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'satoshinakamoto',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'buy gamestop stock',
    },
    optionTwo: {
      votes: ['satoshinakamoto'],
      text: 'buy doge coin'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'vitalikbuterin',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer',
    },
    optionTwo: {
      votes: ['satoshinakamoto'],
      text: 'be a back-end developer'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'vitalikbuterin',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['vitalikbuterin'],
      text: 'receive 1 bitcoin',
    },
    optionTwo: {
      votes: ['sergeynazarov'],
      text: 'receive 32 ethereum'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'sergeynazarov',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['sergeynazarov'],
      text: 'learn solidity',
    },
    optionTwo: {
      votes: ['vitalikbuterin'],
      text: 'learn react'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}
