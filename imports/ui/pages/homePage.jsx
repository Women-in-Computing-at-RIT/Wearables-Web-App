/**
 * file: homePage.jsx
 * authors: Cara Steinberg
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Row, Col} from 'react-bootstrap';

export const HomePage = React.createClass ({
  render() {
    return (
      <Row>
        <Col xs={4}>
          <h2 className="text-left">{Meteor.user()}'s Profile</h2>
        </Col>
        <Col xs={8}>
          <h2 className="text-left">Family Name</h2>
        </Col>
      </Row>
    );
  }
});
