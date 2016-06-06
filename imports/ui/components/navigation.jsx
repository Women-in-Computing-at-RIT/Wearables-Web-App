import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/signin'));

const getUserName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : {first: 'Unknown', last: 'Unknown'};
  return user ? `${name.first} ${name.last}` : 'No User';
};

export const PublicNavigation = () =>
  <Nav pullRight>
    <LinkContainer to="signin">
      <NavItem eventKey={1} href="/signin">Sign In</NavItem>
    </LinkContainer>
    <LinkContainer to="register">
      <NavItem eventKey={2} href="/register">Register</NavItem>
    </LinkContainer>
  </Nav>;

export const AuthNavigation = () =>
  <Nav pullRight>
    <LinkContainer to="/home">
      <NavItem eventKey={1} href="/home">Profile</NavItem>
    </LinkContainer>
    <LinkContainer to="/schedule">
      <NavItem event={2} href="/schedule">Schedule</NavItem>
    </LinkContainer>
    <LinkContainer to="/contact">
      <NavItem event={3} href="/contact">Contact Us</NavItem>
    </LinkContainer>
    <NavItem event={4} onClick={handleLogout}>Sign Out</NavItem>
  </Nav>;

export class AppNavigation extends React.Component {
  static renderNavigation(hasUser) {
    return hasUser ? <AuthNavigation /> : <PublicNavigation />;
  }

  render() {
    return <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Placeholder</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {AppNavigation.renderNavigation(this.props.hasUser)}
      </Navbar.Collapse>
    </Navbar>;
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object
};
