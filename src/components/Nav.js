import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'
import { Button } from './QuestionCard'



class Nav extends Component {

  state = {
    page: 'home',
    display: 'show',
  }

  toHome = (e) => {
    e.preventDefault()
    this.props.history.push(`/`)
    this.setState(() => ({
      page: 'home'
    }))
  }

  toLeaderBoard = (e) => {
    e.preventDefault()
    this.props.history.push(`/LeaderBoard`)
    this.setState(() => ({
      page: 'leaderboard'
    }))
  }

  toCreateQuestion = (e) => {
    e.preventDefault()
    this.props.history.push(`/Add`)
    this.setState(() => ({
      page: ''
    }))
  }

  handleSignOut = () => {
    const { dispatch } = this.props

    dispatch(handleSetAuthedUser(null))
  }

  /*
  CREATE HANDLER FUNCTION TO HANDLE SHOWING on MOUSE HOVER
  */


  render() {
    const { authedUser, profile } = this.props
    const avatarURL = profile.avatarURL
    const backgroundImage = 'url(' + avatarURL + ')'
    const name = profile.name
    const handle = '@' + authedUser

    return(
      <Container>
        <div style={{height:'40px'}}/>
        <br />
        <ButtonNav onClick={(e) => this.toHome(e)} style={this.state.page === 'home' ? {color:'rgba(29, 161, 242)'} : {color:'black'}}>Home</ButtonNav>
        <br />
        <ButtonNav onClick={(e) => this.toLeaderBoard(e)} style={this.state.page === 'leaderboard' ? {color:'rgba(29, 161, 242)'} : {color:'black'}}>Leader Board</ButtonNav>
        <br />
        <CreateQuestion onClick={(e) => this.toCreateQuestion(e)}>Create a Question</CreateQuestion>
        <LogoutContainer>
          <Menu>
            <MenuName>
              <AvatarAuthed style={{backgroundImage:backgroundImage, backgroundSize:'cover', margin:'4px 0 0 0'}}/>
              <div>
                <NameAuthed>{name}</NameAuthed>
                <NameAuthed style={{fontWeight:'400', color:'gray'}}>{handle}</NameAuthed>
              </div>
            </MenuName>
            <Button onClick={() => this.handleSignOut()}>
              Log Out
            </Button>
          </Menu>
          <ButtonAuthed>
            <AvatarAuthed style={{backgroundImage:backgroundImage, backgroundSize:'cover'}}/>
            <div>
              <NameAuthed>{name}</NameAuthed>
              <NameAuthed style={{fontWeight:'400', color:'gray'}}>{handle}</NameAuthed>
            </div>
          </ButtonAuthed>
        </LogoutContainer>
      </Container>
    )
  }
}


const Container = styled.div`
  height: 100VH;
  width: 260px;
`

const ButtonNav = styled.button`
  font-size: 20px;
  font-weight: 700;
  height: 60px;
  padding: 12px 32px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  border: white solid 3px;
  border-radius: 32px;
  background: none;
  margin-top: 8px;
  &:hover,
  &:focus {
    background-color: rgba(29, 161, 242, 0.094);
    color: rgba(29, 161, 242);
  }
`

const CreateQuestion = styled.button`
  font-size: 16px;
  font-weight: 800;
  height: 60px;
  padding: 12px 32px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 32px;
  background-color: rgba(29, 161, 242);
  border: none;
  color: white;
  margin-top: 16px;
  &:hover,
  &:focus {

  }
`
const ButtonAuthed = styled.button`
  font-size: 15px;
  font-weight: 700;
  height: 64px;
  padding: 8px 12px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  border: white solid 3px;
  border-radius: 32px;
  background: none;
  margin-top: 8px;
  display: flex;
  &:hover,
  &:focus {
    background-color: rgba(29, 161, 242, 0.094);
    color: rgba(29, 161, 242);
  }
`

const AvatarAuthed = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 24px;
`

const NameAuthed = styled.p`
  margin: 0;
  padding: 0 16px 0 8px;
`

const LogoutContainer = styled.div`
  position: absolute;
  bottom: 32px;
  width: auto;
  height: 64px;
`

const MenuName = styled.div`
  height: 64px;
  display: flex;
`


const Menu =  styled.div`
  width: 280px;
  height: 0px;
  overflow: hidden;
  position: absolute;
  bottom: 64px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 8px;
  background-color: white;

  ${LogoutContainer}:hover & {
    transform: translateY(-10px);
    height: 140px;
    padding: 12px;
    -webkit-box-shadow: 0px 2px 30px 0px rgba(158,158,158,0.5);
    -moz-box-shadow: 0px 2px 30px 0px rgba(158,158,158,0.5);
    box-shadow: 0px 2px 30px 0px rgba(158,158,158,0.5);
  }
`



function mapStateToProps({authedUser, users}) {
  const profile = users[authedUser]

  return {
    authedUser,
    profile

  }
}


export default withRouter(connect(mapStateToProps)(Nav))
