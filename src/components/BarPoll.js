import React, { Component } from 'react'
import styled from 'styled-components'


class Bar extends Component {
  state = {
    progress: 0,
  }

  setProgress = (percent, width) => {
    this.setState(() => ({
      progress: percent * width
    }))
  }


  componentDidMount = () => {
    this.setProgress(this.props.percent, this.props.width)
  }


  render() {
    const { width, children, chosenAnswer } = this.props

    return(
      <ProgressDiv style={{width: width}}>
        <Progress style={ chosenAnswer ? {backgroundColor: 'rgba(29, 161, 242, 0.7)', width: `${this.state.progress}px`} : {backgroundColor: 'rgb(233, 233, 233)', width: `${this.state.progress}px`}}>
          <OptionText style={chosenAnswer ? {fontWeight:'800'} : {fontWeight:'400'}}>{ children }</OptionText>
        </Progress>
      </ProgressDiv>
    )
  }
}
const ProgressDiv = styled.div`
  border-radius: 8px;
  margin-top: 8px;
`

const Progress = styled.div`
  background-color: rgba(29, 161, 242, 0.7);
  height: 40px;
  border-radius: 8px;
  transition: 1s ease;
  transition-delay: 0.5s;
  white-space: nowrap;
  display: flex;
  align-items: center;
`

const OptionText = styled.span`
  padding-left: 16px;
`


export default Bar
