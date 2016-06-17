/**
 * file: signInForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import { Fade, Alert, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';

import {handleLogin} from '../../modules/login';

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {emailError: false, passwordError: false, errorMessage: null};
  }

  componentDidMount() {
    handleLogin({component: this});
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <form ref="signin" className="signin" onSubmit={ this.handleSubmit }>
        <FormGroup id="emailGroup" {...(this.state.emailError ? {validationState: 'error'} : {})}>
          <ControlLabel className="pull-left">Email Address</ControlLabel>
          <FormControl
            type="email"
            ref="emailAddress"
            name="emailAddress"
            id="email"
            placeholder="Email Address"
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup id="passwordGroup" {...(this.state.passwordError ? {validationState: 'error'} : {})}>
          <ControlLabel>
            <span className="pull-left">Password</span>
          </ControlLabel>
          <FormControl
            type="password"
            ref="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <FormControl.Feedback />
        </FormGroup>
        <Fade in={this.state.emailError || this.state.passwordError}>
          <Alert bsStyle="danger">
            <strong>{this.state.errorMessage}</strong>
          </Alert>
        </Fade>
        <Button type="submit" className="center-block" bsStyle="success">Sign In</Button>
      </form>
    );
  }
}