import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'

class Navigation extends Component {
  logout = event => {
    event.preventDefault()
    localStorage.removeItem('auth-token')
    this.props.logoutHandler({ loggedIn: false })
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">React, Rails, and GraphQL</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/members">Members</Nav.Link>
              <Nav.Link href="/posts">Posts</Nav.Link>
            </Nav>
            {this.props.state.loggedIn ? (
              <Nav>
                <Nav.Link href="/" onClick={this.logout}>
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Navigation
