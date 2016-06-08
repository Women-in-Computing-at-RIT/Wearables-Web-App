/**
 * Created by Cara on 6/8/2016.
 */

import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import {updateProfile, deleteProfile} from '../../api/profile/methods';

const handleUpdateProfile = (profileId, event) => {
  const title = event.target.value.trim();
  if (title !== '' && event.keyCode === 13) {
    updateProfile.call({
      _id: documentId,
      update: { title },
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Profile updated!', 'success');
      }
    });
  }
};

const handleDeleteProfile = (documentId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Are you sure? This is permanent.')) {
    deleteProfile.call({
      _id: documentId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Profile deleted!', 'success');
      }
    });
  }
};
