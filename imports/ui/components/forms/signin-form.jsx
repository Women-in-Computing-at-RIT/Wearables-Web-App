/**
 * file: signInForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import { Collapse, Alert, FormGroup, ButtonGroup, Button, ControlLabel, FormControl, Pager, PageItem } from 'react-bootstrap';

import {AuthState} from '../auth-modal';
import {handleLogin} from '../../../modules/auth/login';

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {emailError: false, passwordError: false, errorMessage: null};
  }

  componentDidMount() {
    handleLogin({component: this});
  }

  render() {

    let swapCallback = this.props.authModalCallback;
    return (
        <form ref="signin" className="signin" onSubmit={ (e) => e.preventDefault() }>
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
            <PageItem next onClick={() => swapCallback(AuthState.REGISTER)}>Not a member?</PageItem>
            <PageItem next onClick={() => swapCallback(AuthState.FORGOT_PASSWORD)}>Forgot your password?</PageItem>
          </Pager>
          <ButtonGroup justified>
            <ButtonGroup>
              <Button type="submit" bsStyle="primary" >Submit</Button>
            </ButtonGroup>
            {/*<ButtonGroup>
              <Button onClick={() => swapCallback(null)}>Close</Button>
            </ButtonGroup>*/}
          </ButtonGroup>
          <Collapse unmountOnExit={true} in={this.state.emailError || this.state.passwordError}>
            <Alert className="validation-alert overview" bsStyle="danger">
              <strong>{this.state.errorMessage}</strong>
            </Alert>
          </Collapse>
        </form>
    );
  }
}

SignInForm.propTypes = {
  authModalCallback: React.PropTypes.func.isRequired
};
