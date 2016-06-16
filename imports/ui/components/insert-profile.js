/**
 * Created by Cara on 6/8/2016.
 */

import React from 'react';
import { FormGroup, FormControl, Row, Col } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertProfile } from '../../api/profile/methods.js';

const handleInsertProfile = (event) => {
  const target = event.target;
  const title = target.value.trim();

  if (title !== '' && event.keyCode === 13) {
    insertProfile.call({
      title,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Profile added!', 'success');
      }
    });
  }
};

export const AddProfile = () => (
  <FormGroup>
    <FormControl
      type="text"
      onKeyUp={ handleInsertProfile }
      placeholder="Type a document title and press enter..."
    />
  </FormGroup>
);

