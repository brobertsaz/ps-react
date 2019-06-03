import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import './App.css'
import Bills from './Bills'
import Bill from './Bill'
import Members from './Members'
import Member from './Member'
import Posts from './Posts'
import Post from './Post'
import Nav from './Navigation'
import Login from './Login'
import Register from './Register'

class App extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    loggedIn: null
  }

  setLoggedIn = () => {
    this.setState({
      loggedIn: true
    })
    this.props.history.push('/bills')
  }

  updateLogout = () => {
    this.setState({
      loggedIn: false
    })
    this.props.history.push('/')
  }

  handleChange = event => {
    const {
      target: { name, value }
    } = event
    this.setState({ [name]: value })
  }

  componentDidMount() {
    if (localStorage.getItem('auth-token')) {
      this.setState({ loggedIn: true })
    }
  }

  render() {
    return (
      <div className='App'>
        <Nav state={this.state} logoutHandler={this.updateLogout} />
        <Switch>
          <Route
            exact
            path='/'
            isLoggedIn={this.state.loggedIn}
            component={Bills}
          />
          <Route
            path='/members'
            isLoggedIn={this.state.loggedIn}
            component={Members}
          />
          <Route
            path='/posts'
            isLoggedIn={this.state.loggedIn}
            component={Posts}
          />
          <Route
            path='/bill/:id'
            isLoggedIn={this.state.loggedIn}
            component={Bill}
          />
          <Route
            path='/member/:id'
            isLoggedIn={this.state.loggedIn}
            component={Member}
          />
          <Route
            path='/post/:id'
            isLoggedIn={this.state.loggedIn}
            component={Post}
          />
          <Route
            path='/register'
            render={() => (
              <Register
                parentState={this.state}
                changeHandler={this.handleChange}
                registerHandler={this.setLoggedIn}
              />
            )}
          />
          <Route
            path='/login'
            render={() => (
              <Login
                parentState={this.state}
                changeHandler={this.handleChange}
                loginHandler={this.setLoggedIn}
              />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
