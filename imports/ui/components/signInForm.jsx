/**
 * file: signInForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import { Fade, Alert, FormGroup, Button, ControlLabel, FormControl } from 'react-bootstrap';

import {SimpleSchema} from 'meteor/aldeed:simple-schema';

import Schemas from '../../modules/schemas';
import {login, handleLogin} from '../../modules/login';
import getInputValue from '../../modules/get-input-value';

const validationCtxt = Schemas.SignIn.namedContext("signInForm");

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errors: {}, isChecked: false};
    this.getValidationMessage = this.getValidationMessage.bind(this);
    this.isError = this.isError.bind(this);
  }

  componentDidMount() {
    handleLogin({component: this});
  }

  handleSubmit(e) {
    let data = {
      email: getInputValue(this.refs.emailAddress),
      password: getInputValue(this.refs.password)
    };

    try {
      validationCtxt.validate(data);
      login(this);
    } catch(ex) {
      let invalids = validationCtxt.invalidKeys();
      let errors = {};

      invalids.forEach((field) => errors[field.name] = validationCtxt.keyErrorMessage(field.name));
      this.setState({errors: errors, isChecked: true});
    }

    e.preventDefault();
  }

  getValidationMessage(name, def) {
    let msg = this.state.errors[name];

    return msg ? msg : _.isUndefined(def) ? '' : def;
  }

  isError(name) {
    return !_.isNull(this.getValidationMessage(name, null));
  }

  render() {
    return (
      <form ref="signin" className="signin" onSubmit={ this.handleSubmit }>
        <FormGroup controlId="emailGroup" auth={this.state.isChecked} {...(this.isError('email') ? {validationState: 'error'} : {})}>
          <ControlLabel className="pull-left">Email Address</ControlLabel>
          <FormControl
            type="email"
            ref="emailAddress"
            name="emailAddress"
            placeholder="Email Address"
          />
          <FormControl.Feedback />
          <Fade in={this.isError('email')}>
            <Alert bsStyle="danger">
              <strong>{this.getValidationMessage('email')}</strong>
            </Alert>
          </Fade>
        </FormGroup>
        <FormGroup controlId="passwordGroup" auth={this.state.isChecked} {...(this.isError('password') ? {validationState: 'error'} : {})}>
          <ControlLabel>
            <span className="pull-left">Password</span>
          </ControlLabel>
          <FormControl
            type="password"
            ref="password"
            id="password"
            placeholder="Password"
          />
          <FormControl.Feedback />
          <Fade in={this.isError('password')}>
            <Alert bsStyle="danger">
              <strong>{this.getValidationMessage('password')}</strong>
            </Alert>
          </Fade>
        </FormGroup>
        <Button type="submit" className="center-block" bsStyle="success">Sign In</Button>
      </form>
    );
  }
}
