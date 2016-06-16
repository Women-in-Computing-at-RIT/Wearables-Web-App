/**
 * file: homePage.jsx
 * authors: Cara Steinberg
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Row, Col} from 'react-bootstrap';

import Schemas from '../../modules/schemas';

export const HomePage = React.createClass ({

  render() {
    return (
      <Row>
        <Col xs={5}>
          <h2 className="text-left">{Meteor.users.emails[0].address}'s Profile</h2>
          {this.props.content}
        </Col>
        <Col xs={7}>
          <h2 className="text-left">Family Name</h2>
        </Col>
      </Row>
    );
  }
});
