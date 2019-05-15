import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const POSTS_QUERY = gql`
  query PostsQuery($first: Int) {
    allPosts(first: $first) {
      nodes {
        id
        title
        url
        source
      }
    }
  }
`

class Posts extends Component {
  render() {
    return (
      <div className="container">
        <Query query={POSTS_QUERY} variables={{ first: 30 }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            return data.allPosts.nodes.map(({ id, title, url, source }) => (
              <div key={id}>
                <div className="card mt-3">
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{url}</p>
                    <p className="card-text">{source}</p>
                    <Link to={`/post/${id}`}>View</Link>
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

export default Posts
