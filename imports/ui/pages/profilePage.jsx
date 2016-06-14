/**
 * file: profilePage.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {ProfileForm} from '../../ui/components/profileForm';

export const ProfilePage = React.createClass ({
  render() {
    return (
      <Row>
        <Col xs={12}>
          <h2 className="page-header">Profile Page</h2>
          <ProfileForm/>
        </Col>
      </Row>
    );
  }
});
