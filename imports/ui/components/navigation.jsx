/**
 * file: navigation.jsx
 * authors: Matthew Crocco, Cara Steinberg
 */

import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import {AuthModal, AuthState} from './auth-modal';
import {isLoggedIn} from '../../modules/login';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));


/**
 * Gets the name of the logged in user. If no user is logged in (hope that never happens) or the User has no profile,
 * then "No User" is returned, if the user has no name in their profile, "Unknown Unknown" is returned.
 *
 * @returns {string} User Name as <firstname> <lastname> or "No User" or "Unknown Unknown"
 * @todo Do not rely on the user profile
 */
const getUserName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : {first: 'Unknown', last: 'Unknown'};
  return user ? `${name.first} ${name.last}` : 'No User';
};

// Navigation specification for anonymous users
export const PublicNavigation = ({parent}) => (
      <Nav pullRight>
        <LinkContainer to="/contact">
          <NavItem event={3} href="/contact">Contact Us</NavItem>
        </LinkContainer>
        <NavItem id="signin-navitem" eventKey={1} onClick={() => parent.refs.authModal.open(AuthState.SIGN_IN)}>Sign In</NavItem>
        <NavItem id="register-navitem" eventKey={2} onClick={() => parent.refs.authModal.open(AuthState.REGISTER)}>Register</NavItem>
      </Nav>
);

// Navigation specification for authenticated users
export const AuthNavigation = () => (
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
        <LinkContainer to="/">
          <NavItem event={4} href="/" onClick={handleLogout}>Sign Out</NavItem>
        </LinkContainer>
      </Nav>
);

export class AppNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.renderNavigation = this.renderNavigation.bind(this);
  }

  renderNavigation(hasUser) {
    return hasUser ? <AuthNavigation /> : <PublicNavigation parent={this} />;
  }

  render() {
    return (
      <Navbar className="navbar-static-top">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Placeholder</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.renderNavigation(this.props.hasUser)}
          {isLoggedIn() ? <div></div> : <AuthModal ref="authModal" authState={AuthState.SIGN_IN}/>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object
};
