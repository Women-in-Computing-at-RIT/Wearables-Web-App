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
import {Router, browserHistory} from 'react-router';

import Schemas from '../../modules/schemas';

export const SignInModal = React.createClass ({
  getInitialState() {
      return { showModal: false };
    },

    close() {
      this.setState({ showModal: false });
    },

    open() {
      this.setState({ showModal: true });
    },

  loginWithPassword(e) {
    e.preventDefault();
    const
      email = $('#email').val(),
      password = $('#password').val().trim();

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        console.log("There was an error:" + error.reason);
      } else {
        Bert.alert('Logged In!', 'success');
      }
    });
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
              <SignInForm schema={Schemas.User}
                          signInBtnLabel="Sign In"
                          signInAction={this.loginWithPassword}
              />
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
