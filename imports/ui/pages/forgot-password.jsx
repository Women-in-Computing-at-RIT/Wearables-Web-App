/**
 * file: forgotPassword.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import {Button, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';

import Schemas from '../../modules/schemas';

export const ForgotPassword = React.createClass ({
  handleSubmit (e) {
    e.preventDefault();

    Accounts.forgotPassword({
      email: 'example@gmail.com'
      }, function (error) {
        if (error) {
          console.log("there was an error: " + error.reason);
        } else {
          console.log("Email sent!");
        }
      }
    )
  },
  render() {
    return (
      <Row>
        <Col xs={12}>
          <h2 className="page-header">Forgot Password?</h2>
        </Col>
        <Col xs={12}>
          <h4 className="text-left">
            Please enter your email address, and we'll send you a link and instructions to reset your password.
          </h4>
            <form ref="forgot" className="forgot" onSubmit={ this.handleSubmit }>
              <FormGroup>
                <ControlLabel>
                  <span className="pull-left">Enter Email Address</span>
                </ControlLabel>
                <FormControl
                  type="email"
                  ref="email"
                  name="email"
                  placeholder="Email"
                />
              </FormGroup>
              <Button type="submit" className="center-block">Submit</Button>
            </form>
        </Col>
      </Row>
    );
  }
});
