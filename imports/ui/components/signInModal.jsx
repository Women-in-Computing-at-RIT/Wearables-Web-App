/**
 * file: signInModal.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {SignInForm} from '../components/signInForm';

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

    render() {
      return (
        <div>
          <div href="#" onClick={this.open}>Sign In</div>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignInForm/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  });
