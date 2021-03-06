/**
 * file: information.jsx
 * authors: Cara Steinberg
 */
import React from 'react';
import {Row, Col, Jumbotron} from 'react-bootstrap';
import {ProfileForm} from '../components/forms/profile-form';
import Schemas from '../../modules/schemas';

export const CreateProfile = React.createClass({
  // propTypes: {
  //   profile: React.PropTypes.element.isRequired
  // },
  render() {
    return <div>
      <Jumbotron className="text-center"><h3>Thank you for signing up!</h3></Jumbotron>
      <Row>
        <Col xs={12}>
          <h4 className="text-center">Please provide more information about yourself.</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2 className="page-header">Profile</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProfileForm schema={Schemas.UserProfile}/>
          {/*{ this.props.profile }*/}
        </Col>
      </Row>
    </div>;
  }
});


