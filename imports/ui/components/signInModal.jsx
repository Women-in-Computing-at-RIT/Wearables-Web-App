/**
 * file: signInModal.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import {SignInForm} from '../components/signInForm';
import { Link } from 'react-router';
import {RegisterModal} from '../components/registerModal';
import {Bert} from 'meteor/themeteorchef:bert';

import {handleLogin} from '../../modules/login';

export const SignInModal = React.createClass ({
  // loginWithPassword(e) {
  //   e.preventDefault();
  //
  //   Meteor.loginWithPassword({
  //     email:'example@gmail.com',
  //     password: 'password'
  //   }, function(error) {
  //     if (error) {
  //       console.log("There was an error:" + error.reason);
  //     } else {
  //       Bert.alert('Logged In!', 'success');
  //     }
  //   });
  // },
  getInitialState() {
      return { showModal: false };
    },

    close() {
      this.setState({ showModal: false });
    },

    open() {
      this.setState({ showModal: true });
    },

    render() {
      return (
        <div>
          <div href="/" onClick={this.open}>Sign In</div>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignInForm />
              {/*schema={Schemas.User}
               signInBtnLabel="Sign In"
               submitAction={this.loginWithPassword}*/}
              <Row>
                <Col xs={9}>
                  <h5 className="text-left">Not a member?
                  <Button className="btn-link"><RegisterModal/></Button></h5>
                </Col>
                <Col xs={3}>
                  <Link className="pull-right" to="/forgotPassword">Forgot Password?</Link>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  });
