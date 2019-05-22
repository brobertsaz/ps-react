import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    signinUser(input: { email: $email, password: $password }) {
      token
      user {
        id
      }
      errors {
        message
      }
    }
  }
`

class Login extends Component {
  validateForm() {
    console.log('validating')
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  onSubmit = async () => {
    const { email, password } = this.props.parentState
    const response = await this.props.mutate({
      variables: { email, password }
    })
    const { token, errors } = response.data.signinUser
    if (errors.length > 0) alert('We got an error')
    if (token) {
      localStorage.setItem('auth-token', token)
      this.props.loginHandler({ loggedIn: true })
    }
  }

  render() {
    const { email, password } = this.props.parentState
    const isEnabled = email.length > 0 && password.length > 0
    return (
      <div className="container my-5">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              name="email"
              onChange={this.props.changeHandler}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              name="password"
              onChange={this.props.changeHandler}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={this.onSubmit}
            disabled={!isEnabled}
          >
            Login
          </Button>
        </Form>
      </div>
    )
  }
}

export default graphql(loginMutation)(Login)
