import React, { Component } from 'react'

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/posts')
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts.data }))
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>ID: {post.id}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Posts
