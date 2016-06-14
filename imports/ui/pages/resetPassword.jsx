/**
 * file: resetPassword.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import Schemas from '../../modules/schemas';
import {Button, Row, Col,FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

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
          <h4 className="text-center">Create a new Password</h4><br/>
          <form ref="reset" className="reset" onSubmit={ this.handleSubmit }>
            <FormGroup>
              <ControlLabel>
                <span className="pull-left">Current Password</span>
              </ControlLabel>
              <FormControl
                type="password"
                ref="passwordCur"
                name="passwordCur"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                <span className="pull-left">New Password</span>
              </ControlLabel>
              <FormControl
                type="password"
                ref="passwordNew"
                name="passwordNew"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                <span className="pull-left">Confirm Password</span>
              </ControlLabel>
              <FormControl
                type="password"
                ref="passwordCon"
                name="passwordCon"
              />
            </FormGroup>
              <Button type="submit" className="center-block">Submit</Button>
          </form>
        </Col>
      </Row>
    );
  }
});
