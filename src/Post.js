import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const POST_QUERY = gql`
  query PostQuery($postId: ID!) {
    post(id: $postId) {
      id
      title
      url
      source
    }
  }
`

class Post extends Component {
  render() {
    return (
      <div className="container">
        <Query
          query={POST_QUERY}
          variables={{ postId: this.props.match.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            return (
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">{data.post.title}</h5>
                  <p className="card-text">{data.post.url}</p>
                  <p className="card-text">{data.post.source}</p>
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Post
