/**
 * file: signInForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import Schemas from '../../modules/schemas';
import { FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';

export const SignInForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
  },

  render() {
    return (
      <form ref="signin" className="signin" onSubmit={ this.handleSubmit }>
        <FormGroup>
          <ControlLabel>Email Address</ControlLabel>
          <FormControl
            type="email"
            ref="emailAddress"
            name="emailAddress"
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
            name="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button type="submit" className="center-block" bsStyle="success">Sign In</Button>
      </form>
    );
  }
});
