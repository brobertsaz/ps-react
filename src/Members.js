import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_MEMBERS_QUERY = gql`
  query ALL_MEMBERS_QUERY($first: Int) {
    allMembers(first: $first) {
      nodes {
        id
        name
        bio
        url
      }
    }
  }
`
class Members extends Component {
  render() {
    return (
      <div className="container">
        <Query query={ALL_MEMBERS_QUERY} variables={{ first: 30 }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            return data.allMembers.nodes.map(({ id, name, bio, url }) => (
              <div key={id}>
                <div className="card mt-3">
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{ReactHtmlParser(bio)}</p>
                    <p className="card-text">{url}</p>
                    <Link to={`/member/${id}`}>View</Link>
                  </div>
                </div>
              </div>
            ))
          }}
        </Query>
      </div>
    )
  }
}

export default Members
