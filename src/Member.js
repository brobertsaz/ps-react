import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const MEMBER_QUERY = gql`
  query MemberQuery($memberId: ID!) {
    member(id: $memberId) {
      id
      name
      bio
      url
    }
  }
`
class Member extends Component {
  render() {
    return (
      <Query
        query={MEMBER_QUERY}
        variables={{ memberId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          return (
            <div className="container">
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">{data.member.name}</h5>
                  <p className="card-text">
                    {ReactHtmlParser(data.member.bio)}
                  </p>
                  <p className="card-text">{data.member.url}</p>
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Member
