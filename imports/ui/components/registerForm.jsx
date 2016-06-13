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
        <Form schema={Schemas.User} id="signInForm" onsubmit={this.handleSubmit}>
          <label htmlFor="email">Enter Email Address</label>
          <input className="form-control" type="email" placeholder="Email" id="email"/>
          <label htmlFor="password">Create Password</label>
          <input className="form-control" type="password" placeholder="Enter Password" id="password"/>
          <label htmlFor="password">Confirm Password</label>
          <input className="form-control" type="password" placeholder="Re-enter Password" id="password"/>
          <br/>
          <ButtonGroup>
            <Button type="submit">Submit</Button>
          </ButtonGroup>
        </Form>
      </FormGroup>
    );
  }
});
