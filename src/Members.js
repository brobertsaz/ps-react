import React, { Component } from 'react'

class Members extends Component {
  state = {
    members: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/members')
      .then(response => response.json())
      .then(members => this.setState({ members: members.data }))
  }

  render() {
    return (
      <div>
        <h2>Members</h2>
        <ul>
          {this.state.members.map(member => (
            <li key={member.id}>
              ID: {member.id}
              Last name {member.attributes.summary}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Members
