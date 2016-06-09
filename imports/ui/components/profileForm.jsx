import React from 'react';
import Schemas from '../../modules/schemas';
import ReactAutoForm from 'meteor-react-autoform';
import { FormGroup, FormControl } from 'react-bootstrap';
import {updateUserProfile} from '../../../imports/api/users/methods';

export const ProfileForm = () => (
  // <div>
  //   <ReactAutoForm schema={Schemas.UserProfile} type="insert" onSubmit={(docId) => { console.log("New document", docId); }}/>
  // </div>
  <FormGroup>
    <FormControl
      type="text"
      // onKeyUp={ updateUserProfile }
      placeholder="Field"
    />
  </FormGroup>
);

