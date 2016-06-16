/**
 * file: registerForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';


export const RegisterForm = React.createClass({
  propTypes: {
    submitAction: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      submitBtnLabel: "Register"
    };
  },

  // handleSubmit (e) {
  //   e.preventDefault();
  // },

  render() {
    return (
      <form ref="register" className="register" onSubmit={ this.props.submitAction }>
        {/*<FormGroup>
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
            name="passwordCon"
            placeholder="Re-Enter Password"
          />
        </FormGroup>*/}
        <Button type="submit" className="center-block" bsStyle="success">{this.props.submitBtnLabel}</Button>
      </form>
    );
  }
});
