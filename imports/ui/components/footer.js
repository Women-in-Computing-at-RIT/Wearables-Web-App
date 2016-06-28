
import React from 'react';

import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';


export const BaseFooter = () => (
  <footer className="footer">
    <div className="container">
      <Row>
        <Col xs={4}>
          <h5 className="text-muted text-center">Copyright @ 2016</h5>
        </Col>
        <Col xs={4}>
          <Link className="text-muted text-center" to="/contact">Contact Us</Link>
          <h5>contact@info.com</h5>
        </Col>
      </Row>
    </div>
  </footer>
);
