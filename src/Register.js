import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const registerMutation = gql`
  mutation($email: String!, $name: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password }) {
      clientMutationId
      user {
        id
      }
      errors {
        message
      }
    }
  }
`

class Register extends Component {
  onSubmit = async () => {
    console.log('Props ', this.props)
    const { name, email, password } = this.props.parentState
    const response = await this.props.mutate({
      variables: { name, email, password }
    })
    const { token, errors } = response.data.createUser
    if (errors.length > 0) alert('We got an error')
    if (token) {
      localStorage.setItem('auth-token', token)
      this.props.loginHandler({ loggedIn: true })
    }
  }

  render() {
    const { name, email, password } = this.props.parentState
    const isEnabled = email.length > 0 && password.length > 0
    return (
      <div className='container my-5'>
        <div className='col-sm-6 offset-3'>
          <Form>
            <Form.Group controlId='formBasicName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={name}
                name='name'
                onChange={this.props.changeHandler}
                type='text'
                placeholder='Enter full name'
              />
            </Form.Group>

            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                name='email'
                onChange={this.props.changeHandler}
                type='email'
                placeholder='Enter email'
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                name='password'
                onChange={this.props.changeHandler}
                type='password'
                placeholder='Password'
              />
            </Form.Group>
            <Button
              variant='primary'
              onClick={this.onSubmit}
              disabled={!isEnabled}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default graphql(registerMutation)(Register)
