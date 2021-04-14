import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'


class RightContainer extends Component {
  goBack = (e) => {
    e.preventDefault()
    this.props.history.goBack();
  }

  render() {
    const { children, sectionTitle, navBack } = this.props
    return(
      <Container>
        <HeaderContainer>
          {navBack &&
            <BackButton onClick={(e) => this.goBack(e)}>Back</BackButton>
          }
          <SectionTitle>{sectionTitle}</SectionTitle>
        </HeaderContainer>
        {children}
      </Container>
    )
  }
}



const Container = styled.div`
  border-left: #E8E8E8 solid 2px;
  border-right: #E8E8E8 solid 2px;
  width: 720px;
  height: 100VH;
  overflow: scroll;
  ::-webkit-scrollbar {display:none;}
`

const HeaderContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
`


const SectionTitle = styled.p`
  font-size: 20px;
  font-weight: 800;
  height: 56px;
  padding: 16px 16px;
  margin: 0;
`

const BackButton = styled.button`
  height: 52px;
  padding: 12px;
  text-align: center;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-weight: 600;
  border: white solid 3px;
  background: none;
  color: rgba(29, 161, 242);
  margin-top: 4px;
  &:hover,
  &:focus {
    background-color: rgba(29, 161, 242, 0.094);
  }
`

export default withRouter(RightContainer)
