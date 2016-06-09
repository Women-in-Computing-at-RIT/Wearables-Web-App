import React from 'react';
import Schemas from '../../modules/schemas';
import ReactAutoForm from 'meteor-react-autoform';
import { Form, FormGroup, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import {updateUserProfile} from '../../../imports/api/users/methods';

const onSubmit = (event) => {
  event.preventDefault();
  alert('Submitted');
};

// export const ProfileForm = () => (
  // <div>
  //   <ReactAutoForm schema={Schemas.UserProfile} type="insert" onSubmit={(docId) => { console.log("New document", docId); }}/>
  // </div>
  // <FormGroup>
  //   <FormControl
  //     type="text"
  //     // onKeyUp={ updateUserProfile }
  //     placeholder="Field"
  //   />
  // </FormGroup>
export const ProfileForm = React.createClass({
  getInitialState: function() {
    return {value: Schemas.UserProfile.firstName};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render() {
    return (
      <FormGroup>
        <Form schema={Schemas.UserProfile} id="userProfileForm" onsubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.value}
            label="First Name"
            placeholder="First Name"
            onChange={this.handleChange}
          />
          <ButtonGroup>
            <Button type="submit">Submit</Button>
          </ButtonGroup>
        </Form>
      </FormGroup>
    //   <Form schema={Schemas.UserProfile} id="userProfileForm" onsubmit={this.onSubmit}>
    //     <input type="text" name={Schemas.UserProfile.firstName} placeholder="First Name"/>
    //     <Button type="submit">Submit</Button>
    //   </Form>
    );
  }
});



