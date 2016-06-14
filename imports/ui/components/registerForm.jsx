/**
 * file: registerForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import Schemas from '../../modules/schemas';
import { Form, FormGroup, ButtonGroup, Button } from 'react-bootstrap';


export const RegisterForm = React.createClass({
  handleSubmit (e) {
    e.preventDefault();
    this.setState({submitted: this.refs.ProfileForm.getFormData()});
    console.log("Submitted");
  },

  render() {
    return (
      <FormGroup>
        <Form schema={Schemas.User} id="registerForm" onsubmit={this.handleSubmit}>
          <label htmlFor="email">Enter Email Address</label>
          <input className="form-control" type="email" placeholder="Email" id="email"/>
          <label htmlFor="passwordCre">Create Password</label>
          <input className="form-control" type="password" placeholder="Enter Password" id="passwordCre"/>
          <label htmlFor="passwordCon">Confirm Password</label>
          <input className="form-control" type="password" placeholder="Re-enter Password" id="passwordCon"/>
          <br/>
          <Button type="submit" className="center-block">Submit</Button>
        </Form>
      </FormGroup>
    );
  }
});
