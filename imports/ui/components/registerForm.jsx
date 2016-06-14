/**
 * file: registerForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import Schemas from '../../modules/schemas';
import { Row, Col, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';



export const RegisterForm = React.createClass({
  handleSubmit (e) {
    e.preventDefault();
  },

  render() {
    return (
      <form ref="signup" className="signup" onSubmit={ this.handleSubmit }>
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            ref="firstName"
            name="firstName"
            placeholder="First Name"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            ref="lastName"
            name="lastName"
            placeholder="Last Name"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email Address</ControlLabel>
          <FormControl
            type="text"
            ref="emailAddress"
            name="emailAddress"
            placeholder="Email Address"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            ref="password"
            name="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button type="submit" className="center-block" bsStyle="success">Register</Button>
      </form>
    );
  }
});
