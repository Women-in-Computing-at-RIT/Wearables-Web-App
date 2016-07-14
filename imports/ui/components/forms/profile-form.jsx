import { Bert } from 'meteor/themeteorchef:bert';
import Blaze from 'meteor/gadicc:blaze-react-component';

import { FormGroup, FormControl, Button,ControlLabel } from 'react-bootstrap';
import React from 'react';

import {EnumSelect} from '../enum-select';
import {Gender, Ethnicity} from '../../../modules/enums';

export const ProfileForm = React.createClass({
  renderField (label, field) {
    return <div>
      <ControlLabel><span className="pull-left">{label}</span></ControlLabel>
      {field}
      </div>
  },
  renderTextInput (type, id, label, placeHolder) {
    return this.renderField(label,
      <FormControl
        type={type}
        ref={id}
        name={id}
        placeholder={placeHolder}
        defaultValue={id}
      />
      // value={this.state.value}
      // placeholder={placeHolder}
      // onChange={this.handleChange}
      // />
    )
  },
  getFormData () {

    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let email = this.refs.email.value;
    let dateOfBirth = this.refs.dob.value;
    let gender = Gender.fromString(this.refs.gender.value);
    let ethnicity = Ethnicity.fromString(this.refs.ethnicity.value);

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
        <form ref="userProfileForm" className="userProfileForm" onSubmit={ this.handleSubmit }>
          <FormGroup controlId="userProfileName">
            {this.renderTextInput('text', 'firstName', 'First Name', 'First Name')}
            {this.renderTextInput('text', 'lastName', 'Last Name', 'Last Name')}
          </FormGroup>
          <FormGroup controlId="userProfileEmail">
            {this.renderTextInput('email', 'email', 'Email', 'address@email.com')}
          </FormGroup>
          <FormGroup controlId="userProfileGeneral">
            {this.renderTextInput('datetime-local', 'dob', 'Date of Birth', 'mm/dd/yyyy')}
            <EnumSelect id="gender" enumType={Gender}/>
            <EnumSelect id="ethnicity" enumType={Ethnicity}/>
            {this.renderTextInput('phoneNumber', 'Phone Number', 'xxx-xxx-xxxx')}
          </FormGroup>
          <Button type="submit" className="center-block">Submit</Button><br/>
        </form>
    );
  }
});


