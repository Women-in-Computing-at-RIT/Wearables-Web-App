/**
 * file: homePage.jsx
 * authors: Cara Steinberg, Matthew Crocco
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Row, Col} from 'react-bootstrap';

import {UserAccess} from '../../modules/user-utils';

export const HomePage = React.createClass ({

  render() {
    const user = new UserAccess(Meteor.user());

    return (
      <Row>
        <Col xs={5}>
          <h2 className="text-left">{user.name}'s Profile</h2>
          {this.props.content}
        </Col>
        <Col xs={7}>
          <h2 className="text-left">Family Name</h2>
        </Col>
      </Row>
    );
  }
});
