/**
 * file: registerForm.jsx
 * authors: Cara Steinberg, Matthew Crocco
 */

import React from 'react';
import {FormGroup, Alert, Button, ButtonGroup, ControlLabel, Collapse, FormControl, Pager, PageItem } from 'react-bootstrap';

import {handleRegister} from '../../modules/register';
import getInputValue from '../../modules/get-input-value';

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      errorMessage: null,
      emailError: false,
      passwordError: false,
      mismatchError: false
    };
  }

  componentDidMount() {
    handleRegister({component: this});
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {

    let swapCallback = this.props.authModalCallback;
    return (
        <form ref="registration" className="register" onSubmit={ this.handleSubmit }>
          <FormGroup id="emailGroup" {...(this.state.emailError ? {validationState: 'error'} : {})}>
            <ControlLabel className="pull-left">Email Address</ControlLabel>
            <FormControl
              type="email"
              ref="email"
              name="email"
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
              id="password"
              name="password"
              placeholder="Password"
              style={{marginBottom: '5px'}}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup id="passwordConfirmationGroup" {...(this.state.passwordError || this.state.mismatchError ? {validationState: 'error'} : {})}>
            <ControlLabel className="pull-left">Confirm Password</ControlLabel>
            <FormControl
              type="password"
              ref="passwordConfirmation"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="Re-enter Password"
            />
            <FormControl.Feedback />
          </FormGroup>
          <Pager>
            <PageItem next onClick={() => swapCallback()}>Go Back</PageItem>
          </Pager>
          <ButtonGroup justified>
            <ButtonGroup>
              <Button type="submit" bsStyle="primary" >Submit</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={() => swapCallback(null)} bsStyle="warning">Close</Button>
            </ButtonGroup>
          </ButtonGroup>
          <Collapse unmountOnExit={true} in={this.state.emailError || this.state.passwordError || this.state.mismatchError}>
            <Alert bsStyle="danger">
              <strong>{this.state.errorMessage}</strong>
            </Alert>
          </Collapse>
        </form>
    );
  }
}

RegisterForm.propTypes = {
  authModalCallback: React.PropTypes.func.isRequired
};
