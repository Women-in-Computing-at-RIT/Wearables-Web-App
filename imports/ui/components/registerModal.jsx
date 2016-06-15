/**
 * file: registerModal.jsx
 * authors: Cara Steinberg
 */
import $ from 'jquery';
import 'jquery-validation';

import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {RegisterForm} from '../components/registerForm';
import {SignInModal} from '../components/signInModal'
import {Bert} from 'meteor/themeteorchef:bert';
import { Accounts } from 'meteor/accounts-base';

import getInputValue from '../../modules/get-input-value';
import Schemas from '../../modules/schemas';

export const RegisterModal = React.createClass ({
  createUser(doc) {
    doc.preventDefault();
    Accounts.createUser ({
      email:'caralin3@gmail.com',
      password: 'password'
      }, function (error) {
        if (error) {
          console.log("there was an error: " + error.reason);
        } else {
          Bert.alert('Registered!', 'success');
        }
      }
    );
  },

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
        <div href="/" onClick={this.open}>Register</div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm schema={Schemas.User}
              submitBtnLabel="Register"
              submitAction={this.createUser}
            />
            <LinkContainer to="/">
              <h5 className="text-center">Already registered?
              <Button className="btn-link"><SignInModal/></Button></h5>
            </LinkContainer>
           </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
