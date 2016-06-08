/**
 * file: information.jsx
 * authors: Cara Steinberg
 */
import React from 'react';
// import ReactAutoForm from 'meteor-react-autoform';
import {AddProfile} from '../../ui/components/insertProfile';

export const Profile = () => (
  <Row>
    <Col xs={ 12 }>
      <h4 className="page-header">Profile</h4>
      <AddProfile />
    </Col>
  </Row>
);


