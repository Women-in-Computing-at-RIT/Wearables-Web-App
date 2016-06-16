/**
 * file: signInForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import { FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';

export const SignInForm = React.createClass({
  propTypes: {
    signInAction: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      signInBtnLabel: "Sign In"
    };
  },

  render() {
    return (
      <form ref="signin" className="signin" onSubmit={ this.props.signInAction }>
        <FormGroup>
          <ControlLabel>Email Address</ControlLabel>
          <FormControl
            type="email"
            ref="emailAddress"
            id="email"
            placeholder="Email Address"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>
            <span className="pull-left">Password</span>
          </ControlLabel>
          <FormControl
            type="password"
            ref="password"
            id="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button type="submit" className="center-block" bsStyle="success">{this.props.signInBtnLabel}</Button>
      </form>
    );
  }
});
