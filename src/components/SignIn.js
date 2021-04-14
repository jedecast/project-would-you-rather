import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleSetAuthedUser } from '../actions/authedUser'
import { Button } from './QuestionCard'



class SignIn extends Component {

  state = {
    authedUser: 'satoshinakamoto',
  }

  handleOnChange = ( e ) => {
    e.preventDefault()
    const value = e.target.value
    this.setState(() => ({
      authedUser: value,
    }))

  }

/* PUT HANDLING DISPATCH HERE TO PUSH AUTHED USER TO STORE */
  handleSignIn = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const authedUser = e.target[0].value
    console.log(authedUser)
    dispatch(handleSetAuthedUser(authedUser))
  }

  render() {
    return(
      <Container>
        <h4 style={{marginBottom:'32px'}}>Log In to Would You Ratherer</h4>
        <Form onSubmit={(e) => this.handleSignIn(e)}>
            <Select value={this.state.authedUser} onChange={(e) => this.handleOnChange(e)}>
              <option value="move" disabled>Users</option>
              <option value="satoshinakamoto">Satoshi Nakamoto</option>
              <option value="sergeynazarov">Sergey Nazarov</option>
              <option value="vitalikbuterin">Vitalik Buterin</option>
            </Select>
            <Button disabled={this.state.authedUser === '' || this.state.password === '' ? true : false}>Sign In</Button>
        </Form>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 120px;
`

const Form = styled.form`
  width: 600px;
`

const Select = styled.select`
  width: 100%;
  font-size: 16px;
  height: 40px;
  border: #E8E8E8 solid 2px;
  border-radius: 4px;
  padding: 4px 8px;
  margin-bottom: 16px;
  :focus {
    outline: none !important;
    border: rgba(29, 161, 242) solid 2px;
  }
`


function mapStateToProps(state) {
  return {loading: state.authedUser === null,}
}


export default connect(mapStateToProps)(SignIn)
