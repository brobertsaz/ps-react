import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export default function Navigation() {
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
          <Nav>
            <Nav.Link href="/">User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
