/**
 * file: registerModal.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {RegisterForm} from '../components/registerForm';
import {SignInModal} from '../components/signInModal'

export const RegisterModal = React.createClass ({
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
            <RegisterForm/>
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
