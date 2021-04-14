import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import RightContainer from './RightContainer'
import { Container, QuestionContainer, ContentContainer, Avatar, Button } from './QuestionCard'
import { CardsContainer } from './Dashboard'

class LeaderBoard extends Component {

  render() {
    const { userLeaderBoard, users } = this.props

    return(
      <RightContainer sectionTitle='Leader Board'>
        {userLeaderBoard.map((user) => (
          <CardsContainer key={user[0]}>
            <Container>
              <Avatar style={{backgroundImage:`url(${users[user[0]].avatarURL})`, backgroundSize:'cover'}}/>
              <QuestionContainer>
                <p><span style={{fontWeight:'800'}}>{users[user[0]].name}</span> <span>@{user[0]}</span></p>
                <ContentContainer>
                <ScoreContainer>
                  <div>
                    <NumberTotal style={{margin:'8px 0',}}>Created Questions <Number>{user[2]}</Number></NumberTotal>
                    <div style={{border:'#E8E8E8 solid 1px'}}></div>
                    <NumberTotal style={{marginTop:'8px'}}>Answered Questions <Number>{user[3]}</Number></NumberTotal>
                  </div>
                  <Total>
                    <TotalHeader>Total Score</TotalHeader>
                    <TotalNumber>
                      <span>{user[1]}</span>
                    </TotalNumber>
                  </Total>
                </ScoreContainer>
                </ContentContainer>
              </QuestionContainer>
            </Container>
          </CardsContainer>
        ))}

      </RightContainer>
    )
  }
}

const ScoreContainer = styled.div`
  display: flex;
  position: relative;
`

const Total = styled.div`
  width: 124px;
  height: 124px;
  border-radius: 8px;
  border: #E8E8E8 solid 2px;
  margin-left: auto;
`

const TotalHeader = styled.div`
  height: 40px;
  width: 100%;
  background-color: #E8E8E8;
  padding: 8px;
  text-align: center;
`

const TotalNumber = styled.div`
  text-align: center;
  padding: 8px;
  font-size: 32px;
  font-weight: 800;
`

const NumberTotal = styled.div`
  height: 40px;
  padding: 8px;
  font-size: 16px;
  font-weight: 400;
  width: 320px;
  position: relative;
`

const Number = styled.span`
  position: absolute;
  right: 12px;
  font-weight: 800;
`




function mapStateToProps ( { authedUser, users } ) {
  let userLeaderBoard = []
  for (const [key, value] of Object.entries(users)) {
    userLeaderBoard.push([`${key}`, `${value.questions.length + Object.keys(value.answers).length}`,  `${value.questions.length}` ,`${Object.keys(value.answers).length}`]);
  }

  userLeaderBoard = userLeaderBoard.sort(function(a, b) {
      return b[1] - a[1];
    });

  console.log(userLeaderBoard)


  return {
    users,
    userLeaderBoard,
  }
}


export default connect(mapStateToProps)(LeaderBoard)
