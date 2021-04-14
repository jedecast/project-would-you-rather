import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import RightContainer from './RightContainer'
import { Redirect } from 'react-router-dom'

import { Container, QuestionContainer, ContentContainer, Avatar, Button } from './QuestionCard'
import { CardsContainer } from './Dashboard'
import { handleSavingQuestion } from '../actions/questions'
class CreateQuestion extends Component {

  state = {
    valueOne: '',
    valueTwo: '',
    toHome: false,
  }

  handleOnChange = ( optionSelected, e ) => {
    e.preventDefault()
    const value = e.target.value

    if (optionSelected === 'optionOne') {
      this.setState(() => ({
        valueOne: value,
      }))
    }

    if (optionSelected === 'optionTwo') {
      this.setState(() => ({
        valueTwo: value,
      }))
    }
  }

  handleCreateQuestion = (e) => {
    e.preventDefault()
    const { dispatch, authedUser } = this.props
    const optionOneText = e.target[0].value
    const optionTwoText =  e.target[1].value
    dispatch(handleSavingQuestion(optionOneText, optionTwoText, authedUser))

    this.setState(() => ({
      valueOne: '',
      valueTwo: '',
      toHome: true,
    }))

  }

  render() {
    const { avatarURL } = this.props
    const backgroundImage = 'url(' + avatarURL + ')'

    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }

    return(
      <RightContainer sectionTitle='Create a Question'>
        <CardsContainer>
          <Container>
            <Avatar style={{backgroundImage:backgroundImage, backgroundSize:'cover'}}/>
            <QuestionContainer>
              <p style={{color:'gray'}}>Would you rather...</p>

              <ContentContainer>
              <Form onSubmit={(e) => this.handleCreateQuestion(e)}>
                <Input placeholder='Option One' value={this.state.valueOne} onChange={(e) => this.handleOnChange('optionOne', e)}/>
                <p>OR</p>
                <Input placeholder='Option Two' value={this.state.valueTwo} onChange={(e) => this.handleOnChange('optionTwo', e)}/>
                <Button disabled={this.state.valueOne === '' || this.state.valueTwo === '' ? true : false}>Submit Question</Button>
              </Form>
              </ContentContainer>
            </QuestionContainer>
          </Container>
        </CardsContainer>
      </RightContainer>
    )
  }
}

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  height: 40px;
  border: #E8E8E8 solid 2px;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  :focus {
    outline: none !important;
    border: rgba(29, 161, 242) solid 2px;
  }
`


function mapStateToProps ( { authedUser, users } ) {
  const avatarURL = users[authedUser].avatarURL


  return {
    authedUser,
    avatarURL: avatarURL,
  }
}


export default connect(mapStateToProps)(CreateQuestion)
