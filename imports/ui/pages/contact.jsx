/**
 * file: contact.jsx
 * authors: Cara Steinberg
 */

import React from 'react';
import {Row, Col} from 'react-bootstrap';

export const ContactPage = React.createClass ({
  render() {
    return (
      <Row>
        <Col xs={12}>
          <h2 className="page-header">Contact Us</h2>
        </Col>
      </Row>
    );
  }
});
