import React from 'react';
import Schemas from '../../modules/schemas';
import { Form, FormGroup, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import {updateUserProfile} from '../../../imports/api/users/methods';
import { Bert } from 'meteor/themeteorchef:bert';

const onSubmit = (event) => {
  event.preventDefault();
  Bert.alert('Submitted');
};

export const ProfileForm = React.createClass({
  getInitialState () {
    return {value: Schemas.UserProfile.firstName};
  },
  handleChange (event) {
    this.setState({value: event.target.value});
  },
  renderField (id, label, field) {
    return <div>
      <label htmlFor={id}>{label}</label><br/>
      {field}
    </div>
  },

  renderTextInput (id, label) {
    return this.renderField(id, label,
      <input type="text"
      value={this.state.value}
      placeholder={label}
      onChange={this.handleChange}
      />
    )
  },

  render() {
    return (
      <FormGroup>
        <Form schema={Schemas.UserProfile} id="userProfileForm" onsubmit={this.onSubmit}>
          {this.renderTextInput('firstName', 'First Name')}
          {this.renderTextInput('lastName', 'Last Name')}
          <label for="dob">Date of Birth (mm/dd/yyyy)</label><br/>
          <input
            type="text"
            value={this.state.value}
            id="dob"
            placeholder="Date of Birth"
            onChange={this.handleChange}
          /><br/>
          <label for="gender">Gender</label><br/>
          <select class="form-control" id="gender">
            <option value="" selected>Select Gender</option>
            <option>Female</option>
            <option>Male</option>
          </select><br/>
          <ButtonGroup>
            <Button type="submit">Submit</Button>
          </ButtonGroup>
        </Form>
      </FormGroup>
    );
  }
});


