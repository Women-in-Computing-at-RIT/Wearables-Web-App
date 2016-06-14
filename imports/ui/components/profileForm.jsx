import React from 'react';
import ReactDOM from 'react-dom';
import Schemas from '../../modules/schemas';
import { Form, FormGroup, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import {updateUserProfile} from '../../../imports/api/users/methods';
import { Bert } from 'meteor/themeteorchef:bert';

let genders = ['Female', 'Male'];
let ethnicities = ['White/Caucasian', 'Black/African American',
  'Asian', 'American Indian or Alaskan Native',
  'Native Hawaiian or Other Pacific Islander', 'Hispanic or Latino'];

export const ProfileForm = React.createClass({
  // getInitialState () {
  //   return {value: "Hello"};
  // },
  // handleChange (field, event) {
  //   let nextState = {};
  //   nextState[field] = event.target.checked;
  //   this.setState(nextState);
  // },
  renderField (id, label, field) {
    return <div>
      <label htmlFor={id}>{label}</label><br/>
      {field}
    </div>
  },
  renderTextInput (id, label, placeHolder) {
    return this.renderField(id, label,
      <input type="text" className="form-control" defaultValue={id}
      // value={this.state.value}
      placeholder={placeHolder}
      // onChange={this.handleChange}
      />
    )
  },
  renderSelect (id, label, values) {
    let options = values.map(function (value) {
      return <option value={value}>{value}</option>
    });

    return this.renderField(id, label, <select className="form-control" id={id}>
      <option defaultValue="">Select {label}</option>
      {options}
    </select>)
  },
  getFormData () {
    let data = {
      firstName: this.refs.Schemas.UserProfile.firstName.ReactDom.findDOMNode().value,
      lastName: this.refs.Schemas.UserProfile.lastName.ReactDom.findDOMNode().value,
      email: this.refs.Schemas.User.emails.ReactDom.findDOMNode().value,
      dateOfBirth: this.refs.Schemas.UserProfile.dateOfBirth.ReactDom.findDOMNode().value,
      gender: this.refs.Schemas.UserProfile.gender.ReactDom.findDOMNode().value
    };
    return data;
  },
  handleSubmit (e) {
    e.preventDefault();
    this.setState({submitted: this.refs.ProfileForm.getFormData()});
    console.log("Submitted");
    // Bert.alert('Submitted');
  },

  render() {
    return (
      <FormGroup>
        <Form schema={Schemas.UserProfile} id="userProfileForm" onsubmit={this.handleSubmit}>
          {this.renderTextInput('firstName', 'First Name', 'First Name')}<br/>
          {this.renderTextInput('lastName', 'Last Name', 'Last Name')}<br/>
          {this.renderTextInput('email', 'Email', 'address@email.com')}<br/>
          {this.renderTextInput('dob', 'Date of Birth', 'mm/dd/yyyy')}<br/>
          {this.renderSelect('gender', 'Gender', genders)}<br/>
          {this.renderSelect('ethnicity', 'Ethnicity', ethnicities)}<br/>
          {this.renderTextInput('phoneNumber', 'Phone Number', 'xxx-xxx-xxxx')}<br/>
          <Button type="submit" className="center-block">Submit</Button>
        </Form>
      </FormGroup>
    );
  }
});


