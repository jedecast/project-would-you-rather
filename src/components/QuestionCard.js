import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import BarPoll from './BarPoll'
import { withRouter } from 'react-router-dom'
import { handleSaveAnswer } from '../actions/users'
import { handleVoting } from '../actions/questions'


class QuestionCard extends Component {

  toQuestion = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/question/${id}`)
  }

  handleOptionSelection = ( authedUser, qid, optionSelected ) => {
    const { dispatch } = this.props

    dispatch(handleSaveAnswer({
      authedUser,
      qid: qid,
      answer: optionSelected
    }))

    dispatch(handleVoting({
      authedUser,
      qid: qid,
      answer: optionSelected
    }))
  }

  calculatePercentage = (optionToCalc, optionOneTotal, optionTwoTotal) => {
    const total = optionOneTotal + optionTwoTotal
    let percentage = 0
    if (optionToCalc === 'optionOne' ) {
      percentage = optionOneTotal / total
    }

    if (optionToCalc === 'optionTwo') {
      percentage = optionTwoTotal / total
    }

    return percentage
  }


  render() {
    const { authedUser, id, author, authorHandle, avatarURL, optionOneText, optionOneVotes, optionTwoText, optionTwoVotes, showPoll } = this.props
    const backgroundImage = 'url(' + avatarURL + ')'
    const optionOneTotal = optionOneVotes.length
    const optionTwoTotal = optionTwoVotes.length
    const total = optionOneTotal + optionTwoTotal

    return(
      <Container>
        <Avatar style={{backgroundImage:backgroundImage, backgroundSize:'cover'}}/>
        <QuestionContainer>
          <p><span style={{fontWeight:'800'}}>{author}</span> <span>@{authorHandle}</span></p>
          { showPoll == true
            ? <ContentContainer>
                <p>Would you rather...</p>
                {
                  optionOneVotes.includes(authedUser) || optionTwoVotes.includes(authedUser)
                  ? <div>
                      <BarPoll
                        width={'484'}
                        percent={this.calculatePercentage('optionOne', optionOneTotal, optionTwoTotal)}
                        chosenAnswer={optionOneVotes.includes(authedUser)}
                        >
                        {optionOneText}
                      </BarPoll>
                      <BarPoll width={'484'}
                        percent={this.calculatePercentage('optionTwo', optionOneTotal, optionTwoTotal)}
                        chosenAnswer={optionTwoVotes.includes(authedUser)}
                        >
                        {optionTwoText}
                      </BarPoll>
                      <HelperText>{total} {total > 1 ? 'votes' : 'vote'}</HelperText>
                    </div>
                  : <div>
                      <Button onClick={() => this.handleOptionSelection(authedUser, id, 'optionOne')}>{optionOneText}</Button>
                      <Button onClick={() => this.handleOptionSelection(authedUser, id, 'optionTwo')}>{optionTwoText}</Button>
                  </div>
                }
              </ContentContainer>
            : <ContentContainer>
                <p>Would you rather...</p>
                <p>{optionOneText}...</p>
                <Button onClick={(e) => this.toQuestion(e, id)}>View Poll</Button>
              </ContentContainer>
          }
        </QuestionContainer>

      </Container>
    )
  }
}

export const Container = styled.div`
  display: flex;
  margin: 32px 0px 0px 0px;
  padding: 24px;
  border-radius: 16px;
  border: #E8E8E8 solid 2px;
  width: 600px;
`

export const QuestionContainer = styled.div`
  padding-left: 16px;
  width: 504px;
`

export const ContentContainer = styled.div`
  width: 100%;
`

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`

export const Button = styled.button`
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  border: rgba(29, 161, 242) solid 1px;
  border-radius: 32px;
  background: none;
  color: rgba(29, 161, 242);
  &:hover,
  &:focus {
    background-color: rgba(29, 161, 242, 0.094);
    color: rgba(29, 161, 242);
  }
`

const HelperText = styled.p`
  font-size: 16px;
  color: gray;
  margin: 16px 0 0 0;
`


function mapStateToProps ( { authedUser, questions, users }, { id } ) {
  const question = questions[id]
  const authorHandle =  users[question.author].id
  const authorName = users[question.author].name
  const avatarURL = users[question.author].avatarURL
  const optionOneText = question.optionOne.text
  const optionOneVotes = question.optionOne.votes
  const optionTwoText = question.optionTwo.text
  const optionTwoVotes = question.optionTwo.votes

  return {
    authedUser,
    author: authorName,
    authorHandle: authorHandle,
    avatarURL: avatarURL,
    optionOneText: optionOneText,
    optionOneVotes: optionOneVotes,
    optionTwoText: optionTwoText,
    optionTwoVotes: optionTwoVotes,

  }
}


export default withRouter(connect(mapStateToProps)(QuestionCard))
