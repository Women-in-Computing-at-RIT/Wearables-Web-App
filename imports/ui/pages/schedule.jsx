/**
 * file: schedule.jsx
 * authors: Cara Steinberg
 */

import {UserAccess} from '../../modules/user-utils';
import React from 'react';
import {Row, Col} from 'react-bootstrap';

export const Schedule = React.createClass ({
  render() {
    const user = new UserAccess(Meteor.user());
    return (
      <Row>
        <Col xs={12}>
          <h2 className="page-header">{user.name}'s Schedule</h2>
        </Col>
      </Row>
    );
  }
});
