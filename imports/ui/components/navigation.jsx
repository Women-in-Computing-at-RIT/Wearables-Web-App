/**
 * file: navigation.jsx
 * authors: Matthew Crocco, Cara Steinberg
 */

import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import {AuthModal, AuthState} from './auth-modal';
import {Routes} from '../../modules/constants';
import {isLoggedIn} from '../../modules/login';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));

// Navigation specification for anonymous users
/* eslint-disable no-extra-parens */
export const PublicNavigation = ({parent}) => (
      <Nav pullRight>
        <LinkContainer to={Routes.contact}>
          <NavItem event={3} href="/contact">Contact Us</NavItem>
        </LinkContainer>
        <NavItem id="signin-navitem" eventKey={1} onClick={() => parent.refs.authModal.open(AuthState.SIGN_IN)}>Sign In</NavItem>
        <NavItem id="register-navitem" eventKey={2} onClick={() => parent.refs.authModal.open(AuthState.REGISTER)}>Register</NavItem>
      </Nav>
);

// Navigation specification for authenticated users
export const AuthNavigation = () => (
      <Nav pullRight>
        <LinkContainer to={Routes.homepage}>
          <NavItem eventKey={1}>Profile</NavItem>
        </LinkContainer>
        <LinkContainer to={Routes.schedule}>
          <NavItem event={2}>Schedule</NavItem>
        </LinkContainer>
        <LinkContainer to={Routes.contact}>
          <NavItem event={3}>Contact Us</NavItem>
        </LinkContainer>
        <NavItem event={4} onClick={handleLogout}>Sign Out</NavItem>
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
            <Link to={Routes.index}>Placeholder</Link>
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
/* eslint-enable no-extra-parens */
