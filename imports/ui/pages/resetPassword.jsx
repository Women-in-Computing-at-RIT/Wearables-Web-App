/**
 * file: resetPassword.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import Schemas from '../../modules/schemas';
import {Button, Row, Col, Form, FormGroup} from 'react-bootstrap';

export const ResetPassword = React.createClass ({
  handleSubmit (e) {
    e.preventDefault();
    this.setState({submitted: this.refs.ProfileForm.getFormData()});
    console.log("Submitted");
  },
  render() {
    return (
      <Row>
        <Col xs={12}>
          <h2 className="page-header">Reset Password</h2>
        </Col>
        <Col xs={12}>
          <h4 className="text-left">Create a new Password</h4>
          <FormGroup>
            <Form schema={Schemas.User} id="resetPasswordForm" onsubmit={this.handleSubmit}>
              <label htmlFor="passwordCur">Current Password</label>
              <input className="form-control" type="password" id="passwordCur"/><br/>
              <label htmlFor="passwordNew">New Password</label>
              <input className="form-control" type="password" id="passwordNew"/><br/>
              <label htmlFor="passwordCon">Confirm Password</label>
              <input className="form-control" type="password" id="passwordCon"/>
              <br/>
              <Button type="submit" className="center-block">Submit</Button>
            </Form>
          </FormGroup>
        </Col>
      </Row>
    );
  }
});
