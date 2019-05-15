import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Bills from './Bills'
import Bill from './Bill'
import Members from './Members'
import Member from './Member'
import Posts from './Posts'
import Post from './Post'
import Nav from './Navigation'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Bills} />
          <Route path="/members" component={Members} />
          <Route path="/posts" component={Posts} />
          <Route path="/bill/:id" component={Bill} />
          <Route path="/member/:id" component={Member} />
          <Route path="/post/:id" component={Post} />
        </Switch>
      </div>
    )
  }
}

export default App
