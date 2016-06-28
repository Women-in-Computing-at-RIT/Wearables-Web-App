/**
 * file: registerForm.jsx
 * authors: Cara Steinberg, Matthew Crocco
 */

import React from 'react';
import {FormGroup, Form, Col, Alert, Button, ButtonGroup, ControlLabel, InputGroup,
  Collapse, FormControl, Pager, PageItem } from 'react-bootstrap';

import {handleRegister} from '../../modules/register';
import {EventBus} from '../../modules/subscriptions';
import {Topics, App} from '../../modules/constants';

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

    const passwordVerifier = (m, {score, feedback, crack_times_display}) => {
      let newState = {
        passwordError: this.state.passwordError || score < App.auth.minPwdStrength,
        passwordStrength: score
      };

      if(newState.passwordError && score < App.auth.minPwdStrength)
        newState.passwordErrorMessage = `${feedback.warning} (Could be broken in ${crack_times_display.offline_fast_hashing_1e10_per_second}). ${feedback.suggestions}.`;

      this.setState(newState);
    };

    this.setState({
      subToken: EventBus.subscribe(Topics.auth.passwordVerify, passwordVerifier)
    });
  }

  componentWillUnmount() {
    if(_.isNil(this.state.subToken))
      return;
    
    EventBus.unsubscribe(this.state.subToken);
    this.setState({
      subToken: null
    });
  }

  render() {

    let swapCallback = this.props.authModalCallback;

    return (
      <Form horizontal ref="registration" onSubmit={ (e) => e.preventDefault() }>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>Name</Col>
          <Col sm={5}>
            <FormControl type="text" id="firstName" ref="firstName" name="firstName" placeholder="First Name" />
          </Col>
          <Col sm={5}>
            <FormControl type="text" id="lastName" ref="lastName" name="lastName" placeholder="Last Name"/>
          </Col>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup {...(this.state.emailError ? {validationState: 'error'} : {})}>
          <Col componentClass={ControlLabel} sm={2}>Email</Col>
          <Col sm={10}>
            <FormControl type="text" id="email" ref="email" name="email" placeholder="Enter Email Address"/>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup {...(this.state.passwordError ? {validationState: 'error'} : {})}>
          <Col componentClass={ControlLabel} sm={2}>Password</Col>
          <Col sm={10}>
            <FormControl type="password" id="password" ref="password" name="password" placeholder="Enter Password"/>
            <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup {...(this.state.passwordError || this.state.mismatchError ? {validationState: 'error'} : {})}>
          <Col sm={10} smOffset={2}>
            <FormControl type="password"
                         id="passwordConfirmation"
                         ref="passwordConfirmation"
                         name="passwordConfirmation"
                         placeholder="Re-enter Password"/>
            <FormControl.Feedback/>
          </Col>
        </FormGroup>
        <Pager>
          <PageItem next onClick={() => swapCallback()}>Sign in</PageItem>
        </Pager>
        <ButtonGroup justified>
          <ButtonGroup>
            <Button type="submit" bsStyle="primary" >Submit</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={() => swapCallback(null)}>Close</Button>
          </ButtonGroup>
        </ButtonGroup>
        <Collapse unmountOnExit={true} in={this.state.emailError || this.state.passwordError || this.state.mismatchError}>
          <Alert className="validation-alert overview" bsStyle="danger">
            <strong>{this.state.passwordErrorMessage || this.state.errorMessage}</strong>
          </Alert>
        </Collapse>
      </Form>
    );
  }
}

RegisterForm.propTypes = {
  authModalCallback: React.PropTypes.func.isRequired
};
