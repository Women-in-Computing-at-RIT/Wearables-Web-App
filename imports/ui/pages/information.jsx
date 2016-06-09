/**
 * file: information.jsx
 * authors: Cara Steinberg
 */
import React from 'react';
import {Row, Col, Jumbotron} from 'react-bootstrap';
import {ProfileForm} from '../components/profileForm';

export const Profile = React.createClass({
  // propTypes: {
  //   profile: React.PropTypes.element.isRequired
  // },
  render() {
    return <div>
      <Jumbotron className="text-center"><h3>Thank you for signing up!</h3></Jumbotron>
      <Row>
        <Col xs={12}>
          <h2 className="page-header">Profile</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProfileForm/>
          {/*{ this.props.profile }*/}
        </Col>
      </Row>
    </div>;
  }
});


