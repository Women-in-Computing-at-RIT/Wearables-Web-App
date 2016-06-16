/**
 * file: contact.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';

export const ContactPage = React.createClass ({
  render() {
    return ( <div>
      <Row>
        <Col xs={12}>
          <h2 className="page-header">Contact</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <ListGroup>
            <h3>Contact Info</h3>
            <ListGroupItem>
              <h4>Address</h4>
                <ul className="list-unstyled">
                  <li>1 Lomb Memorial Drive</li>
                  <li>Rochester, New York 14623</li>
                </ul>
            </ListGroupItem>
            <ListGroupItem>
              <h4>Phone Number</h4>
                <ul className="list-unstyled">
                  <li>555-555-5555</li>
               </ul>
            </ListGroupItem>
            <ListGroupItem>
              <h4>Email</h4>
                <ul className="list-unstyled">
                  <li>contact@info.com</li>
                </ul>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6}>
          <h3>Contact Us</h3>
        </Col>
      </Row>
      </div>
    );
  }
});
