import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import AuthService from 'federation_demo_auth/AuthService';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: AuthService.loggedIn()};
  }

  logout = () => {
    AuthService.logOut()
    this.setState({ isAuthenticated: false });
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Recipes App
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/recipes">
            Recipes
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
        <Nav >
          {this.state.isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/my-recipes">
                My Recipes
              </Nav.Link>
              <Button id="logout-button" variant="secondary" onClick={this.logout}>
                <Nav.Link id="logout-link" as={Link} to="/log-in">
                  Logout
                </Nav.Link>
              </Button>
            </>
          )}
          {!this.state.isAuthenticated && (
            <Nav.Link as={Link} to="/log-in">
              Log in
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    );
  }
}
