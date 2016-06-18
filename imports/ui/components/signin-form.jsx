/**
 * file: signInForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import { Fade, Alert, FormGroup, ButtonGroup, Button, ControlLabel, FormControl, Pager, PageItem } from 'react-bootstrap';

import {AuthState} from './auth-modal';
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
            <ControlLabel className="pull-left">Password</ControlLabel>
            <FormControl
              type="password"
              ref="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <FormControl.Feedback />
          </FormGroup>
          <Pager>
            <PageItem next onClick={() => this.props.swapCallback(AuthState.REGISTER)}>Not a member?</PageItem>
            <PageItem next onClick={() => this.props.swapCallback(AuthState.FORGOT_PASSWORD)}>Forgot your password?</PageItem>
          </Pager>
          <ButtonGroup justified>
            <ButtonGroup>
              <Button type="submit" bsStyle="primary" >Submit</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={() => this.props.swapCallback(null)} bsStyle="warning">Close</Button>
            </ButtonGroup>
          </ButtonGroup>
          <Fade in={this.state.emailError || this.state.passwordError}>
            <Alert bsStyle="danger">
              <strong>{this.state.errorMessage}</strong>
            </Alert>
          </Fade>
        </form>
    );
  }
}

SignInForm.propTypes = {
  swapCallback: React.PropTypes.func.isRequired
};
