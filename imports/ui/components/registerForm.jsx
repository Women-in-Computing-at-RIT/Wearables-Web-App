/**
 * file: registerForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';

import Schemas from '../../modules/schemas';

export const RegisterForm = React.createClass({
  propTypes: {
    submitAction: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      submitBtnLabel: "Register"
    };
  },

  render() {
    return (
      <form schema={Schemas.User} ref="register" className="register" onSubmit={ this.props.submitAction }>
        {/*<FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            ref="firstName"
            id="firstName"
            placeholder="First Name"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            ref="lastName"
            id="lastName"
            placeholder="Last Name"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            ref="username"
            id="username"
            placeholder="Enter Username"
          />
        </FormGroup>*/}
        <FormGroup>
          <ControlLabel>Email Address</ControlLabel>
          <FormControl
            type="email"
            ref="email"
            id="email"
            placeholder="Enter Email"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            ref="password"
            id="password"
            placeholder="Password"
          />
        </FormGroup>
        {/*<FormGroup>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            ref="passwordCon"
            id="passwordCon"
            placeholder="Re-Enter Password"
          />
        </FormGroup>*/}
        <Button type="submit" className="center-block" bsStyle="success">{this.props.submitBtnLabel}</Button>
      </form>
    );
  }
});
