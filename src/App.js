import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Bills from './Bills'
import Bill from './Bill'
import Members from './Members'
import Posts from './Posts'
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
        </Switch>
      </div>
    )
  }
}

export default App
