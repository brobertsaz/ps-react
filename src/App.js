import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
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
    loggedIn: false
  }

  setLoggedIn = () => {
    this.setState({
      loggedIn: true
    })
    this.props.history.push('/')
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
      <div className="App">
        <Nav state={this.state} logoutHandler={this.updateLogout} />
        <Switch>
          <Route exact path="/" component={Bills} />
          <Route path="/members" component={Members} />
          <Route path="/posts" component={Posts} />
          <Route path="/bill/:id" component={Bill} />
          <Route path="/member/:id" component={Member} />
          <Route path="/post/:id" component={Post} />
          <Route
            path="/register"
            render={() => (
              <Register
                parentState={this.state}
                registerHandler={this.setLoggedIn}
              />
            )}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                parentState={this.state}
                changeHandler={this.handleChange}
                loginHandler={this.setLoggedIn}
              />
            )}
          />
        </Switch>
        }
      </div>
    )
  }
}

export default withRouter(App)
