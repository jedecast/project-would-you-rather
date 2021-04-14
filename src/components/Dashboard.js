import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QuestionCard from './QuestionCard'
import RightContainer from './RightContainer'

class Dashboard extends Component {

  state = {
    isOnUnanswered: true,
  }

  handleToggleTrue = () => {
    this.setState(() => ({
      isOnUnanswered: true
    }))
  }

  handleToggleFalse = () => {
    this.setState(() => ({
      isOnUnanswered: false
    }))
  }

  render() {
    const { allQuestionsID, userAnswersID } = this.props
    return(
      <RightContainer sectionTitle='Home'>
        <TabContainer>
          <TabButton onClick={() => this.handleToggleTrue()} style={ this.state.isOnUnanswered ? {borderBottom:'solid 3px', color:'rgba(29, 161, 242)'} : {border:'none'}}>Uanswered Questions</TabButton>
          <TabButton onClick={() => this.handleToggleFalse()} style={ !this.state.isOnUnanswered ? {borderBottom:'solid 3px', color:'rgba(29, 161, 242)'} : {border:'none'}}>Answered Questions</TabButton>
        </TabContainer>

        <CardsContainer>
          {this.state.isOnUnanswered &&
            <div>
              <CardList>
              { allQuestionsID.filter((id) => (
                  !userAnswersID.includes(id)
                )).map((id) => (
                  <li key={id}>
                    <QuestionCard id={id} />
                  </li>
                ))}
              </CardList>
            </div>
          }

          {!this.state.isOnUnanswered &&
            <div>
              <CardList>
              {userAnswersID.map((id) => (
                <li key={id}>
                  <QuestionCard id={id} />
                </li>
              ))}
              </CardList>
            </div>
          }

        </CardsContainer>
      </RightContainer>
    )
  }
}

export const CardsContainer = styled.div`
  margin-left: 60px;
`

const TabContainer = styled.div`
  display: flex;
  border-bottom: #E8E8E8 solid 2px;
  position: sticky;
  top: 0;
  background-color: white;
`

const TabButton = styled.button`
  width: 360px;
  height: 52px;
  padding: 12px;
  text-align: center;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-weight: 600;
  border: white solid 3px;
  background: none;
  &:hover,
  &:focus {
    background-color: rgba(29, 161, 242, 0.094);
    color: rgba(29, 161, 242);
  }
`

const CardList = styled.ul`
  list-style-type: none;
  padding-left: 0px;
`

function mapStateToProps ( state ) {
  const questions = state.questions
  const user = state.authedUser

  return {
    allQuestionsID: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    userAnswersID: Object.keys(state.users[user].answers)
  }
}


export default connect(mapStateToProps)(Dashboard)
