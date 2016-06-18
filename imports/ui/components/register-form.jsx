/**
 * file: registerForm.jsx
 * authors: Cara Steinberg, Matthew Crocco
 */

import React from 'react';
import {FormGroup, Button, ButtonGroup, ControlLabel, FormControl, Pager, PageItem } from 'react-bootstrap';

import getInputValue from '../../modules/get-input-value';

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  createUser(e) {
    e.preventDefault();

    const email = getInputValue(this.refs.email), password = getInputValue(this.refs.password);

    Accounts.createUser({
        email: email,
        password: password
      }, function (error) {
        if (error) {
          console.log("there was an error: " + error.reason);
          Bert.alert(error.reason, 'warning');
        } else {
          Bert.alert('Registered!', 'success');
          Accounts.sendVerificationEmail(Meteor.userId(), email);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <form ref="register" className="register" onSubmit={ this.createUser }>
          <FormGroup>
            <ControlLabel className="pull-left">Email Address</ControlLabel>
            <FormControl
              type="email"
              ref="email"
              id="email"
              placeholder="Email Address"
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel className="pull-left">Password</ControlLabel>
            <FormControl
              type="password"
              ref="password"
              id="password"
              placeholder="Password"
              style={{marginBottom: '5px'}}
            />
            <FormControl
              type="password"
              ref="passwordConfirmation"
              id="passwordConfirmation"
              placeholder="Re-enter Password"
            />
            <FormControl.Feedback />
          </FormGroup>
          <Pager>
            <PageItem next onClick={() => this.props.swapCallback()}>Go Back</PageItem>
          </Pager>
          <ButtonGroup justified>
            <ButtonGroup>
              <Button type="submit" bsStyle="primary" >Submit</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button onClick={() => this.props.swapCallback(null)} bsStyle="warning">Close</Button>
            </ButtonGroup>
          </ButtonGroup>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  swapCallback: React.PropTypes.func.isRequired
};
