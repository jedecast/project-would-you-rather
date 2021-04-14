import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QuestionCard from './QuestionCard'
import RightContainer from './RightContainer'

const Page404 = () => (
   <Container404>
      <p>Sorry, that page does not exist!</p>
   </Container404>
);


class QuestionPage extends Component {

  render() {
    const { id, question } = this.props

    if (question == null) {
      return <Page404 />
    }
    return(
        <RightContainer sectionTitle='Question' navBack={true}>
          <CardsContainer>
            <QuestionCard id={id} showPoll={true}/>
          </CardsContainer>
        </RightContainer>
    )
  }
}

const CardsContainer = styled.div`
  margin-left: 60px;
`

export const Container404 = styled.div`
  font-weight: 800;
  font-size: 20px;
  width: 100%;
  flex: wrap;
  text-align: center;
  margin-top: 64px;
`


function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params

  return {
    id,
    question: questions[id],
  }

}



export default connect(mapStateToProps)(QuestionPage)
