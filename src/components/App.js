import React, { Component, Fragment } from 'react'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading-bar'
import Dashboard from './Dashboard'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import LeaderBoard from './LeaderBoard'
import CreateQuestion from './CreateQuestion'
import SignIn from './SignIn'
import { Container404 } from './QuestionPage'

const Page404 = () => (
  <Container404>
     <p>Sorry, that page does not exist!</p>
  </Container404>
);

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    console.log(this.props.loading)
    if(this.props.loading === true) {
      return(
        <Container fluid style={{maxWidth:'1010px', display:'flex'}}>
          <SignIn />
        </Container>
      )
    }
    return(
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: 'rgba(29, 161, 242)', height: '2px' }} />
          <Container fluid style={{maxWidth:'1010px', display:'flex'}}>
            {this.props.loading === true
              ? null
              : <Nav />
            }
            {this.props.loading === true
              ? null
              : <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' component={QuestionPage} />
                  <Route path='/LeaderBoard' component={LeaderBoard} />
                  <Route path='/Add' component={CreateQuestion} />
                  <Route component={Page404} />
                </Switch>
            }
          </Container>
        </Fragment>
      </Router>
    )
  }
}


function mapStateToProps(state) {
  return {
    loading: state.authedUser === null,
    authedUser: state.authedUser
  }
}


export default connect(mapStateToProps)(App)
