/**
 * file: signInModal.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import {SignInForm} from '../components/signInForm';
import { LinkContainer } from 'react-router-bootstrap';
import {RegisterModal} from '../components/registerModal';

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
          <div href="/" onClick={this.open}>Sign In</div>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SignInForm/>
              <Row>
                <Col xs={9}>
                  <h5 className="text-left">Not a member?
                  <Button className="btn-link"><RegisterModal/></Button></h5>
                  </Col>
                  <Col xs={3}>
                  <LinkContainer to="/forgotPassword">
                    <h5 className="text-right"><a href="/forgotPassword">Forgot Password?</a></h5>
                  </LinkContainer>
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
