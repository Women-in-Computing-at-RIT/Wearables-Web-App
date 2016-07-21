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
import {isLoggedIn} from '../../modules/auth/login';

const handleLogout = (route) =>
  () => Meteor.logout((error) => {
    if(_.isNil(error))
      browserHistory.push(route);
    else
      console.log(error);
  });

// Navigation specification for anonymous users
/* eslint-disable no-extra-parens */
export const PublicNavigation = ({parent}) => (
      <Nav pullRight>
        <LinkContainer to={Routes.contact}>
          <NavItem event={3} href={Routes.contact}>Contact Us</NavItem>
        </LinkContainer>
        <NavItem id="signin-navitem" eventKey={1} onClick={() => parent.refs.authModal.open(AuthState.SIGN_IN)}>Sign In</NavItem>
        <NavItem id="register-navitem" eventKey={2} onClick={() => parent.refs.authModal.open(AuthState.REGISTER)}>Register</NavItem>
      </Nav>
);

// Navigation specification for authenticated users
export const AuthNavigation = ({parent}) => (
      <Nav pullRight>
        <LinkContainer to={Routes.homepage}>
          <NavItem eventKey={1} href={Routes.homepage}>Profile</NavItem>
        </LinkContainer>
        <LinkContainer to={Routes.schedule}>
          <NavItem event={2} href={Routes.schedule}>Schedule</NavItem>
        </LinkContainer>
        <LinkContainer to={Routes.contact}>
          <NavItem event={3} href={Routes.contact}>Contact Us</NavItem>
        </LinkContainer>
        {/* No Link Container because handleLogout pushes Routes.index onto browserHistory */}
        <NavItem event={4} href={Routes.index} onClick={handleLogout(Routes.index)}>Sign Out</NavItem>
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
      <Navbar fixedTop={true}>
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
