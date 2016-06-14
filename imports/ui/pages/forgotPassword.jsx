/**
 * file: forgotPassword.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import Schemas from '../../modules/schemas';
import {Button, Row, Col, Form, FormGroup} from 'react-bootstrap';

export const ForgotPassword = React.createClass ({
  handleSubmit (e) {
    e.preventDefault();
    this.setState({submitted: this.refs.ProfileForm.getFormData()});
    console.log("Submitted");
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
          <FormGroup>
            <Form schema={Schemas.User} id="forgotPasswordForm" onsubmit={this.handleSubmit}>
              <label htmlFor="email">Enter Email Address</label>
              <input className="form-control" type="email" placeholder="Email" id="email"/>
              <br/>
              <Button type="submit" className="center-block">Submit</Button>
            </Form>
          </FormGroup>
        </Col>
      </Row>
    );
  }
});
