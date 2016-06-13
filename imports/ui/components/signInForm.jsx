/**
 * file: signInForm.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import Schemas from '../../modules/schemas';
import { Form, FormGroup, ButtonGroup, Button } from 'react-bootstrap';


export const SignInForm = React.createClass({
  handleSubmit (e) {
    e.preventDefault();
    this.setState({submitted: this.refs.ProfileForm.getFormData()});
    console.log("Submitted");
  },

  render() {
    return (
      <FormGroup>
        <Form schema={Schemas.User} id="signInForm" onsubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input className="form-control" type="email" placeholder="Email Address" id="email"/>
          <label htmlFor="password">Password</label>
          <input className="form-control" type="password" placeholder="Enter Password" id="password"/>
          <br/>
          <Button type="submit" className="center-block">Submit</Button>
        </Form>
      </FormGroup>
    );
  }
});
